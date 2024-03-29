import React, { Fragment, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Transforms, Editor, Range } from 'slate';
import { useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import ElementButton from '../Button';
import { unwrapLink } from './utilities';
import LinkIcon from '../../../../../icons/Link';
import { EditModal } from './Modal';
import { modalSlug as baseModalSlug } from './shared';
import isElementActive from '../isActive';
import buildStateFromSchema from '../../../../Form/buildStateFromSchema';
import { useAuth } from '../../../../../utilities/Auth';
import { useLocale } from '../../../../../utilities/Locale';
import { useConfig } from '../../../../../utilities/Config';
import { getBaseFields } from './Modal/baseFields';
import reduceFieldsToValues from '../../../../Form/reduceFieldsToValues';
export const LinkButton = ({ fieldProps }) => {
    var _a, _b;
    const customFieldSchema = (_b = (_a = fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.admin) === null || _a === void 0 ? void 0 : _a.link) === null || _b === void 0 ? void 0 : _b.fields;
    const modalSlug = `${baseModalSlug}-${fieldProps.path}`;
    const { t } = useTranslation();
    const config = useConfig();
    const editor = useSlate();
    const { user } = useAuth();
    const locale = useLocale();
    const { toggleModal } = useModal();
    const [renderModal, setRenderModal] = useState(false);
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
    return (React.createElement(Fragment, null,
        React.createElement(ElementButton, { format: "link", onClick: async () => {
                if (isElementActive(editor, 'link')) {
                    unwrapLink(editor);
                }
                else {
                    toggleModal(modalSlug);
                    setRenderModal(true);
                    const isCollapsed = editor.selection && Range.isCollapsed(editor.selection);
                    if (!isCollapsed) {
                        const data = {
                            text: editor.selection ? Editor.string(editor, editor.selection) : '',
                        };
                        const state = await buildStateFromSchema({ fieldSchema, data, user, operation: 'create', locale, t });
                        setInitialState(state);
                    }
                }
            } },
            React.createElement(LinkIcon, null)),
        renderModal && (React.createElement(EditModal, { modalSlug: modalSlug, fieldSchema: fieldSchema, initialState: initialState, close: () => {
                toggleModal(modalSlug);
                setRenderModal(false);
            }, handleModalSubmit: (fields) => {
                const isCollapsed = editor.selection && Range.isCollapsed(editor.selection);
                const data = reduceFieldsToValues(fields, true);
                const newLink = {
                    type: 'link',
                    linkType: data.linkType,
                    url: data.url,
                    doc: data.doc,
                    newTab: data.newTab,
                    fields: data.fields,
                    children: [],
                };
                if (isCollapsed || !editor.selection) {
                    // If selection anchor and focus are the same,
                    // Just inject a new node with children already set
                    Transforms.insertNodes(editor, {
                        ...newLink,
                        children: [{ text: String(data.text) }],
                    });
                }
                else if (editor.selection) {
                    // Otherwise we need to wrap the selected node in a link,
                    // Delete its old text,
                    // Move the selection one position forward into the link,
                    // And insert the text back into the new link
                    Transforms.wrapNodes(editor, newLink, { split: true });
                    Transforms.delete(editor, { at: editor.selection.focus.path, unit: 'word' });
                    Transforms.move(editor, { distance: 1, unit: 'offset' });
                    Transforms.insertText(editor, String(data.text), { at: editor.selection.focus.path });
                }
                toggleModal(modalSlug);
                setRenderModal(false);
                ReactEditor.focus(editor);
            } }))));
};
