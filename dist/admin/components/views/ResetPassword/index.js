import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import MinimalTemplate from '../../templates/Minimal';
import Form from '../../forms/Form';
import Password from '../../forms/field-types/Password';
import ConfirmPassword from '../../forms/field-types/ConfirmPassword';
import FormSubmit from '../../forms/Submit';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import HiddenInput from '../../forms/field-types/HiddenInput';
import './index.scss';
const baseClass = 'reset-password';
const ResetPassword = () => {
    const config = useConfig();
    const { admin: { user: userSlug, logoutRoute }, serverURL, routes: { admin, api } } = config;
    const { token } = useParams();
    const history = useHistory();
    const { user, setToken } = useAuth();
    const { t } = useTranslation('authentication');
    const onSuccess = (data) => {
        if (data.token) {
            setToken(data.token);
            history.push(`${admin}`);
        }
    };
    if (user) {
        return (React.createElement(MinimalTemplate, { className: baseClass },
            React.createElement(Meta, { title: t('resetPassword'), description: t('resetPassword'), keywords: t('resetPassword') }),
            React.createElement("div", { className: `${baseClass}__wrap` },
                React.createElement("h1", null, t('alreadyLoggedIn')),
                React.createElement("p", null,
                    React.createElement(Trans, { i18nKey: "loginWithAnotherUser", t: t },
                        React.createElement(Link, { to: `${admin}${logoutRoute}` }, "log out"))),
                React.createElement("br", null),
                React.createElement(Button, { el: "link", buttonStyle: "secondary", to: admin }, t('general:backToDashboard')))));
    }
    return (React.createElement(MinimalTemplate, { className: baseClass },
        React.createElement("div", { className: `${baseClass}__wrap` },
            React.createElement("h1", null, t('resetPassword')),
            React.createElement(Form, { onSuccess: onSuccess, method: "post", action: `${serverURL}${api}/${userSlug}/reset-password`, redirect: admin },
                React.createElement(Password, { label: t('newPassword'), name: "password", autoComplete: "off", required: true }),
                React.createElement(ConfirmPassword, null),
                React.createElement(HiddenInput, { name: "token", value: token }),
                React.createElement(FormSubmit, null, t('resetPassword'))))));
};
export default ResetPassword;
