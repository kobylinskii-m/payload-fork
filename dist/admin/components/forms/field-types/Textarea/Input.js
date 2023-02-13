import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const TextareaInput = (props) => {
    const { path, required, readOnly, style, className, width, placeholder, description, label, showError, value, errorMessage, onChange, rows, } = props;
    const { i18n } = useTranslation();
    const classes = [
        'field-type',
        'textarea',
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
        React.createElement("label", { className: "textarea-outer", htmlFor: `field-${path.replace(/\./gi, '__')}` },
            React.createElement("div", { className: "textarea-inner" },
                React.createElement("div", { className: "textarea-clone", "data-value": value || placeholder || '' }),
                React.createElement("textarea", { className: "textarea-element", id: `field-${path.replace(/\./gi, '__')}`, value: value || '', onChange: onChange, disabled: readOnly, placeholder: getTranslation(placeholder, i18n), name: path, rows: rows }))),
        React.createElement(FieldDescription, { value: value, description: description })));
};
export default TextareaInput;
