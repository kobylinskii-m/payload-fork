import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import { useFormFields } from '../../Form/context';
import './index.scss';
const ConfirmPassword = () => {
    const password = useFormFields(([fields]) => fields.password);
    const { t } = useTranslation('fields');
    const validate = useCallback((value) => {
        if (!value) {
            return t('validation:required');
        }
        if (value === (password === null || password === void 0 ? void 0 : password.value)) {
            return true;
        }
        return t('passwordsDoNotMatch');
    }, [password, t]);
    const { value, showError, setValue, errorMessage, } = useField({
        path: 'confirm-password',
        disableFormData: true,
        validate,
    });
    const classes = [
        'field-type',
        'confirm-password',
        showError && 'error',
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement(Label, { htmlFor: "field-confirm-password", label: t('authentication:confirmPassword'), required: true }),
        React.createElement("input", { value: value || '', onChange: setValue, type: "password", autoComplete: "off", id: "field-confirm-password", name: "confirm-password" })));
};
export default ConfirmPassword;
