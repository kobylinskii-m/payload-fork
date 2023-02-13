import React from 'react';
import Tooltip from '../../elements/Tooltip';
import './index.scss';
const baseClass = 'field-error';
const Error = (props) => {
    const { showError = false, message, } = props;
    if (showError) {
        return (React.createElement(Tooltip, { className: baseClass }, message));
    }
    return null;
};
export default Error;
