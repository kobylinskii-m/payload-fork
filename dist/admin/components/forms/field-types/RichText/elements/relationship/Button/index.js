import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Modal, useModal } from '@faceless-ui/modal';
import { ReactEditor, useSlate } from 'slate-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../../../utilities/Config';
import ElementButton from '../../Button';
import RelationshipIcon from '../../../../../../icons/Relationship';
import Form from '../../../../../Form';
import MinimalTemplate from '../../../../../../templates/Minimal';
import Button from '../../../../../../elements/Button';
import Submit from '../../../../../Submit';
import X from '../../../../../../icons/X';
import Fields from './Fields';
import { requests } from '../../../../../../../api';
import { injectVoidElement } from '../../injectVoid';
import './index.scss';
const initialFormData = {};
const baseClass = 'relationship-rich-text-button';
const insertRelationship = (editor, { value, relationTo }) => {
    const text = { text: ' ' };
    const relationship = {
        type: 'relationship',
        value,
        relationTo,
        children: [
            text,
        ],
    };
    injectVoidElement(editor, relationship);
    ReactEditor.focus(editor);
};
const RelationshipButton = ({ path }) => {
    const { toggleModal } = useModal();
    const editor = useSlate();
    const { serverURL, routes: { api }, collections } = useConfig();
    const [renderModal, setRenderModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation('fields');
    const [hasEnabledCollections] = useState(() => collections.find(({ admin: { enableRichTextRelationship } }) => enableRichTextRelationship));
    const modalSlug = `${path}-add-relationship`;
    const handleAddRelationship = useCallback(async (_, { relationTo, value }) => {
        setLoading(true);
        const res = await requests.get(`${serverURL}${api}/${relationTo}/${value}?depth=0`, {
            headers: {
                'Accept-Language': i18n.language,
            },
        });
        const json = await res.json();
        insertRelationship(editor, { value: { id: json.id }, relationTo });
        toggleModal(modalSlug);
        setRenderModal(false);
        setLoading(false);
    }, [i18n.language, editor, toggleModal, modalSlug, api, serverURL]);
    useEffect(() => {
        if (renderModal) {
            toggleModal(modalSlug);
        }
    }, [renderModal, toggleModal, modalSlug]);
    if (!hasEnabledCollections)
        return null;
    return (React.createElement(Fragment, null,
        React.createElement(ElementButton, { className: baseClass, format: "relationship", onClick: () => setRenderModal(true) },
            React.createElement(RelationshipIcon, null)),
        renderModal && (React.createElement(Modal, { slug: modalSlug, className: `${baseClass}__modal` },
            React.createElement(MinimalTemplate, { className: `${baseClass}__modal-template` },
                React.createElement("header", { className: `${baseClass}__header` },
                    React.createElement("h3", null, t('addRelationship')),
                    React.createElement(Button, { buttonStyle: "none", onClick: () => {
                            toggleModal(modalSlug);
                            setRenderModal(false);
                        } },
                        React.createElement(X, null))),
                React.createElement(Form, { onSubmit: handleAddRelationship, initialData: initialFormData, disabled: loading },
                    React.createElement(Fields, null),
                    React.createElement(Submit, null, t('addRelationship'))))))));
};
export default RelationshipButton;
