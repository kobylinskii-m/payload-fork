import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import { diffStyles } from '../styles';
import { getTranslation } from '../../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'select-diff';
const getOptionsToRender = (value, options, hasMany) => {
    if (hasMany && Array.isArray(value)) {
        return value.map((val) => options.find((option) => (typeof option === 'string' ? option : option.value) === val));
    }
    return options.find((option) => (typeof option === 'string' ? option : option.value) === value);
};
const getTranslatedOptions = (options, i18n) => {
    if (Array.isArray(options)) {
        return options.map((option) => (typeof option === 'string' ? option : getTranslation(option.label, i18n))).join(', ');
    }
    return typeof options === 'string' ? options : getTranslation(options.label, i18n);
};
const Select = ({ field, locale, version, comparison, diffMethod }) => {
    let placeholder = '';
    const { t, i18n } = useTranslation('general');
    if (version === comparison)
        placeholder = `[${t('noValue')}]`;
    const comparisonToRender = typeof comparison !== 'undefined' ? getTranslatedOptions(getOptionsToRender(comparison, field.options, field.hasMany), i18n) : placeholder;
    const versionToRender = typeof version !== 'undefined' ? getTranslatedOptions(getOptionsToRender(version, field.options, field.hasMany), i18n) : placeholder;
    return (React.createElement("div", { className: baseClass },
        React.createElement(Label, null,
            locale && (React.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            getTranslation(field.label, i18n)),
        React.createElement(ReactDiffViewer, { styles: diffStyles, compareMethod: DiffMethod[diffMethod], oldValue: comparisonToRender, newValue: typeof versionToRender !== 'undefined' ? versionToRender : placeholder, splitView: true, hideLineNumbers: true, showDiffOnly: false })));
};
export default Select;
