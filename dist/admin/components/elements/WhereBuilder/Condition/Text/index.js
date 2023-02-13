import React from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';
const baseClass = 'condition-value-text';
const Text = ({ onChange, value }) => {
    const { t } = useTranslation('general');
    return (React.createElement("input", { placeholder: t('enterAValue'), className: baseClass, type: "text", onChange: (e) => onChange(e.target.value), value: value || '' }));
};
export default Text;
