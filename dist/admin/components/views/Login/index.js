import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import Logo from '../../graphics/Logo';
import MinimalTemplate from '../../templates/Minimal';
import Form from '../../forms/Form';
import Email from '../../forms/field-types/Email';
import Password from '../../forms/field-types/Password';
import FormSubmit from '../../forms/Submit';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import './index.scss';
const baseClass = 'login';
const Login = () => {
    const history = useHistory();
    const { t } = useTranslation('authentication');
    const { user, setToken } = useAuth();
    const config = useConfig();
    const { admin: { user: userSlug, logoutRoute, components: { beforeLogin, afterLogin, logout } = {}, }, serverURL, routes: { admin, api, }, collections, } = config;
    const collection = collections.find(({ slug }) => slug === userSlug);
    const onSuccess = (data) => {
        if (data.token) {
            setToken(data.token);
            history.push(admin);
        }
    };
    if (user) {
        return (React.createElement(MinimalTemplate, { className: baseClass },
            React.createElement(Meta, { title: t('login'), description: t('loginUser'), keywords: t('login') }),
            React.createElement("div", { className: `${baseClass}__wrap` },
                React.createElement("h1", null, t('alreadyLoggedIn')),
                React.createElement("p", null,
                    React.createElement(Trans, { i18nKey: "loggedIn", t: t },
                        React.createElement(Link, { to: `${admin}${logoutRoute}` }, t('logOut')))),
                React.createElement("br", null),
                React.createElement(Button, { el: "link", buttonStyle: "secondary", to: admin }, t('general:backToDashboard')))));
    }
    return (React.createElement(MinimalTemplate, { className: baseClass },
        React.createElement(Meta, { title: t('login'), description: t('loginUser'), keywords: t('login') }),
        React.createElement("div", { className: `${baseClass}__brand` },
            React.createElement(Logo, null)),
        Array.isArray(beforeLogin) && beforeLogin.map((Component, i) => React.createElement(Component, { key: i })),
        !collection.auth.disableLocalStrategy && (React.createElement(Form, { disableSuccessStatus: true, waitForAutocomplete: true, onSuccess: onSuccess, method: "post", action: `${serverURL}${api}/${userSlug}/login` },
            React.createElement(Email, { label: t('general:email'), name: "email", admin: { autoComplete: 'email' }, required: true }),
            React.createElement(Password, { label: t('general:password'), name: "password", autoComplete: "off", required: true }),
            React.createElement(Link, { to: `${admin}/forgot` }, t('forgotPasswordQuestion')),
            React.createElement(FormSubmit, null, t('login')))),
        Array.isArray(afterLogin) && afterLogin.map((Component, i) => React.createElement(Component, { key: i }))));
};
export default Login;
