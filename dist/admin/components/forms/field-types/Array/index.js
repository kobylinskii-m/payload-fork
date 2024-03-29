import React, { useCallback, useEffect, useReducer } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../utilities/Auth';
import withCondition from '../../withCondition';
import Button from '../../../elements/Button';
import reducer from '../rowReducer';
import { useForm } from '../../Form/context';
import buildStateFromSchema from '../../Form/buildStateFromSchema';
import useField from '../../useField';
import { useLocale } from '../../../utilities/Locale';
import Error from '../../Error';
import { array } from '../../../../../fields/validations';
import Banner from '../../../elements/Banner';
import FieldDescription from '../../FieldDescription';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import { useOperation } from '../../../utilities/OperationProvider';
import { Collapsible } from '../../../elements/Collapsible';
import RenderFields from '../../RenderFields';
import { fieldAffectsData } from '../../../../../fields/config/types';
import { usePreferences } from '../../../utilities/Preferences';
import { ArrayAction } from '../../../elements/ArrayAction';
import { scrollToID } from '../../../../utilities/scrollToID';
import HiddenInput from '../HiddenInput';
import { RowLabel } from '../../RowLabel';
import './index.scss';
import { getTranslation } from '../../../../../utilities/getTranslation';
const baseClass = 'array-field';
const ArrayFieldType = (props) => {
    var _a, _b;
    const { name, path: pathFromProps, fields, fieldTypes, validate = array, required, maxRows, minRows, permissions, indexPath, admin: { readOnly, description, condition, initCollapsed, className, components, }, } = props;
    const path = pathFromProps || name;
    // eslint-disable-next-line react/destructuring-assignment
    const label = (_a = props === null || props === void 0 ? void 0 : props.label) !== null && _a !== void 0 ? _a : (_b = props === null || props === void 0 ? void 0 : props.labels) === null || _b === void 0 ? void 0 : _b.singular;
    const CustomRowLabel = (components === null || components === void 0 ? void 0 : components.RowLabel) || undefined;
    const { preferencesKey } = useDocumentInfo();
    const { getPreference } = usePreferences();
    const { setPreference } = usePreferences();
    const [rows, dispatchRows] = useReducer(reducer, undefined);
    const formContext = useForm();
    const { user } = useAuth();
    const { id } = useDocumentInfo();
    const locale = useLocale();
    const operation = useOperation();
    const { t, i18n } = useTranslation('fields');
    // Handle labeling for Arrays, Global Arrays, and Blocks
    const getLabels = (p) => {
        if (p === null || p === void 0 ? void 0 : p.labels)
            return p.labels;
        if (p === null || p === void 0 ? void 0 : p.label)
            return { singular: p.label, plural: undefined };
        return { singular: t('row'), plural: t('rows') };
    };
    const labels = getLabels(props);
    const { dispatchFields, setModified } = formContext;
    const memoizedValidate = useCallback((value, options) => {
        return validate(value, { ...options, minRows, maxRows, required });
    }, [maxRows, minRows, required, validate]);
    const { showError, errorMessage, value, } = useField({
        path,
        validate: memoizedValidate,
        condition,
        disableFormData: (rows === null || rows === void 0 ? void 0 : rows.length) > 0,
    });
    const addRow = useCallback(async (rowIndex) => {
        const subFieldState = await buildStateFromSchema({ fieldSchema: fields, operation, id, user, locale, t });
        dispatchFields({ type: 'ADD_ROW', rowIndex, subFieldState, path });
        dispatchRows({ type: 'ADD', rowIndex });
        setModified(true);
        setTimeout(() => {
            scrollToID(`${path}-row-${rowIndex + 1}`);
        }, 0);
    }, [dispatchRows, dispatchFields, fields, path, operation, id, user, locale, setModified, t]);
    const duplicateRow = useCallback(async (rowIndex) => {
        dispatchFields({ type: 'DUPLICATE_ROW', rowIndex, path });
        dispatchRows({ type: 'ADD', rowIndex });
        setModified(true);
        setTimeout(() => {
            scrollToID(`${path}-row-${rowIndex + 1}`);
        }, 0);
    }, [dispatchRows, dispatchFields, path, setModified]);
    const removeRow = useCallback((rowIndex) => {
        dispatchRows({ type: 'REMOVE', rowIndex });
        dispatchFields({ type: 'REMOVE_ROW', rowIndex, path });
        setModified(true);
    }, [dispatchRows, dispatchFields, path, setModified]);
    const moveRow = useCallback((moveFromIndex, moveToIndex) => {
        dispatchRows({ type: 'MOVE', moveFromIndex, moveToIndex });
        dispatchFields({ type: 'MOVE_ROW', moveFromIndex, moveToIndex, path });
        setModified(true);
    }, [dispatchRows, dispatchFields, path, setModified]);
    const onDragEnd = useCallback((result) => {
        if (!result.destination)
            return;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        moveRow(sourceIndex, destinationIndex);
    }, [moveRow]);
    const setCollapse = useCallback(async (rowID, collapsed) => {
        var _a, _b, _c;
        dispatchRows({ type: 'SET_COLLAPSE', id: rowID, collapsed });
        if (preferencesKey) {
            const preferencesToSet = (await getPreference(preferencesKey)) || { fields: {} };
            let newCollapsedState = (_b = (_a = preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.collapsed;
            if (initCollapsed && typeof newCollapsedState === 'undefined') {
                newCollapsedState = rows.map((row) => row.id);
            }
            else if (typeof newCollapsedState === 'undefined') {
                newCollapsedState = [];
            }
            if (!collapsed) {
                newCollapsedState = newCollapsedState.filter((existingID) => existingID !== rowID);
            }
            else {
                newCollapsedState.push(rowID);
            }
            setPreference(preferencesKey, {
                ...preferencesToSet,
                fields: {
                    ...((preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) || {}),
                    [path]: {
                        ...(_c = preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) === null || _c === void 0 ? void 0 : _c[path],
                        collapsed: newCollapsedState,
                    },
                },
            });
        }
    }, [preferencesKey, getPreference, path, setPreference, initCollapsed, rows]);
    const toggleCollapseAll = useCallback(async (collapse) => {
        var _a;
        dispatchRows({ type: 'SET_ALL_COLLAPSED', collapse });
        if (preferencesKey) {
            const preferencesToSet = await getPreference(preferencesKey) || { fields: {} };
            setPreference(preferencesKey, {
                ...preferencesToSet,
                fields: {
                    ...(preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) || {},
                    [path]: {
                        ...(_a = preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) === null || _a === void 0 ? void 0 : _a[path],
                        collapsed: collapse ? rows.map(({ id: rowID }) => rowID) : [],
                    },
                },
            });
        }
    }, [path, getPreference, preferencesKey, rows, setPreference]);
    useEffect(() => {
        const initializeRowState = async () => {
            var _a, _b;
            const data = formContext.getDataByPath(path);
            const preferences = (await getPreference(preferencesKey)) || { fields: {} };
            dispatchRows({ type: 'SET_ALL', data: data || [], collapsedState: (_b = (_a = preferences === null || preferences === void 0 ? void 0 : preferences.fields) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.collapsed, initCollapsed });
        };
        initializeRowState();
    }, [formContext, path, getPreference, preferencesKey, initCollapsed]);
    const hasMaxRows = maxRows && (rows === null || rows === void 0 ? void 0 : rows.length) >= maxRows;
    const classes = [
        'field-type',
        baseClass,
        className,
    ].filter(Boolean).join(' ');
    if (!rows)
        return null;
    return (React.createElement(DragDropContext, { onDragEnd: onDragEnd },
        React.createElement("div", { id: `field-${path.replace(/\./gi, '__')}`, className: classes },
            React.createElement("div", { className: `${baseClass}__error-wrap` },
                React.createElement(Error, { showError: showError, message: errorMessage })),
            React.createElement("header", { className: `${baseClass}__header` },
                React.createElement("div", { className: `${baseClass}__header-wrap` },
                    React.createElement("h3", null, getTranslation(label || name, i18n)),
                    React.createElement("ul", { className: `${baseClass}__header-actions` },
                        React.createElement("li", null,
                            React.createElement("button", { type: "button", onClick: () => toggleCollapseAll(true), className: `${baseClass}__header-action` }, t('collapseAll'))),
                        React.createElement("li", null,
                            React.createElement("button", { type: "button", onClick: () => toggleCollapseAll(false), className: `${baseClass}__header-action` }, t('showAll'))))),
                React.createElement(FieldDescription, { className: `field-description-${path.replace(/\./gi, '__')}`, value: value, description: description })),
            React.createElement(Droppable, { droppableId: "array-drop" }, (provided) => (React.createElement("div", { ref: provided.innerRef, ...provided.droppableProps },
                rows.length > 0 && rows.map((row, i) => {
                    const rowNumber = i + 1;
                    const fallbackLabel = `${labels.singular} ${String(rowNumber).padStart(2, '0')}`;
                    return (React.createElement(Draggable, { key: row.id, draggableId: row.id, index: i, isDragDisabled: readOnly }, (providedDrag) => (React.createElement("div", { id: `${path}-row-${i}`, ref: providedDrag.innerRef, ...providedDrag.draggableProps },
                        React.createElement(Collapsible, { collapsed: row.collapsed, onToggle: (collapsed) => setCollapse(row.id, collapsed), className: `${baseClass}__row`, key: row.id, dragHandleProps: providedDrag.dragHandleProps, header: (React.createElement(RowLabel, { path: `${path}.${i}`, label: CustomRowLabel || fallbackLabel, rowNumber: rowNumber })), actions: !readOnly ? (React.createElement(ArrayAction, { rowCount: rows.length, duplicateRow: duplicateRow, addRow: addRow, moveRow: moveRow, removeRow: removeRow, index: i })) : undefined },
                            React.createElement(HiddenInput, { name: `${path}.${i}.id`, value: row.id }),
                            React.createElement(RenderFields, { className: `${baseClass}__fields`, forceRender: true, readOnly: readOnly, fieldTypes: fieldTypes, permissions: permissions === null || permissions === void 0 ? void 0 : permissions.fields, indexPath: indexPath, fieldSchema: fields.map((field) => ({
                                    ...field,
                                    path: `${path}.${i}${fieldAffectsData(field) ? `.${field.name}` : ''}`,
                                })) }))))));
                }),
                (rows.length < minRows || (required && rows.length === 0)) && (React.createElement(Banner, { type: "error" }, t('validation:requiresAtLeast', {
                    count: minRows,
                    label: getTranslation(minRows
                        ? labels.plural
                        : labels.singular, i18n) || t(minRows > 1 ? 'general:row' : 'general:rows'),
                }))),
                (rows.length === 0 && readOnly) && (React.createElement(Banner, null, t('validation:fieldHasNo', { label: getTranslation(labels.plural, i18n) }))),
                provided.placeholder))),
            (!readOnly && !hasMaxRows) && (React.createElement("div", { className: `${baseClass}__add-button-wrap` },
                React.createElement(Button, { onClick: () => addRow(value), buttonStyle: "icon-label", icon: "plus", iconStyle: "with-border", iconPosition: "left" }, t('addLabel', { label: getTranslation(labels.singular, i18n) })))))));
};
export default withCondition(ArrayFieldType);
