import React, { useState, useEffect } from 'react';
import queryString from 'qs';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactSelect from '../ReactSelect';
import sortableFieldTypes from '../../../../fields/sortableFieldTypes';
import { useSearchParams } from '../../utilities/SearchParams';
import { fieldAffectsData } from '../../../../fields/config/types';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'sort-complex';
const sortOptions = [{ label: 'Ascending', value: '' }, { label: 'Descending', value: '-' }];
const SortComplex = (props) => {
    const { collection, modifySearchQuery = true, handleChange, } = props;
    const history = useHistory();
    const params = useSearchParams();
    const { t, i18n } = useTranslation('general');
    const [sortFields] = useState(() => collection.fields.reduce((fields, field) => {
        if (fieldAffectsData(field) && sortableFieldTypes.indexOf(field.type) > -1) {
            return [
                ...fields,
                { label: getTranslation(field.label || field.name, i18n), value: field.name },
            ];
        }
        return fields;
    }, []));
    const [sortField, setSortField] = useState(sortFields[0]);
    const [sortOrder, setSortOrder] = useState({ label: t('descending'), value: '-' });
    useEffect(() => {
        if (sortField === null || sortField === void 0 ? void 0 : sortField.value) {
            const newSortValue = `${sortOrder.value}${sortField.value}`;
            if (handleChange)
                handleChange(newSortValue);
            if (params.sort !== newSortValue && modifySearchQuery) {
                history.replace({
                    search: queryString.stringify({
                        ...params,
                        sort: newSortValue,
                    }, { addQueryPrefix: true }),
                });
            }
        }
    }, [history, params, sortField, sortOrder, modifySearchQuery, handleChange]);
    return (React.createElement("div", { className: baseClass },
        React.createElement(React.Fragment, null,
            React.createElement("div", { className: `${baseClass}__wrap` },
                React.createElement("div", { className: `${baseClass}__select` },
                    React.createElement("div", { className: `${baseClass}__label` }, t('columnToSort')),
                    React.createElement(ReactSelect, { value: sortField, options: sortFields, onChange: setSortField })),
                React.createElement("div", { className: `${baseClass}__select` },
                    React.createElement("div", { className: `${baseClass}__label` }, t('order')),
                    React.createElement(ReactSelect, { value: sortOrder, options: sortOptions, onChange: setSortOrder }))))));
};
export default SortComplex;
