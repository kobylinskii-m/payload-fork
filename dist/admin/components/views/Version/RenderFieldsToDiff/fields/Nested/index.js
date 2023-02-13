import React from 'react';
import { useTranslation } from 'react-i18next';
import RenderFieldsToDiff from '../..';
import Label from '../../Label';
import { getTranslation } from '../../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'nested-diff';
const Nested = ({ version, comparison, permissions, field, locale, locales, fieldComponents, disableGutter = false, }) => {
    const { i18n } = useTranslation();
    return (React.createElement("div", { className: baseClass },
        field.label && (React.createElement(Label, null,
            locale && (React.createElement("span", { className: `${baseClass}__locale-label` }, locale)),
            getTranslation(field.label, i18n))),
        React.createElement("div", { className: [
                `${baseClass}__wrap`,
                !disableGutter && `${baseClass}__wrap--gutter`,
            ].filter(Boolean)
                .join(' ') },
            React.createElement(RenderFieldsToDiff, { locales: locales, version: version, comparison: comparison, fieldPermissions: permissions, fields: field.fields, fieldComponents: fieldComponents }))));
};
export default Nested;
