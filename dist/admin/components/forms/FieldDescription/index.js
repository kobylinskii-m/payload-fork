import React from 'react';
import { useTranslation } from 'react-i18next';
import { isComponent } from './types';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'field-description';
const FieldDescription = (props) => {
    const { className, description, value, } = props;
    const { i18n } = useTranslation();
    if (isComponent(description)) {
        const Description = description;
        return React.createElement(Description, { value: value });
    }
    if (description) {
        return (React.createElement("div", { className: [
                baseClass,
                className,
            ].filter(Boolean).join(' ') }, typeof description === 'function' ? description({ value }) : getTranslation(description, i18n)));
    }
    return null;
};
export default FieldDescription;
