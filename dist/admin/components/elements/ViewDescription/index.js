import React from 'react';
import { useTranslation } from 'react-i18next';
import { isComponent } from './types';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const ViewDescription = (props) => {
    const { i18n } = useTranslation();
    const { description, } = props;
    if (isComponent(description)) {
        const Description = description;
        return React.createElement(Description, null);
    }
    if (description) {
        return (React.createElement("div", { className: "view-description" }, typeof description === 'function' ? description() : getTranslation(description, i18n)));
    }
    return null;
};
export default ViewDescription;
