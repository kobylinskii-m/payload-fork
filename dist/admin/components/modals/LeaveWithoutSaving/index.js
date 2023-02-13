import React from 'react';
import NavigationPrompt from 'react-router-navigation-prompt';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../utilities/Auth';
import { useFormModified } from '../../forms/Form/context';
import MinimalTemplate from '../../templates/Minimal';
import Button from '../../elements/Button';
import './index.scss';
const modalSlug = 'leave-without-saving';
const LeaveWithoutSaving = () => {
    const modified = useFormModified();
    const { user } = useAuth();
    const { t } = useTranslation('general');
    return (React.createElement(NavigationPrompt, { when: Boolean(modified && user) }, ({ onConfirm, onCancel }) => (React.createElement("div", { className: modalSlug },
        React.createElement(MinimalTemplate, { className: `${modalSlug}__template` },
            React.createElement("h1", null, t('leaveWithoutSaving')),
            React.createElement("p", null, t('changesNotSaved')),
            React.createElement(Button, { onClick: onCancel, buttonStyle: "secondary" }, t('stayOnThisPage')),
            React.createElement(Button, { onClick: onConfirm }, t('leaveAnyway')))))));
};
export default LeaveWithoutSaving;
