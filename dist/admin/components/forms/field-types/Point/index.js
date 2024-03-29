import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import withCondition from '../../withCondition';
import { point } from '../../../../../fields/validations';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'point';
const PointField = (props) => {
    const { name, path: pathFromProps, required, validate = point, label, admin: { readOnly, style, className, width, step, placeholder, description, condition, } = {}, } = props;
    const path = pathFromProps || name;
    const { t, i18n } = useTranslation('fields');
    const memoizedValidate = useCallback((value, options) => {
        return validate(value, { ...options, required });
    }, [validate, required]);
    const { value = [null, null], showError, setValue, errorMessage, } = useField({
        path,
        validate: memoizedValidate,
        condition,
    });
    const handleChange = useCallback((e, index) => {
        let val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            val = e.target.value;
        }
        const coordinates = [...value];
        coordinates[index] = val;
        setValue(coordinates);
    }, [setValue, value]);
    const classes = [
        'field-type',
        baseClass,
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes, style: {
            ...style,
            width,
        } },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement("ul", { className: `${baseClass}__wrap` },
            React.createElement("li", null,
                React.createElement(Label, { htmlFor: `field-longitude-${path.replace(/\./gi, '__')}`, label: `${getTranslation(label || name, i18n)} - ${t('longitude')}`, required: required }),
                React.createElement("input", { id: `field-longitude-${path.replace(/\./gi, '__')}`, value: (value && typeof value[0] === 'number') ? value[0] : '', onChange: (e) => handleChange(e, 0), disabled: readOnly, placeholder: getTranslation(placeholder, i18n), type: "number", name: `${path}.longitude`, step: step })),
            React.createElement("li", null,
                React.createElement(Label, { htmlFor: `field-latitude-${path.replace(/\./gi, '__')}`, label: `${getTranslation(label || name, i18n)} - ${t('latitude')}`, required: required }),
                React.createElement("input", { id: `field-latitude-${path.replace(/\./gi, '__')}`, value: (value && typeof value[1] === 'number') ? value[1] : '', onChange: (e) => handleChange(e, 1), disabled: readOnly, placeholder: getTranslation(placeholder, i18n), type: "number", name: `${path}.latitude`, step: step }))),
        React.createElement(FieldDescription, { value: value, description: description })));
};
export default withCondition(PointField);
