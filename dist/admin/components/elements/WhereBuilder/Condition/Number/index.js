import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';
const baseClass = 'condition-value-number';
const NumberField = ({ onChange, value }) => {
    const { t } = useTranslation('general');
    return (React.createElement("input", { placeholder: t('enterAValue'), className: baseClass, type: "number", onChange: (e) => onChange(e.target.value), value: value }));
};
export default NumberField;
