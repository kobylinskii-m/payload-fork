import React, { useCallback, useEffect, useState } from 'react';
import RenderFields from '../../RenderFields';
import withCondition from '../../withCondition';
import { Collapsible } from '../../../elements/Collapsible';
import { usePreferences } from '../../../utilities/Preferences';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import FieldDescription from '../../FieldDescription';
import { getFieldPath } from '../getFieldPath';
import { RowLabel } from '../../RowLabel';
import './index.scss';
const baseClass = 'collapsible-field';
const CollapsibleField = (props) => {
    const { label, fields, fieldTypes, path, permissions, indexPath, admin: { readOnly, className, initCollapsed, description, }, } = props;
    const { getPreference, setPreference } = usePreferences();
    const { preferencesKey } = useDocumentInfo();
    const [collapsedOnMount, setCollapsedOnMount] = useState();
    const fieldPreferencesKey = `collapsible-${indexPath.replace(/\./gi, '__')}`;
    const onToggle = useCallback(async (newCollapsedState) => {
        var _a, _b;
        const existingPreferences = await getPreference(preferencesKey);
        setPreference(preferencesKey, {
            ...existingPreferences,
            ...path ? {
                fields: {
                    ...(existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) || {},
                    [path]: {
                        ...(_a = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _a === void 0 ? void 0 : _a[path],
                        collapsed: newCollapsedState,
                    },
                },
            } : {
                fields: {
                    ...(existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) || {},
                    [fieldPreferencesKey]: {
                        ...(_b = existingPreferences === null || existingPreferences === void 0 ? void 0 : existingPreferences.fields) === null || _b === void 0 ? void 0 : _b[fieldPreferencesKey],
                        collapsed: newCollapsedState,
                    },
                },
            },
        });
    }, [preferencesKey, fieldPreferencesKey, getPreference, setPreference, path]);
    useEffect(() => {
        const fetchInitialState = async () => {
            var _a, _b, _c, _d;
            const preferences = await getPreference(preferencesKey);
            if (preferences) {
                const initCollapsedFromPref = path ? (_b = (_a = preferences === null || preferences === void 0 ? void 0 : preferences.fields) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.collapsed : (_d = (_c = preferences === null || preferences === void 0 ? void 0 : preferences.fields) === null || _c === void 0 ? void 0 : _c[fieldPreferencesKey]) === null || _d === void 0 ? void 0 : _d.collapsed;
                setCollapsedOnMount(Boolean(initCollapsedFromPref));
            }
            else {
                setCollapsedOnMount(typeof initCollapsed === 'boolean' ? initCollapsed : false);
            }
        };
        fetchInitialState();
    }, [getPreference, preferencesKey, fieldPreferencesKey, initCollapsed, path]);
    if (typeof collapsedOnMount !== 'boolean')
        return null;
    return (React.createElement("div", { id: `field-${fieldPreferencesKey}${path ? `-${path.replace(/\./gi, '__')}` : ''}` },
        React.createElement(Collapsible, { initCollapsed: collapsedOnMount, className: [
                'field-type',
                baseClass,
                className,
            ].filter(Boolean).join(' '), header: (React.createElement(RowLabel, { path: path, label: label })), onToggle: onToggle },
            React.createElement(RenderFields, { forceRender: true, readOnly: readOnly, permissions: permissions, fieldTypes: fieldTypes, indexPath: indexPath, fieldSchema: fields.map((field) => ({
                    ...field,
                    path: getFieldPath(path, field),
                })) })),
        React.createElement(FieldDescription, { description: description })));
};
export default withCondition(CollapsibleField);
