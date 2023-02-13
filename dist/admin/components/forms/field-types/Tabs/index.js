import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderFields from '../../RenderFields';
import withCondition from '../../withCondition';
import { fieldAffectsData, tabHasName } from '../../../../../fields/config/types';
import FieldDescription from '../../FieldDescription';
import toKebabCase from '../../../../../utilities/toKebabCase';
import { useCollapsible } from '../../../elements/Collapsible/provider';
import { TabsProvider } from './provider';
import { getTranslation } from '../../../../../utilities/getTranslation';
import { usePreferences } from '../../../utilities/Preferences';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import './index.scss';
const baseClass = 'tabs-field';
const TabsField = (props) => {
    const { tabs, fieldTypes, path, permissions, indexPath, admin: { readOnly, className, }, } = props;
    const { getPreference, setPreference } = usePreferences();
    const { preferencesKey } = useDocumentInfo();
    const { i18n } = useTranslation();
    const isWithinCollapsible = useCollapsible();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsPrefKey = `tabs-${indexPath}`;
    useEffect(() => {
        const getInitialPref = async () => {
            var _a, _b, _c, _d;
            const existingPreferences = await getPreference(preferencesKey);
            const initialIndex = path ? (_b = (_a = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.tabIndex : (_d = (_c = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _c === void 0 ? void 0 : _c[tabsPrefKey]) === null || _d === void 0 ? void 0 : _d.tabIndex;
            setActiveTabIndex(initialIndex || 0);
        };
        getInitialPref();
    }, [path, indexPath]);
    const handleTabChange = useCallback(async (incomingTabIndex) => {
        var _a, _b;
        setActiveTabIndex(incomingTabIndex);
        const existingPreferences = await getPreference(preferencesKey);
        setPreference(preferencesKey, {
            ...existingPreferences,
            ...path ? {
                fields: {
                    ...(existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) || {},
                    [path]: {
                        ...(_a = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _a === void 0 ? void 0 : _a[path],
                        tabIndex: incomingTabIndex,
                    },
                },
            } : {
                fields: {
                    ...existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields,
                    [tabsPrefKey]: {
                        ...(_b = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _b === void 0 ? void 0 : _b[tabsPrefKey],
                        tabIndex: incomingTabIndex,
                    }
                },
            }
        });
    }, [indexPath, preferencesKey, getPreference, setPreference, path]);
    const activeTabConfig = tabs[activeTabIndex];
    return (React.createElement("div", { className: [
            className,
            baseClass,
            isWithinCollapsible && `${baseClass}--within-collapsible`,
        ].filter(Boolean).join(' ') },
        React.createElement(TabsProvider, null,
            React.createElement("div", { className: `${baseClass}__tabs-wrap` },
                React.createElement("div", { className: `${baseClass}__tabs` }, tabs.map((tab, tabIndex) => {
                    return (React.createElement("button", { key: tabIndex, type: "button", className: [
                            `${baseClass}__tab-button`,
                            activeTabIndex === tabIndex && `${baseClass}__tab-button--active`,
                        ].filter(Boolean).join(' '), onClick: () => {
                            handleTabChange(tabIndex);
                        } }, tab.label ? getTranslation(tab.label, i18n) : (tabHasName(tab) && tab.name)));
                }))),
            React.createElement("div", { className: `${baseClass}__content-wrap` }, activeTabConfig && (React.createElement("div", { className: [
                    `${baseClass}__tab`,
                    `${baseClass}__tab-${toKebabCase(activeTabConfig.label)}`,
                ].join(' ') },
                React.createElement(FieldDescription, { className: `${baseClass}__description`, description: activeTabConfig.description }),
                React.createElement(RenderFields, { key: String(activeTabConfig.label), forceRender: true, readOnly: readOnly, permissions: tabHasName(activeTabConfig) ? permissions[activeTabConfig.name].fields : permissions, fieldTypes: fieldTypes, fieldSchema: activeTabConfig.fields.map((field) => ({
                        ...field,
                        path: `${path ? `${path}.` : ''}${tabHasName(activeTabConfig) ? `${activeTabConfig.name}.` : ''}${fieldAffectsData(field) ? field.name : ''}`,
                    })), indexPath: indexPath })))))));
};
export default withCondition(TabsField);
