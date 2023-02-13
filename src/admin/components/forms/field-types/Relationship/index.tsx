import React, {
  useCallback, useEffect, useState, useReducer, useRef,
} from 'react';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../utilities/Config';
import { useAuth } from '../../../utilities/Auth';
import withCondition from '../../withCondition';
import ReactSelect from '../../../elements/ReactSelect';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import { relationship } from '../../../../../fields/validations';
import { Where } from '../../../../../types';
import { PaginatedDocs } from '../../../../../mongoose/types';
import { useFormProcessing } from '../../Form/context';
import optionsReducer from './optionsReducer';
import { Props, GetResults, Value, FilterOptionsResult } from './types';
import { createRelationMap } from './createRelationMap';
import { useDebouncedCallback } from '../../../../hooks/useDebouncedCallback';
import wordBoundariesRegex from '../../../../../utilities/wordBoundariesRegex';
import { AddNewRelation } from './AddNew';
import { findOptionsByValue } from './findOptionsByValue';
import { GetFilterOptions } from './GetFilterOptions';

import './index.scss';

const maxResultsPerRequest = 10;

const baseClass = 'relationship';

const Relationship: React.FC<Props> = (props) => {
  const {
    relationTo,
    validate = relationship,
    path,
    name,
    required,
    label,
    hasMany,
    filterOptions,
    admin: {
      readOnly,
      style,
      className,
      width,
      description,
      condition,
      isSortable = true,
    } = {},
  } = props;

  const {
    serverURL,
    routes: {
      api,
    },
    collections,
  } = useConfig();

  const { t, i18n } = useTranslation('fields');
  const { permissions } = useAuth();
  const formProcessing = useFormProcessing();
  const hasMultipleRelations = Array.isArray(relationTo);
  const [options, dispatchOptions] = useReducer(optionsReducer, []);
  const [lastFullyLoadedRelation, setLastFullyLoadedRelation] = useState(-1);
  const [lastLoadedPage, setLastLoadedPage] = useState(1);
  const [errorLoading, setErrorLoading] = useState('');
  const [filterOptionsResult, setFilterOptionsResult] = useState<FilterOptionsResult>();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedFirstPage, setHasLoadedFirstPage] = useState(false);
  const [enableWordBoundarySearch, setEnableWordBoundarySearch] = useState(false);
  const firstRun = useRef(true);

  const memoizedValidate = useCallback((value, validationOptions) => {
    return validate(value, { ...validationOptions, required });
  }, [validate, required]);

  const {
    value,
    showError,
    errorMessage,
    setValue,
    initialValue,
  } = useField<Value | Value[]>({
    path: path || name,
    validate: memoizedValidate,
    condition,
  });

  const getResults: GetResults = useCallback(async ({
    lastFullyLoadedRelation: lastFullyLoadedRelationArg,
    lastLoadedPage: lastLoadedPageArg,
    search: searchArg,
    value: valueArg,
    sort,
    onSuccess,
  }) => {
    if (!permissions) {
      return;
    }
    let lastLoadedPageToUse = typeof lastLoadedPageArg !== 'undefined' ? lastLoadedPageArg : 1;
    const lastFullyLoadedRelationToUse = typeof lastFullyLoadedRelationArg !== 'undefined' ? lastFullyLoadedRelationArg : -1;

    const relations = Array.isArray(relationTo) ? relationTo : [relationTo];
    const relationsToFetch = lastFullyLoadedRelationToUse === -1 ? relations : relations.slice(lastFullyLoadedRelationToUse + 1);

    let resultsFetched = 0;
    const relationMap = createRelationMap({ hasMany, relationTo, value: valueArg });

    if (!errorLoading) {
      relationsToFetch.reduce(async (priorRelation, relation) => {
        await priorRelation;

        if (resultsFetched < 10) {
          const collection = collections.find((coll) => coll.slug === relation);
          const fieldToSearch = collection?.admin?.useAsTitle || 'id';

          const query: {
            [key: string]: unknown
            where: Where
          } = {
            where: {
              and: [
                {
                  id: {
                    not_in: relationMap[relation],
                  },
                },
              ],
            },
            limit: maxResultsPerRequest,
            page: lastLoadedPageToUse,
            sort: fieldToSearch,
            depth: 0,
          };

          if (searchArg) {
            query.where.and.push({
              [fieldToSearch]: {
                like: searchArg,
              },
            });
          }

          if (filterOptionsResult?.[relation]) {
            query.where.and.push(filterOptionsResult[relation]);
          }

          const response = await fetch(`${serverURL}${api}/${relation}?${qs.stringify(query)}`, {
            credentials: 'include',
            headers: {
              'Accept-Language': i18n.language,
            },
          });

          if (response.ok) {
            const data: PaginatedDocs<unknown> = await response.json();
            if (data.docs.length > 0) {
              resultsFetched += data.docs.length;
              dispatchOptions({ type: 'ADD', docs: data.docs, collection, sort, i18n });
              setLastLoadedPage(data.page);

              if (!data.nextPage) {
                setLastFullyLoadedRelation(relations.indexOf(relation));

                // If there are more relations to search, need to reset lastLoadedPage to 1
                // both locally within function and state
                if (relations.indexOf(relation) + 1 < relations.length) {
                  lastLoadedPageToUse = 1;
                }
              }
            }
          } else if (response.status === 403) {
            setLastFullyLoadedRelation(relations.indexOf(relation));
            lastLoadedPageToUse = 1;
            dispatchOptions({ type: 'ADD', docs: [], collection, sort, ids: relationMap[relation], i18n });
          } else {
            setErrorLoading(t('error:unspecific'));
          }
        }
      }, Promise.resolve());

      if (typeof onSuccess === 'function') onSuccess();
    }
  }, [
    permissions,
    relationTo,
    hasMany,
    errorLoading,
    collections,
    filterOptionsResult,
    serverURL,
    api,
    t,
    i18n,
  ]);

  const updateSearch = useDebouncedCallback((searchArg: string, valueArg: unknown) => {
    getResults({ search: searchArg, value: valueArg, sort: true });
    setSearch(searchArg);
  }, [getResults]);

  const handleInputChange = useCallback((searchArg: string, valueArg: unknown) => {
    if (search !== searchArg) {
      updateSearch(searchArg, valueArg);
    }
  }, [search, updateSearch]);

  // ///////////////////////////////////
  // Ensure we have an option for each value
  // ///////////////////////////////////

  useEffect(() => {
    const relationMap = createRelationMap({
      hasMany,
      relationTo,
      value,
    });

    Object.entries(relationMap).reduce(async (priorRelation, [relation, ids]) => {
      await priorRelation;

      const idsToLoad = ids.filter((id) => {
        return !options.find((optionGroup) => optionGroup?.options?.find((option) => option.value === id && option.relationTo === relation));
      });

      if (idsToLoad.length > 0) {
        const query = {
          where: {
            id: {
              in: idsToLoad,
            },
          },
          depth: 0,
          limit: idsToLoad.length,
        };

        if (!errorLoading) {
          const response = await fetch(`${serverURL}${api}/${relation}?${qs.stringify(query)}`, {
            credentials: 'include',
            headers: {
              'Accept-Language': i18n.language,
            },
          });
          const collection = collections.find((coll) => coll.slug === relation);
          if (response.ok) {
            const data = await response.json();
            dispatchOptions({ type: 'ADD', docs: data.docs, collection, sort: true, ids: idsToLoad, i18n });
          } else if (response.status === 403) {
            dispatchOptions({ type: 'ADD', docs: [], collection, sort: true, ids: idsToLoad, i18n });
          }
        }
      }
    }, Promise.resolve());
  }, [
    options,
    value,
    hasMany,
    errorLoading,
    collections,
    hasMultipleRelations,
    serverURL,
    api,
    i18n,
    relationTo,
  ]);

  // Determine if we should switch to word boundary search
  useEffect(() => {
    const relations = Array.isArray(relationTo) ? relationTo : [relationTo];
    const isIdOnly = relations.reduce((idOnly, relation) => {
      const collection = collections.find((coll) => coll.slug === relation);
      const fieldToSearch = collection?.admin?.useAsTitle || 'id';
      return fieldToSearch === 'id' && idOnly;
    }, true);
    setEnableWordBoundarySearch(!isIdOnly);
  }, [relationTo, collections]);

  // When relationTo or filterOptionsResult changes, reset component
  // Note - effect should not run on first run
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    dispatchOptions({ type: 'CLEAR' });
    setLastFullyLoadedRelation(-1);
    setLastLoadedPage(1);
    setHasLoadedFirstPage(false);
  }, [relationTo, filterOptionsResult]);

  const classes = [
    'field-type',
    baseClass,
    className,
    showError && 'error',
    errorLoading && 'error-loading',
    readOnly && `${baseClass}--read-only`,
  ].filter(Boolean).join(' ');

  const valueToRender = findOptionsByValue({ value, options });
  if (!Array.isArray(valueToRender) && valueToRender?.value === 'null') valueToRender.value = null;

  return (
    <div
      id={`field-${(path || name).replace(/\./gi, '__')}`}
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <Error
        showError={showError}
        message={errorMessage}
      />
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <GetFilterOptions {...{ filterOptionsResult, setFilterOptionsResult, filterOptions, path, relationTo }} />
      {!errorLoading && (
        <div className={`${baseClass}__wrap`}>
          <ReactSelect
            isDisabled={readOnly}
            onInputChange={(newSearch) => handleInputChange(newSearch, value)}
            onChange={!readOnly ? (selected) => {
              if (selected === null) {
                setValue(hasMany ? [] : null);
              } else if (hasMany) {
                setValue(selected ? selected.map((option) => {
                  if (hasMultipleRelations) {
                    return {
                      relationTo: option.relationTo,
                      value: option.value,
                    };
                  }

                  return option.value;
                }) : null);
              } else if (hasMultipleRelations) {
                setValue({
                  relationTo: selected.relationTo,
                  value: selected.value,
                });
              } else {
                setValue(selected.value);
              }
            } : undefined}
            onMenuScrollToBottom={() => {
              getResults({
                lastFullyLoadedRelation,
                lastLoadedPage: lastLoadedPage + 1,
                search,
                value: initialValue,
                sort: false,
              });
            }}
            value={valueToRender}
            showError={showError}
            disabled={formProcessing}
            options={options}
            isMulti={hasMany}
            isSortable={isSortable}
            isLoading={isLoading}
            onMenuOpen={() => {
              if (!hasLoadedFirstPage) {
                setIsLoading(true);
                getResults({
                  value: initialValue,
                  onSuccess: () => {
                    setHasLoadedFirstPage(true);
                    setIsLoading(false);
                  },
                });
              }
            }}
            filterOption={enableWordBoundarySearch ? (item, searchFilter) => {
              const r = wordBoundariesRegex(searchFilter || '');
              return r.test(item.label);
            } : undefined}
          />
          {!readOnly && (
            <AddNewRelation
              {...{ path, hasMany, relationTo, value, setValue, dispatchOptions }}
            />
          )}
        </div>
      )}
      {errorLoading && (
        <div className={`${baseClass}__error-loading`}>
          {errorLoading}
        </div>
      )}
      <FieldDescription
        value={value}
        description={description}
      />
    </div>
  );
};

export default withCondition(Relationship);
