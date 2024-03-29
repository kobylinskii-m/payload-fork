import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'qs';
import { useTranslation } from 'react-i18next';
import Search from '../../icons/Search';
import useDebounce from '../../../hooks/useDebounce';
import { useSearchParams } from '../../utilities/SearchParams';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'search-filter';
const SearchFilter = (props) => {
    const { fieldName = 'id', fieldLabel = 'ID', modifySearchQuery = true, listSearchableFields, handleChange, } = props;
    const params = useSearchParams();
    const history = useHistory();
    const { t, i18n } = useTranslation('general');
    const [search, setSearch] = useState('');
    const [previousSearch, setPreviousSearch] = useState('');
    const placeholder = useRef(t('searchBy', { label: getTranslation(fieldLabel, i18n) }));
    const debouncedSearch = useDebounce(search, 300);
    useEffect(() => {
        const newWhere = { ...typeof (params === null || params === void 0 ? void 0 : params.where) === 'object' ? params.where : {} };
        const fieldNamesToSearch = [fieldName, ...(listSearchableFields || []).map(({ name }) => name)];
        fieldNamesToSearch.forEach((fieldNameToSearch) => {
            const hasOrQuery = Array.isArray(newWhere.or);
            const existingFieldSearchIndex = hasOrQuery ? newWhere.or.findIndex((condition) => {
                var _a;
                return (_a = condition === null || condition === void 0 ? void 0 : condition[fieldNameToSearch]) === null || _a === void 0 ? void 0 : _a.contains;
            }) : -1;
            if (debouncedSearch) {
                if (!hasOrQuery)
                    newWhere.or = [];
                if (existingFieldSearchIndex > -1) {
                    newWhere.or[existingFieldSearchIndex][fieldNameToSearch].contains = debouncedSearch;
                }
                else {
                    newWhere.or.push({
                        [fieldNameToSearch]: {
                            contains: debouncedSearch,
                        },
                    });
                }
            }
            else if (existingFieldSearchIndex > -1) {
                newWhere.or.splice(existingFieldSearchIndex, 1);
            }
        });
        if (debouncedSearch !== previousSearch) {
            if (handleChange)
                handleChange(newWhere);
            if (modifySearchQuery) {
                history.replace({
                    search: queryString.stringify({
                        ...params,
                        page: 1,
                        where: newWhere,
                    }),
                });
            }
            setPreviousSearch(debouncedSearch);
        }
    }, [debouncedSearch, previousSearch, history, fieldName, params, handleChange, modifySearchQuery, listSearchableFields]);
    useEffect(() => {
        if ((listSearchableFields === null || listSearchableFields === void 0 ? void 0 : listSearchableFields.length) > 0) {
            placeholder.current = listSearchableFields.reduce((prev, curr, i) => {
                if (i === listSearchableFields.length - 1) {
                    return `${prev} ${t('or')} ${getTranslation(curr.label || curr.name, i18n)}`;
                }
                return `${prev}, ${getTranslation(curr.label || curr.name, i18n)}`;
            }, placeholder.current);
        }
    }, [t, listSearchableFields, i18n]);
    return (React.createElement("div", { className: baseClass },
        React.createElement("input", { className: `${baseClass}__input`, placeholder: placeholder.current, type: "text", value: search || '', onChange: (e) => setSearch(e.target.value) }),
        React.createElement(Search, null)));
};
export default SearchFilter;
