import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../utilities/Auth';
import { usePreferences } from '../../../utilities/Preferences';
import { useLocale } from '../../../utilities/Locale';
import withCondition from '../../withCondition';
import Button from '../../../elements/Button';
import reducer from '../rowReducer';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import { useForm } from '../../Form/context';
import buildStateFromSchema from '../../Form/buildStateFromSchema';
import Error from '../../Error';
import useField from '../../useField';
import Popup from '../../../elements/Popup';
import BlockSelector from './BlockSelector';
import { blocks as blocksValidator } from '../../../../../fields/validations';
import Banner from '../../../elements/Banner';
import FieldDescription from '../../FieldDescription';
import { useOperation } from '../../../utilities/OperationProvider';
import { Collapsible } from '../../../elements/Collapsible';
import { ArrayAction } from '../../../elements/ArrayAction';
import RenderFields from '../../RenderFields';
import { fieldAffectsData } from '../../../../../fields/config/types';
import SectionTitle from './SectionTitle';
import Pill from '../../../elements/Pill';
import { scrollToID } from '../../../../utilities/scrollToID';
import HiddenInput from '../HiddenInput';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'blocks-field';
const BlocksField = (props) => {
    const { t, i18n } = useTranslation('fields');
    const { label, name, path: pathFromProps, blocks, labels = {
        singular: t('block'),
        plural: t('blocks'),
    }, fieldTypes, maxRows, minRows, required, validate = blocksValidator, permissions, indexPath, admin: { readOnly, description, condition, initCollapsed, className, }, } = props;
    const path = pathFromProps || name;
    const { preferencesKey } = useDocumentInfo();
    const { getPreference } = usePreferences();
    const { setPreference } = usePreferences();
    const [rows, dispatchRows] = useReducer(reducer, undefined);
    const formContext = useForm();
    const { user } = useAuth();
    const { id } = useDocumentInfo();
    const locale = useLocale();
    const operation = useOperation();
    const { dispatchFields, setModified } = formContext;
    const [selectorIndexOpen, setSelectorIndexOpen] = useState();
    const memoizedValidate = useCallback((value, options) => {
        return validate(value, { ...options, minRows, maxRows, required });
    }, [maxRows, minRows, required, validate]);
    const { showError, errorMessage, value, } = useField({
        path,
        validate: memoizedValidate,
        condition,
        disableFormData: (rows === null || rows === void 0 ? void 0 : rows.length) > 0,
    });
    const onAddPopupToggle = useCallback((open) => {
        if (!open) {
            setSelectorIndexOpen(undefined);
        }
    }, []);
    const addRow = useCallback(async (rowIndex, blockType) => {
        const block = blocks.find((potentialBlock) => potentialBlock.slug === blockType);
        const subFieldState = await buildStateFromSchema({ fieldSchema: block.fields, operation, id, user, locale, t });
        dispatchFields({ type: 'ADD_ROW', rowIndex, subFieldState, path, blockType });
        dispatchRows({ type: 'ADD', rowIndex, blockType });
        setModified(true);
        setTimeout(() => {
            scrollToID(`${path}-row-${rowIndex + 1}`);
        }, 0);
    }, [blocks, operation, id, user, locale, t, dispatchFields, path, setModified]);
    const duplicateRow = useCallback(async (rowIndex, blockType) => {
        dispatchFields({ type: 'DUPLICATE_ROW', rowIndex, path });
        dispatchRows({ type: 'ADD', rowIndex, blockType });
        setModified(true);
        setTimeout(() => {
            scrollToID(`${path}-row-${rowIndex + 1}`);
        }, 0);
    }, [dispatchRows, dispatchFields, path, setModified]);
    const removeRow = useCallback((rowIndex) => {
        dispatchRows({ type: 'REMOVE', rowIndex });
        dispatchFields({ type: 'REMOVE_ROW', rowIndex, path });
        setModified(true);
    }, [path, dispatchFields, setModified]);
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
            const preferencesToSet = await getPreference(preferencesKey) || { fields: {} };
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
                    ...(preferencesToSet === null || preferencesToSet === void 0 ? void 0 : preferencesToSet.fields) || {},
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
    }, [getPreference, path, preferencesKey, rows, setPreference]);
    // Set row count on mount and when form context is reset
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
                React.createElement(FieldDescription, { value: value, description: description })),
            React.createElement(Droppable, { droppableId: "blocks-drop", isDropDisabled: readOnly }, (provided) => (React.createElement("div", { ref: provided.innerRef, ...provided.droppableProps },
                rows.length > 0 && rows.map((row, i) => {
                    const { blockType } = row;
                    const blockToRender = blocks.find((block) => block.slug === blockType);
                    const rowNumber = i + 1;
                    if (blockToRender) {
                        return (React.createElement(Draggable, { key: row.id, draggableId: row.id, index: i, isDragDisabled: readOnly }, (providedDrag) => (React.createElement("div", { id: `${path}-row-${i}`, ref: providedDrag.innerRef, ...providedDrag.draggableProps },
                            React.createElement(Collapsible, { collapsed: row.collapsed, onToggle: (collapsed) => setCollapse(row.id, collapsed), className: `${baseClass}__row`, key: row.id, dragHandleProps: providedDrag.dragHandleProps, header: (React.createElement("div", { className: `${baseClass}__block-header` },
                                    React.createElement("span", { className: `${baseClass}__block-number` }, rowNumber >= 10 ? rowNumber : `0${rowNumber}`),
                                    React.createElement(Pill, { pillStyle: "white", className: `${baseClass}__block-pill ${baseClass}__block-pill-${blockType}` }, getTranslation(blockToRender.labels.singular, i18n)),
                                    React.createElement(SectionTitle, { path: `${path}.${i}.blockName`, readOnly: readOnly }))), actions: !readOnly ? (React.createElement(React.Fragment, null,
                                    React.createElement(Popup, { key: `${blockType}-${i}`, forceOpen: selectorIndexOpen === i, onToggleOpen: onAddPopupToggle, buttonType: "none", size: "large", horizontalAlign: "right", render: ({ close }) => (React.createElement(BlockSelector, { blocks: blocks, addRow: addRow, addRowIndex: i, close: close })) }),
                                    React.createElement(ArrayAction, { rowCount: rows.length, duplicateRow: () => duplicateRow(i, blockType), addRow: () => setSelectorIndexOpen(i), moveRow: moveRow, removeRow: removeRow, index: i }))) : undefined },
                                React.createElement(HiddenInput, { name: `${path}.${i}.id`, value: row.id }),
                                React.createElement(RenderFields, { className: `${baseClass}__fields`, forceRender: true, readOnly: readOnly, fieldTypes: fieldTypes, permissions: permissions === null || permissions === void 0 ? void 0 : permissions.fields, fieldSchema: blockToRender.fields.map((field) => ({
                                        ...field,
                                        path: `${path}.${i}${fieldAffectsData(field) ? `.${field.name}` : ''}`,
                                    })), indexPath: indexPath }))))));
                    }
                    return null;
                }),
                (rows.length < minRows || (required && rows.length === 0)) && (React.createElement(Banner, { type: "error" }, t('validation:requiresAtLeast', {
                    count: minRows,
                    label: getTranslation(minRows === 1 || typeof minRows === 'undefined' ? labels.singular : labels.plural, i18n),
                }))),
                (rows.length === 0 && readOnly) && (React.createElement(Banner, null, t('validation:fieldHasNo', { label: getTranslation(labels.plural, i18n) }))),
                provided.placeholder))),
            (!readOnly && !hasMaxRows) && (React.createElement("div", { className: `${baseClass}__add-button-wrap` },
                React.createElement(Popup, { buttonType: "custom", size: "large", horizontalAlign: "left", button: (React.createElement(Button, { buttonStyle: "icon-label", icon: "plus", iconPosition: "left", iconStyle: "with-border" }, t('addLabel', { label: getTranslation(labels.singular, i18n) }))), render: ({ close }) => (React.createElement(BlockSelector, { blocks: blocks, addRow: addRow, addRowIndex: value, close: close })) }))))));
};
export default withCondition(BlocksField);
