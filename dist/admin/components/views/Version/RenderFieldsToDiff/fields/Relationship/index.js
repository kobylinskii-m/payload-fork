import React from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { useTranslation } from 'react-i18next';
import { fieldAffectsData, fieldIsPresentationalOnly } from '../../../../../../../fields/config/types';
import { getTranslation } from '../../../../../../../utilities/getTranslation';
import { useConfig } from '../../../../../utilities/Config';
import { useLocale } from '../../../../../utilities/Locale';
import Label from '../../Label';
import { diffStyles } from '../styles';
import { handlerAsTitle } from '../../../../../../../utilities/formatLabels';
import './index.scss';
const baseClass = 'relationship-diff';
const generateLabelFromValue = (collections, field, locale, value) => {
    var _a, _b;
    let relation;
    let relatedDoc;
    let valueToReturn = '';
    if (Array.isArray(field.relationTo)) {
        if (typeof value === 'object') {
            relation = value.relationTo;
            relatedDoc = value.value;
        }
    }
    else {
        relation = field.relationTo;
        relatedDoc = value;
    }
    const relatedCollection = collections.find((c) => c.slug === relation);
    if (relatedCollection) {
        const useAsTitle = (_a = relatedCollection === null || relatedCollection === void 0 ? void 0 : relatedCollection.admin) === null || _a === void 0 ? void 0 : _a.useAsTitle;
        const useAsTitleField = relatedCollection.fields.find((f) => (fieldAffectsData(f) && !fieldIsPresentationalOnly(f)) && f.name === useAsTitle);
        let titleFieldIsLocalized = false;
        if (useAsTitleField && fieldAffectsData(useAsTitleField))
            titleFieldIsLocalized = useAsTitleField.localized;
        const labelTitle = handlerAsTitle(relatedDoc, (_b = relatedCollection === null || relatedCollection === void 0 ? void 0 : relatedCollection.admin) === null || _b === void 0 ? void 0 : _b.useAsTitle);
        if (typeof labelTitle !== 'undefined') {
            valueToReturn = labelTitle;
        }
        else if (typeof (relatedDoc === null || relatedDoc === void 0 ? void 0 : relatedDoc.id) !== 'undefined') {
            valueToReturn = relatedDoc.id;
        }
        if (typeof valueToReturn === 'object' && titleFieldIsLocalized) {
            valueToReturn = valueToReturn[locale];
        }
    }
    return valueToReturn;
};
const Relationship = ({ field, version, comparison }) => {
    const { collections } = useConfig();
    const { t, i18n } = useTranslation('general');
    const locale = useLocale();
    let placeholder = '';
    if (version === comparison)
        placeholder = `[${t('noValue')}]`;
    let versionToRender = version;
    let comparisonToRender = comparison;
    if (field.hasMany) {
        if (Array.isArray(version))
            versionToRender = version.map((val) => generateLabelFromValue(collections, field, locale, val)).join(', ');
        if (Array.isArray(comparison))
            comparisonToRender = comparison.map((val) => generateLabelFromValue(collections, field, locale, val)).join(', ');
    }
    else {
        versionToRender = generateLabelFromValue(collections, field, locale, version);
        comparisonToRender = generateLabelFromValue(collections, field, locale, comparison);
    }
    return (React.createElement("div", { className: baseClass },
        React.createElement(Label, null,
            locale && (React.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            getTranslation(field.label, i18n)),
        React.createElement(ReactDiffViewer, { styles: diffStyles, oldValue: typeof comparisonToRender !== 'undefined' ? String(comparisonToRender) : placeholder, newValue: typeof versionToRender !== 'undefined' ? String(versionToRender) : placeholder, splitView: true, hideLineNumbers: true, showDiffOnly: false })));
    return null;
};
export default Relationship;
