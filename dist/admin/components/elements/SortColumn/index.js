import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'qs';
import { useTranslation } from 'react-i18next';
import Chevron from '../../icons/Chevron';
import Button from '../Button';
import { useSearchParams } from '../../utilities/SearchParams';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'sort-column';
const SortColumn = (props) => {
    const { label, name, disable = false, } = props;
    const params = useSearchParams();
    const history = useHistory();
    const { i18n } = useTranslation();
    const { sort } = params;
    const desc = `-${name}`;
    const asc = name;
    const ascClasses = [`${baseClass}__asc`];
    if (sort === asc)
        ascClasses.push(`${baseClass}--active`);
    const descClasses = [`${baseClass}__desc`];
    if (sort === desc)
        descClasses.push(`${baseClass}--active`);
    const setSort = useCallback((newSort) => {
        history.push({
            search: queryString.stringify({
                ...params,
                sort: newSort,
            }, { addQueryPrefix: true }),
        });
    }, [params, history]);
    return (React.createElement("div", { className: baseClass },
        React.createElement("span", { className: `${baseClass}__label` }, getTranslation(label, i18n)),
        !disable && (React.createElement("span", { className: `${baseClass}__buttons` },
            React.createElement(Button, { round: true, buttonStyle: "none", className: ascClasses.join(' '), onClick: () => setSort(asc) },
                React.createElement(Chevron, null)),
            React.createElement(Button, { round: true, buttonStyle: "none", className: descClasses.join(' '), onClick: () => setSort(desc) },
                React.createElement(Chevron, null))))));
};
export default SortColumn;
