import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import { diffStyles } from '../styles';
import { getTranslation } from '../../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'text-diff';
const Text = ({ field, locale, version, comparison, isRichText = false, diffMethod }) => {
    let placeholder = '';
    const { t, i18n } = useTranslation('general');
    if (version === comparison)
        placeholder = `[${t('noValue')}]`;
    let versionToRender = version;
    let comparisonToRender = comparison;
    if (isRichText) {
        if (typeof version === 'object')
            versionToRender = JSON.stringify(version, null, 2);
        if (typeof comparison === 'object')
            comparisonToRender = JSON.stringify(comparison, null, 2);
    }
    return (React.createElement("div", { className: baseClass },
        React.createElement(Label, null,
            locale && (React.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            getTranslation(field.label, i18n)),
        React.createElement(ReactDiffViewer, { styles: diffStyles, compareMethod: DiffMethod[diffMethod], oldValue: typeof comparisonToRender !== 'undefined' ? String(comparisonToRender) : placeholder, newValue: typeof versionToRender !== 'undefined' ? String(versionToRender) : placeholder, splitView: true, hideLineNumbers: true, showDiffOnly: false })));
};
export default Text;
