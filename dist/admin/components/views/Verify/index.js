import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import Logo from '../../graphics/Logo';
import MinimalTemplate from '../../templates/Minimal';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import Login from '../Login';
import './index.scss';
const baseClass = 'verify';
const Verify = ({ collection }) => {
    const { slug: collectionSlug } = collection;
    const { user } = useAuth();
    const { token } = useParams();
    const { serverURL, routes: { admin: adminRoute }, admin: { user: adminUser } } = useConfig();
    const { t, i18n } = useTranslation('authentication');
    const isAdminUser = collectionSlug === adminUser;
    const [verifyResult, setVerifyResult] = useState(null);
    useEffect(() => {
        async function verifyToken() {
            const result = await fetch(`${serverURL}/api/${collectionSlug}/verify/${token}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept-Language': i18n.language,
                },
            });
            setVerifyResult(result);
        }
        verifyToken();
    }, [setVerifyResult, collectionSlug, serverURL, token, i18n]);
    if (user) {
        return React.createElement(Login, null);
    }
    const getText = () => {
        if ((verifyResult === null || verifyResult === void 0 ? void 0 : verifyResult.status) === 200)
            return t('verifiedSuccessfully');
        if ((verifyResult === null || verifyResult === void 0 ? void 0 : verifyResult.status) === 202)
            return t('alreadyActivated');
        return t('unableToVerify');
    };
    return (React.createElement(MinimalTemplate, { className: baseClass },
        React.createElement(Meta, { title: t('verify'), description: t('verifyUser'), keywords: t('verify') }),
        React.createElement("div", { className: `${baseClass}__brand` },
            React.createElement(Logo, null)),
        React.createElement("h2", null, getText()),
        isAdminUser && (verifyResult === null || verifyResult === void 0 ? void 0 : verifyResult.status) === 200 && (React.createElement(Button, { el: "link", buttonStyle: "secondary", to: `${adminRoute}/login` }, t('login')))));
};
export default Verify;
