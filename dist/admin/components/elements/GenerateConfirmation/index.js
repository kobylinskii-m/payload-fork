import React from 'react';
import { toast } from 'react-toastify';
import { Modal, useModal } from '@faceless-ui/modal';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../Button';
import MinimalTemplate from '../../templates/Minimal';
import { useDocumentInfo } from '../../utilities/DocumentInfo';
import './index.scss';
const baseClass = 'generate-confirmation';
const GenerateConfirmation = (props) => {
    const { setKey, highlightField, } = props;
    const { id } = useDocumentInfo();
    const { toggleModal } = useModal();
    const { t } = useTranslation('authentication');
    const modalSlug = `generate-confirmation-${id}`;
    const handleGenerate = () => {
        setKey();
        toggleModal(modalSlug);
        toast.success(t('newAPIKeyGenerated'), { autoClose: 3000 });
        highlightField(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { size: "small", buttonStyle: "secondary", onClick: () => {
                toggleModal(modalSlug);
            } }, t('generateNewAPIKey')),
        React.createElement(Modal, { slug: modalSlug, className: baseClass },
            React.createElement(MinimalTemplate, { className: `${baseClass}__template` },
                React.createElement("h1", null, t('confirmGeneration')),
                React.createElement("p", null,
                    React.createElement(Trans, { i18nKey: "generatingNewAPIKeyWillInvalidate", t: t },
                        "generatingNewAPIKeyWillInvalidate",
                        React.createElement("strong", null, "invalidate"))),
                React.createElement(Button, { buttonStyle: "secondary", type: "button", onClick: () => {
                        toggleModal(modalSlug);
                    } }, t('general:cancel')),
                React.createElement(Button, { onClick: handleGenerate }, t('generate'))))));
};
export default GenerateConfirmation;
