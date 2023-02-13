import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import MinimalTemplate from '../../templates/Minimal';
const Unauthorized = () => {
    const { t } = useTranslation('general');
    const config = useConfig();
    const { routes: { admin }, admin: { logoutRoute, }, } = config;
    return (React.createElement(MinimalTemplate, { className: "unauthorized" },
        React.createElement(Meta, { title: t('error:unauthorized'), description: t('error:unauthorized'), keywords: t('error:unauthorized') }),
        React.createElement("h2", null, t('error:unauthorized')),
        React.createElement("p", null, t('error:notAllowedToAccessPage')),
        React.createElement("br", null),
        React.createElement(Button, { el: "link", to: `${admin}${logoutRoute}` }, t('authentication:logOut'))));
};
export default Unauthorized;
