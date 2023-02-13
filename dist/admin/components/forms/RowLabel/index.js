import React from 'react';
import { useTranslation } from 'react-i18next';
import { isComponent } from './types';
import { useWatchForm } from '../Form/context';
import { getTranslation } from '../../../../utilities/getTranslation';
const baseClass = 'row-label';
export const RowLabel = ({ className, ...rest }) => {
    return (React.createElement("span", { style: {
            pointerEvents: 'none',
        }, className: [
            baseClass,
            className,
        ].filter(Boolean).join(' ') },
        React.createElement(RowLabelContent, { ...rest })));
};
const RowLabelContent = (props) => {
    const { path, label, rowNumber, } = props;
    const { i18n } = useTranslation();
    const { getDataByPath, getSiblingData } = useWatchForm();
    const collapsibleData = getSiblingData(path);
    const arrayData = getDataByPath(path);
    const data = arrayData || collapsibleData;
    if (isComponent(label)) {
        const Label = label;
        return (React.createElement(Label, { data: data, path: path, index: rowNumber }));
    }
    return (React.createElement(React.Fragment, null, typeof label === 'function' ? label({
        data,
        path,
        index: rowNumber,
    }) : getTranslation(label, i18n)));
};
