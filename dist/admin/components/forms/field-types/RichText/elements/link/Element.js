import React, { useCallback, useEffect, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Transforms, Node, Editor } from 'slate';
import { useModal } from '@faceless-ui/modal';
import { Trans, useTranslation } from 'react-i18next';
import { unwrapLink } from './utilities';
import Popup from '../../../../../elements/Popup';
import { EditModal } from './Modal';
import { modalSlug as baseModalSlug } from './shared';
import buildStateFromSchema from '../../../../Form/buildStateFromSchema';
import { useAuth } from '../../../../../utilities/Auth';
import { useLocale } from '../../../../../utilities/Locale';
import { useConfig } from '../../../../../utilities/Config';
import { getBaseFields } from './Modal/baseFields';
import reduceFieldsToValues from '../../../../Form/reduceFieldsToValues';
import deepCopyObject from '../../../../../../../utilities/deepCopyObject';
import Button from '../../../../../elements/Button';
import { getTranslation } from '../../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'rich-text-link';
// TODO: Multiple modal windows stacked go boom (rip). Edit Upload in fields -> rich text
export const LinkElement = ({ attributes, children, element, editorRef, fieldProps }) => {
    var _a, _b;
    const customFieldSchema = (_b = (_a = fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.admin) === null || _a === void 0 ? void 0 : _a.link) === null || _b === void 0 ? void 0 : _b.fields;
    const editor = useSlate();
    const config = useConfig();
    const { user } = useAuth();
    const locale = useLocale();
    const { t, i18n } = useTranslation('fields');
    const { openModal, toggleModal } = useModal();
    const [renderModal, setRenderModal] = useState(false);
    const [renderPopup, setRenderPopup] = useState(false);
    const [initialState, setInitialState] = useState({});
    const [fieldSchema] = useState(() => {
        const fields = [
            ...getBaseFields(config),
        ];
        if (customFieldSchema) {
            fields.push({
                name: 'fields',
                type: 'group',
                admin: {
                    style: {
                        margin: 0,
                        padding: 0,
                        borderTop: 0,
                        borderBottom: 0,
                    },
                },
                fields: customFieldSchema,
            });
        }
        return fields;
    });
    const modalSlug = `${baseModalSlug}-${fieldProps.path}`;
    const handleTogglePopup = useCallback((render) => {
        if (!render) {
            setRenderPopup(render);
        }
    }, []);
    useEffect(() => {
        const awaitInitialState = async () => {
            const data = {
                text: Node.string(element),
                linkType: element.linkType,
                url: element.url,
                doc: element.doc,
                newTab: element.newTab,
                fields: deepCopyObject(element.fields),
            };
            const state = await buildStateFromSchema({ fieldSchema, data, user, operation: 'update', locale, t });
            setInitialState(state);
        };
        awaitInitialState();
    }, [renderModal, element, fieldSchema, user, locale, t]);
    return (React.createElement("span", { className: baseClass, ...attributes },
        React.createElement("span", { style: { userSelect: 'none' }, contentEditable: false },
            renderModal && (React.createElement(EditModal, { modalSlug: modalSlug, fieldSchema: fieldSchema, close: () => {
                    toggleModal(modalSlug);
                    setRenderModal(false);
                }, handleModalSubmit: (fields) => {
                    toggleModal(modalSlug);
                    setRenderModal(false);
                    const data = reduceFieldsToValues(fields, true);
                    const [, parentPath] = Editor.above(editor);
                    const newNode = {
                        newTab: data.newTab,
                        url: data.url,
                        linkType: data.linkType,
                        doc: data.doc,
                    };
                    if (customFieldSchema) {
                        newNode.fields = data.fields;
                    }
                    Transforms.setNodes(editor, newNode, { at: parentPath });
                    Transforms.delete(editor, { at: editor.selection.focus.path, unit: 'block' });
                    Transforms.move(editor, { distance: 1, unit: 'offset' });
                    Transforms.insertText(editor, String(data.text), { at: editor.selection.focus.path });
                    ReactEditor.focus(editor);
                }, initialState: initialState })),
            React.createElement(Popup, { buttonType: "none", size: "small", forceOpen: renderPopup, onToggleOpen: handleTogglePopup, horizontalAlign: "left", verticalAlign: "bottom", boundingRef: editorRef, render: () => {
                    var _a, _b, _c, _d;
                    return (React.createElement("div", { className: `${baseClass}__popup` },
                        element.linkType === 'internal' && ((_a = element.doc) === null || _a === void 0 ? void 0 : _a.relationTo) && ((_b = element.doc) === null || _b === void 0 ? void 0 : _b.value) && (React.createElement(Trans, { i18nKey: "fields:linkedTo", values: { label: getTranslation((_d = (_c = config.collections.find(({ slug }) => slug === element.doc.relationTo)) === null || _c === void 0 ? void 0 : _c.labels) === null || _d === void 0 ? void 0 : _d.singular, i18n) } },
                            React.createElement("a", { className: `${baseClass}__link-label`, href: `${config.routes.admin}/collections/${element.doc.relationTo}/${element.doc.value}`, target: "_blank", rel: "noreferrer" }, "label"))),
                        (element.linkType === 'custom' || !element.linkType) && (React.createElement("a", { className: `${baseClass}__link-label`, href: element.url, target: "_blank", rel: "noreferrer" }, element.url)),
                        React.createElement(Button, { className: `${baseClass}__link-edit`, icon: "edit", round: true, buttonStyle: "icon-label", onClick: (e) => {
                                e.preventDefault();
                                setRenderPopup(false);
                                openModal(modalSlug);
                                setRenderModal(true);
                            }, tooltip: t('general:edit') }),
                        React.createElement(Button, { className: `${baseClass}__link-close`, icon: "x", round: true, buttonStyle: "icon-label", onClick: (e) => {
                                e.preventDefault();
                                unwrapLink(editor);
                            }, tooltip: t('general:remove') })));
                } })),
        React.createElement("span", { tabIndex: 0, role: "button", className: [
                `${baseClass}__button`,
            ].filter(Boolean).join(' '), onKeyDown: (e) => { if (e.key === 'Enter')
                setRenderPopup(true); }, onClick: () => setRenderPopup(true) }, children)));
};
