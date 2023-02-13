import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';
import useIntersect from '../../../hooks/useIntersect';
import { fieldAffectsData, fieldIsPresentationalOnly } from '../../../../fields/config/types';
import { useOperation } from '../../utilities/OperationProvider';
import { getTranslation } from '../../../../utilities/getTranslation';
const baseClass = 'render-fields';
const intersectionObserverOptions = {
    rootMargin: '1000px',
};
const RenderFields = (props) => {
    var _a;
    const { fieldSchema, fieldTypes, filter, permissions, readOnly: readOnlyOverride, className, forceRender, indexPath: incomingIndexPath, } = props;
    const { t, i18n } = useTranslation('general');
    const [hasRendered, setHasRendered] = useState(Boolean(forceRender));
    const [intersectionRef, entry] = useIntersect(intersectionObserverOptions);
    const operation = useOperation();
    const isIntersecting = Boolean(entry === null || entry === void 0 ? void 0 : entry.isIntersecting);
    const isAboveViewport = ((_a = entry === null || entry === void 0 ? void 0 : entry.boundingClientRect) === null || _a === void 0 ? void 0 : _a.top) < 0;
    const shouldRender = forceRender || isIntersecting || isAboveViewport;
    useEffect(() => {
        if (shouldRender && !hasRendered) {
            setHasRendered(true);
        }
    }, [shouldRender, hasRendered]);
    const classes = [
        baseClass,
        className,
    ].filter(Boolean).join(' ');
    if (fieldSchema) {
        return (React.createElement("div", { ref: intersectionRef, className: classes }, hasRendered && (fieldSchema.map((field, fieldIndex) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const fieldIsPresentational = fieldIsPresentationalOnly(field);
            let FieldComponent = fieldTypes[field.type];
            if (fieldIsPresentational || (!(field === null || field === void 0 ? void 0 : field.hidden) && ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.disabled) !== true)) {
                if ((filter && typeof filter === 'function' && filter(field)) || !filter) {
                    if (fieldIsPresentational) {
                        return (React.createElement(FieldComponent, { ...field, key: fieldIndex }));
                    }
                    if ((_b = field === null || field === void 0 ? void 0 : field.admin) === null || _b === void 0 ? void 0 : _b.hidden) {
                        FieldComponent = fieldTypes.hidden;
                    }
                    const isFieldAffectingData = fieldAffectsData(field);
                    const fieldPermissions = isFieldAffectingData ? permissions === null || permissions === void 0 ? void 0 : permissions[field.name] : permissions;
                    let { admin: { readOnly } = {} } = field;
                    if (readOnlyOverride && readOnly !== false)
                        readOnly = true;
                    if ((isFieldAffectingData && ((_d = (_c = permissions === null || permissions === void 0 ? void 0 : permissions[field === null || field === void 0 ? void 0 : field.name]) === null || _c === void 0 ? void 0 : _c.read) === null || _d === void 0 ? void 0 : _d.permission) !== false) || !isFieldAffectingData) {
                        if (isFieldAffectingData && ((_f = (_e = permissions === null || permissions === void 0 ? void 0 : permissions[field === null || field === void 0 ? void 0 : field.name]) === null || _e === void 0 ? void 0 : _e[operation]) === null || _f === void 0 ? void 0 : _f.permission) === false) {
                            readOnly = true;
                        }
                        if (FieldComponent) {
                            return (React.createElement(RenderCustomComponent, { key: fieldIndex, CustomComponent: (_h = (_g = field === null || field === void 0 ? void 0 : field.admin) === null || _g === void 0 ? void 0 : _g.components) === null || _h === void 0 ? void 0 : _h.Field, DefaultComponent: FieldComponent, componentProps: {
                                    ...field,
                                    path: field.path || (isFieldAffectingData ? field.name : ''),
                                    fieldTypes,
                                    indexPath: incomingIndexPath ? `${incomingIndexPath}.${fieldIndex}` : `${fieldIndex}`,
                                    admin: {
                                        ...(field.admin || {}),
                                        readOnly,
                                    },
                                    permissions: fieldPermissions,
                                } }));
                        }
                        return (React.createElement("div", { className: "missing-field", key: fieldIndex }, t('error:noMatchedField', { label: fieldAffectsData(field) ? getTranslation(field.label || field.name, i18n) : field.path })));
                    }
                }
                return null;
            }
            return null;
        }))));
    }
    return null;
};
export default RenderFields;
