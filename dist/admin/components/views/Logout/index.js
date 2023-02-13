import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import Minimal from '../../templates/Minimal';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import './index.scss';
const baseClass = 'logout';
const Logout = (props) => {
    const { inactivity } = props;
    const { logOut } = useAuth();
    const { routes: { admin } } = useConfig();
    const { t } = useTranslation('authentication');
    useEffect(() => {
        logOut();
    }, [logOut]);
    return (React.createElement(Minimal, { className: baseClass },
        React.createElement(Meta, { title: t('logout'), description: t('logoutUser'), keywords: t('logout') }),
        React.createElement("div", { className: `${baseClass}__wrap` },
            inactivity && (React.createElement("h2", null, t('loggedOutInactivity'))),
            !inactivity && (React.createElement("h2", null, t('loggedOutSuccessfully'))),
            React.createElement("br", null),
            React.createElement(Button, { el: "anchor", buttonStyle: "secondary", url: `${admin}/login` }, t('logBackIn')))));
};
export default Logout;
