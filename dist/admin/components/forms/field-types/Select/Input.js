import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import ReactSelect from '../../../elements/ReactSelect';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const SelectInput = (props) => {
    const { showError, errorMessage, readOnly, path, label, required, value, onChange, description, style, className, width, options, hasMany, isSortable, isClearable, } = props;
    const { i18n } = useTranslation();
    const classes = [
        'field-type',
        'select',
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');
    let valueToRender;
    if (hasMany && Array.isArray(value)) {
        valueToRender = value.map((val) => {
            const matchingOption = options.find((option) => option.value === val);
            return {
                label: getTranslation(matchingOption.label, i18n),
                value: matchingOption.value,
            };
        });
    }
    else if (value) {
        const matchingOption = options.find((option) => option.value === value);
        valueToRender = {
            label: getTranslation(matchingOption.label, i18n),
            value: matchingOption.value,
        };
    }
    return (React.createElement("div", { id: `field-${path.replace(/\./gi, '__')}`, className: classes, style: {
            ...style,
            width,
        } },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement(Label, { htmlFor: `field-${path.replace(/\./gi, '__')}`, label: label, required: required }),
        React.createElement(ReactSelect, { onChange: onChange, value: valueToRender, showError: showError, isDisabled: readOnly, options: options.map((option) => ({ ...option, label: getTranslation(option.label, i18n) })), isMulti: hasMany, isSortable: isSortable, isClearable: isClearable }),
        React.createElement(FieldDescription, { value: value, description: description })));
};
export default SelectInput;
