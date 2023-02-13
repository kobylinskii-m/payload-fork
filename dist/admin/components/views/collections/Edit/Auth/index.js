import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../utilities/Config';
import Email from '../../../../forms/field-types/Email';
import Password from '../../../../forms/field-types/Password';
import Checkbox from '../../../../forms/field-types/Checkbox';
import Button from '../../../../elements/Button';
import ConfirmPassword from '../../../../forms/field-types/ConfirmPassword';
import { useFormModified, useFormFields } from '../../../../forms/Form/context';
import APIKey from './APIKey';
import './index.scss';
const baseClass = 'auth-fields';
const Auth = (props) => {
    const { useAPIKey, requirePassword, verify, collection: { slug }, collection, email, operation } = props;
    const [changingPassword, setChangingPassword] = useState(requirePassword);
    const enableAPIKey = useFormFields(([fields]) => fields.enableAPIKey);
    const dispatchFields = useFormFields((reducer) => reducer[1]);
    const modified = useFormModified();
    const { t, i18n } = useTranslation('authentication');
    const { serverURL, routes: { api, }, } = useConfig();
    const handleChangePassword = useCallback(async (state) => {
        if (!state) {
            dispatchFields({ type: 'REMOVE', path: 'password' });
            dispatchFields({ type: 'REMOVE', path: 'confirm-password' });
        }
        setChangingPassword(state);
    }, [dispatchFields]);
    const unlock = useCallback(async () => {
        const url = `${serverURL}${api}/${slug}/unlock`;
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': i18n.language,
            },
            body: JSON.stringify({
                email,
            }),
            method: 'post',
        });
        if (response.status === 200) {
            toast.success(t('successfullyUnlocked'), { autoClose: 3000 });
        }
        else {
            toast.error(t('failedToUnlock'));
        }
    }, [i18n, serverURL, api, slug, email, t]);
    useEffect(() => {
        if (!modified) {
            setChangingPassword(false);
        }
    }, [modified]);
    if (collection.auth.disableLocalStrategy) {
        return null;
    }
    return (React.createElement("div", { className: baseClass },
        React.createElement(Email, { required: true, name: "email", label: t('general:email'), admin: { autoComplete: 'email' } }),
        (changingPassword || requirePassword) && (React.createElement("div", { className: `${baseClass}__changing-password` },
            React.createElement(Password, { autoComplete: "off", required: true, name: "password", label: t('newPassword') }),
            React.createElement(ConfirmPassword, null),
            !requirePassword && (React.createElement(Button, { size: "small", buttonStyle: "secondary", onClick: () => handleChangePassword(false) }, t('general:cancel'))))),
        (!changingPassword && !requirePassword) && (React.createElement(Button, { id: "change-password", size: "small", buttonStyle: "secondary", onClick: () => handleChangePassword(true) }, t('changePassword'))),
        operation === 'update' && (React.createElement(Button, { size: "small", buttonStyle: "secondary", onClick: () => unlock() }, t('forceUnlock'))),
        useAPIKey && (React.createElement("div", { className: `${baseClass}__api-key` },
            React.createElement(Checkbox, { label: t('enableAPIKey'), name: "enableAPIKey" }),
            (enableAPIKey === null || enableAPIKey === void 0 ? void 0 : enableAPIKey.value) && (React.createElement(APIKey, null)))),
        verify && (React.createElement(Checkbox, { label: t('verified'), name: "_verified" }))));
};
export default Auth;
