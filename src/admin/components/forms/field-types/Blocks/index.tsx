import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../utilities/Auth';
import { usePreferences } from '../../../utilities/Preferences';
import { useLocale } from '../../../utilities/Locale';
import withCondition from '../../withCondition';
import Button from '../../../elements/Button';
import reducer, { Row } from '../rowReducer';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import { useForm } from '../../Form/context';
import buildStateFromSchema from '../../Form/buildStateFromSchema';
import Error from '../../Error';
import useField from '../../useField';
import Popup from '../../../elements/Popup';
import BlockSelector from './BlockSelector';
import { blocks as blocksValidator } from '../../../../../fields/validations';
import Banner from '../../../elements/Banner';
import FieldDescription from '../../FieldDescription';
import { Props } from './types';
import { useOperation } from '../../../utilities/OperationProvider';
import { Collapsible } from '../../../elements/Collapsible';
import { ArrayAction } from '../../../elements/ArrayAction';
import RenderFields from '../../RenderFields';
import { fieldAffectsData } from '../../../../../fields/config/types';
import SectionTitle from './SectionTitle';
import Pill from '../../../elements/Pill';
import { scrollToID } from '../../../../utilities/scrollToID';
import HiddenInput from '../HiddenInput';
import { getTranslation } from '../../../../../utilities/getTranslation';

import './index.scss';

const baseClass = 'blocks-field';

