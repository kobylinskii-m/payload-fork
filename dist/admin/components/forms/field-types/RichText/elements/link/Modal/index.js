import { Modal } from '@faceless-ui/modal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MinimalTemplate } from '../../../../../..';
import Button from '../../../../../../elements/Button';
import X from '../../../../../../icons/X';
import Form from '../../../../../Form';
import FormSubmit from '../../../../../Submit';
import fieldTypes from '../../../..';
import RenderFields from '../../../../../RenderFields';
import './index.scss';
const baseClass = 'rich-text-link-edit-modal';
export const EditModal = ({ close, handleModalSubmit, initialState, fieldSchema, modalSlug, }) => {
    const { t } = useTranslation('fields');
    return (React.createElement(Modal, { slug: modalSlug, className: baseClass },
        React.createElement(MinimalTemplate, { className: `${baseClass}__template` },
            React.createElement("header", { className: `${baseClass}__header` },
                React.createElement("h3", null, t('editLink')),
                React.createElement(Button, { buttonStyle: "none", onClick: close },
                    React.createElement(X, null))),
            React.createElement(Form, { onSubmit: handleModalSubmit, initialState: initialState },
                React.createElement(RenderFields, { fieldTypes: fieldTypes, readOnly: false, fieldSchema: fieldSchema, forceRender: true }),
                React.createElement(FormSubmit, null, t('general:submit'))))));
};
