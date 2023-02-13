import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import RadioGroupInput from '../../../forms/field-types/RadioGroup/Input';
import { useTheme } from '../../../utilities/Theme';
export const ToggleTheme = () => {
    const { theme, setTheme, autoMode } = useTheme();
    const { t } = useTranslation('general');
    const onChange = useCallback((newTheme) => {
        setTheme(newTheme);
    }, [setTheme]);
    return (React.createElement(RadioGroupInput, { name: "theme", label: t('adminTheme'), value: autoMode ? 'auto' : theme, onChange: onChange, options: [
            {
                label: t('automatic'),
                value: 'auto',
            },
            {
                label: t('light'),
                value: 'light',
            },
            {
                label: t('dark'),
                value: 'dark',
            },
        ] }));
};