const BlocksField: React.FC<Props> = (props) => {
  const { t, i18n } = useTranslation('fields');
  const {
    label,
    name,
    path: pathFromProps,
    blocks,
    labels = {
      singular: t('block'),
      plural: t('blocks'),
    },
    fieldTypes,
    maxRows,
    minRows,
    required,
    validate = blocksValidator,
    permissions,
    indexPath,
    admin: {
      readOnly,
      description,
      condition,
      initCollapsed,
      className,
    },
  } = props;

  const path = pathFromProps || name;

  const { preferencesKey } = useDocumentInfo();
  const { getPreference } = usePreferences();
  const { setPreference } = usePreferences();
  const [rows, dispatchRows] = useReducer(reducer, undefined);
  const formContext = useForm();
  const { user } = useAuth();
  const { id } = useDocumentInfo();
  const locale = useLocale();
  const operation = useOperation();
  const { dispatchFields, setModified } = formContext;
  const [selectorIndexOpen, setSelectorIndexOpen] = useState<number>();

  const memoizedValidate = useCallback((value, options) => {
    return validate(value, { ...options, minRows, maxRows, required });
  }, [maxRows, minRows, required, validate]);


  const {
    showError,
    errorMessage,
    value,
  } = useField<number>({
    path,
    validate: memoizedValidate,
    condition,
    disableFormData: rows?.length > 0,
  });

  const onAddPopupToggle = useCallback((open) => {
    if (!open) {
      setSelectorIndexOpen(undefined);
    }
  }, []);

  const addRow = useCallback(async (rowIndex: number, blockType: string) => {
    const block = blocks.find((potentialBlock) => potentialBlock.slug === blockType);
    const subFieldState = await buildStateFromSchema({ fieldSchema: block.fields, operation, id, user, locale, t });
    dispatchFields({ type: 'ADD_ROW', rowIndex, subFieldState, path, blockType });
    dispatchRows({ type: 'ADD', rowIndex, blockType });
    setModified(true);

    setTimeout(() => {
      scrollToID(`${path}-row-${rowIndex + 1}`);
    }, 0);
  }, [blocks, operation, id, user, locale, t, dispatchFields, path, setModified]);

  const duplicateRow = useCallback(async (rowIndex: number, blockType: string) => {
    dispatchFields({ type: 'DUPLICATE_ROW', rowIndex, path });
    dispatchRows({ type: 'ADD', rowIndex, blockType });
    setModified(true);

    setTimeout(() => {
      scrollToID(`${path}-row-${rowIndex + 1}`);
    }, 0);
  }, [dispatchRows, dispatchFields, path, setModified]);

  const removeRow = useCallback((rowIndex: number) => {
    dispatchRows({ type: 'REMOVE', rowIndex });
    dispatchFields({ type: 'REMOVE_ROW', rowIndex, path });
    setModified(true);
  }, [path, dispatchFields, setModified]);

  const moveRow = useCallback((moveFromIndex: number, moveToIndex: number) => {
    dispatchRows({ type: 'MOVE', moveFromIndex, moveToIndex });
    dispatchFields({ type: 'MOVE_ROW', moveFromIndex, moveToIndex, path });
    setModified(true);
  }, [dispatchRows, dispatchFields, path, setModified]);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    moveRow(sourceIndex, destinationIndex);
  }, [moveRow]);

  const setCollapse = useCallback(async (rowID: string, collapsed: boolean) => {
    dispatchRows({ type: 'SET_COLLAPSE', id: rowID, collapsed });

    if (preferencesKey) {
      const preferencesToSet = await getPreference(preferencesKey) || { fields: {} };
      let newCollapsedState: string[] = preferencesToSet?.fields?.[path]?.collapsed;

      if (initCollapsed && typeof newCollapsedState === 'undefined') {
        newCollapsedState = rows.map((row) => row.id);
      } else if (typeof newCollapsedState === 'undefined') {
        newCollapsedState = [];
      }

      if (!collapsed) {
        newCollapsedState = newCollapsedState.filter((existingID) => existingID !== rowID);
      } else {
        newCollapsedState.push(rowID);
      }

      setPreference(preferencesKey, {
        ...preferencesToSet,
        fields: {
          ...preferencesToSet?.fields || {},
          [path]: {
            ...preferencesToSet?.fields?.[path],
            collapsed: newCollapsedState,
          },
        },
      });
    }
  }, [preferencesKey, getPreference, path, setPreference, initCollapsed, rows]);

  const toggleCollapseAll = useCallback(async (collapse: boolean) => {
    dispatchRows({ type: 'SET_ALL_COLLAPSED', collapse });

    if (preferencesKey) {
      const preferencesToSet = await getPreference(preferencesKey) || { fields: {} };

      setPreference(preferencesKey, {
        ...preferencesToSet,
        fields: {
          ...preferencesToSet?.fields || {},
          [path]: {
            ...preferencesToSet?.fields?.[path],
            collapsed: collapse ? rows.map(({ id: rowID }) => rowID) : [],
          },
        },
      });
    }
  }, [getPreference, path, preferencesKey, rows, setPreference]);

  // Set row count on mount and when form context is reset
  useEffect(() => {
    const initializeRowState = async () => {
      const data = formContext.getDataByPath<Row[]>(path);
      const preferences = (await getPreference(preferencesKey)) || { fields: {} };
      dispatchRows({ type: 'SET_ALL', data: data || [], collapsedState: preferences?.fields?.[path]?.collapsed, initCollapsed });
    };

    initializeRowState();
  }, [formContext, path, getPreference, preferencesKey, initCollapsed]);

  const hasMaxRows = maxRows && rows?.length >= maxRows;

  const classes = [
    'field-type',
    baseClass,
    className,
  ].filter(Boolean).join(' ');

  if (!rows) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        id={`field-${path.replace(/\./gi, '__')}`}
        className={classes}
      >
        <div className={`${baseClass}__error-wrap`}>
          <Error
            showError={showError}
            message={errorMessage}
          />
        </div>
        <header className={`${baseClass}__header`}>
          <div className={`${baseClass}__header-wrap`}>
            <h3>{getTranslation(label || name, i18n)}</h3>
            <ul className={`${baseClass}__header-actions`}>
              <li>
                <button
                  type="button"
                  onClick={() => toggleCollapseAll(true)}
                  className={`${baseClass}__header-action`}
                >
                  {t('collapseAll')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => toggleCollapseAll(false)}
                  className={`${baseClass}__header-action`}
                >
                  {t('showAll')}
                </button>
              </li>
            </ul>
          </div>
          <FieldDescription
            value={value}
            description={description}
          />
        </header>

        <Droppable
          droppableId="blocks-drop"
          isDropDisabled={readOnly}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {rows.length > 0 && rows.map((row, i) => {
                const { blockType } = row;
                const blockToRender = blocks.find((block) => block.slug === blockType);

                const rowNumber = i + 1;

                if (blockToRender) {
                  return (
                    <Draggable
                      key={row.id}
                      draggableId={row.id}
                      index={i}
                      isDragDisabled={readOnly}
                    >
                      {(providedDrag) => (
                        <div
                          id={`${path}-row-${i}`}
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                        >
                          <Collapsible
                            collapsed={row.collapsed}
                            onToggle={(collapsed) => setCollapse(row.id, collapsed)}
                            className={`${baseClass}__row`}
                            key={row.id}
                            dragHandleProps={providedDrag.dragHandleProps}
                            header={(
                              <div className={`${baseClass}__block-header`}>
                                <span className={`${baseClass}__block-number`}>
                                  {rowNumber >= 10 ? rowNumber : `0${rowNumber}`}
                                </span>
                                <Pill
                                  pillStyle="white"
                                  className={`${baseClass}__block-pill ${baseClass}__block-pill-${blockType}`}
                                >
                                  {getTranslation(blockToRender.labels.singular, i18n)}
                                </Pill>
                                <SectionTitle
                                  path={`${path}.${i}.blockName`}
                                  readOnly={readOnly}
                                />
                              </div>
                            )}
                            actions={!readOnly ? (
                              <React.Fragment>
                                <Popup
                                  key={`${blockType}-${i}`}
                                  forceOpen={selectorIndexOpen === i}
                                  onToggleOpen={onAddPopupToggle}
                                  buttonType="none"
                                  size="large"
                                  horizontalAlign="right"
                                  render={({ close }) => (
                                    <BlockSelector
                                      blocks={blocks}
                                      addRow={addRow}
                                      addRowIndex={i}
                                      close={close}
                                    />
                                  )}
                                />
                                <ArrayAction
                                  rowCount={rows.length}
                                  duplicateRow={() => duplicateRow(i, blockType)}
                                  addRow={() => setSelectorIndexOpen(i)}
                                  moveRow={moveRow}
                                  removeRow={removeRow}
                                  index={i}
                                />
                              </React.Fragment>
                            ) : undefined}
                          >
                            <HiddenInput
                              name={`${path}.${i}.id`}
                              value={row.id}
                            />
                            <RenderFields
                              className={`${baseClass}__fields`}
                              forceRender
                              readOnly={readOnly}
                              fieldTypes={fieldTypes}
                              permissions={permissions?.fields}
                              fieldSchema={blockToRender.fields.map((field) => ({
                                ...field,
                                path: `${path}.${i}${fieldAffectsData(field) ? `.${field.name}` : ''}`,
                              }))}
                              indexPath={indexPath}
                            />

                          </Collapsible>
                        </div>
                      )}
                    </Draggable>
                  );
                }

                return null;
              })}
              {(rows.length < minRows || (required && rows.length === 0)) && (
                <Banner type="error">
                  {t('validation:requiresAtLeast', {
                    count: minRows,
                    label: getTranslation(minRows === 1 || typeof minRows === 'undefined' ? labels.singular : labels.plural, i18n),
                  })}
                </Banner>
              )}
              {(rows.length === 0 && readOnly) && (
                <Banner>
                  {t('validation:fieldHasNo', { label: getTranslation(labels.plural, i18n) })}
                </Banner>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {(!readOnly && !hasMaxRows) && (
          <div className={`${baseClass}__add-button-wrap`}>
            <Popup
              buttonType="custom"
              size="large"
              horizontalAlign="left"
              button={(
                <Button
                  buttonStyle="icon-label"
                  icon="plus"
                  iconPosition="left"
                  iconStyle="with-border"
                >
                  {t('addLabel', { label: getTranslation(labels.singular, i18n) })}
                </Button>
              )}
              render={({ close }) => (
                <BlockSelector
                  blocks={blocks}
                  addRow={addRow}
                  addRowIndex={value}
                  close={close}
                />
              )}
            />
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default withCondition(BlocksField);
