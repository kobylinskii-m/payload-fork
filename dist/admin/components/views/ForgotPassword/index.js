import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trans, useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import MinimalTemplate from '../../templates/Minimal';
import Form from '../../forms/Form';
import Email from '../../forms/field-types/Email';
import FormSubmit from '../../forms/Submit';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import './index.scss';
const baseClass = 'forgot-password';
const ForgotPassword = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { user } = useAuth();
    const { t } = useTranslation('authentication');
    const { admin: { user: userSlug }, serverURL, routes: { admin, api, }, } = useConfig();
    const handleResponse = (res) => {
        res.json()
            .then(() => {
            setHasSubmitted(true);
        }, () => {
            toast.error(t('emailNotValid'));
        });
    };
    if (user) {
        return (React.createElement(MinimalTemplate, { className: baseClass },
            React.createElement(Meta, { title: t('forgotPassword'), description: t('forgotPassword'), keywords: t('forgotPassword') }),
            React.createElement("h1", null, t('alreadyLoggedIn')),
            React.createElement("p", null,
                React.createElement(Trans, { i18nKey: "loggedInChangePassword", t: t },
                    React.createElement(Link, { to: `${admin}/account` }, "account"))),
            React.createElement("br", null),
            React.createElement(Button, { el: "link", buttonStyle: "secondary", to: admin }, t('general:backToDashboard'))));
    }
    if (hasSubmitted) {
        return (React.createElement(MinimalTemplate, { className: baseClass },
            React.createElement("h1", null, t('emailSent')),
            React.createElement("p", null, t('checkYourEmailForPasswordReset'))));
    }
    return (React.createElement(MinimalTemplate, { className: baseClass },
        React.createElement(Form, { handleResponse: handleResponse, method: "post", action: `${serverURL}${api}/${userSlug}/forgot-password` },
            React.createElement("h1", null, t('forgotPassword')),
            React.createElement("p", null, t('forgotPasswordEmailInstructions')),
            React.createElement(Email, { label: t('general:emailAddress'), name: "email", admin: { autoComplete: 'email' }, required: true }),
            React.createElement(FormSubmit, null, t('general:submit'))),
        React.createElement(Link, { to: `${admin}/login` }, t('backToLogin'))));
};
export default ForgotPassword;
