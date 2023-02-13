import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'radio-input';
const RadioInput = (props) => {
    const { isSelected, option, onChange, path } = props;
    const { i18n } = useTranslation();
    const classes = [
        baseClass,
        isSelected && `${baseClass}--is-selected`,
    ].filter(Boolean).join(' ');
    const id = `field-${path}-${option.value}`;
    return (React.createElement("label", { htmlFor: id },
        React.createElement("div", { className: classes },
            React.createElement("input", { id: id, type: "radio", checked: isSelected, onChange: () => (typeof onChange === 'function' ? onChange(option.value) : null) }),
            React.createElement("span", { className: `${baseClass}__styled-radio` }),
            React.createElement("span", { className: `${baseClass}__label` }, getTranslation(option.label, i18n)))));
};
export default RadioInput;
