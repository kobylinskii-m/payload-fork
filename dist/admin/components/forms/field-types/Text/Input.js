import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const TextInput = (props) => {
    const { showError, errorMessage, placeholder, readOnly, path, label, required, value, onChange, onKeyDown, description, style, className, width, inputRef, } = props;
    const { i18n } = useTranslation();
    const classes = [
        'field-type',
        'text',
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes, style: {
            ...style,
            width,
        } },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement(Label, { htmlFor: `field-${path.replace(/\./gi, '__')}`, label: label, required: required }),
        React.createElement("input", { ref: inputRef, id: `field-${path.replace(/\./gi, '__')}`, value: value || '', onChange: onChange, onKeyDown: onKeyDown, disabled: readOnly, placeholder: getTranslation(placeholder, i18n), type: "text", name: path }),
        React.createElement(FieldDescription, { className: `field-description-${path.replace(/\./gi, '__')}`, value: value, description: description })));
};
export default TextInput;
