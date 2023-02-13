import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const Label = (props) => {
    const { label, required = false, htmlFor, } = props;
    const { i18n } = useTranslation();
    if (label) {
        return (React.createElement("label", { htmlFor: htmlFor, className: "field-label" },
            getTranslation(label, i18n),
            required && React.createElement("span", { className: "required" }, "*")));
    }
    return null;
};
export default Label;
