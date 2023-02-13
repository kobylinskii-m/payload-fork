import React from 'react';
import { useTranslation } from 'react-i18next';
import { optionsAreObjects } from '../../../../../../../../fields/config/types';
import { getTranslation } from '../../../../../../../../utilities/getTranslation';
const SelectCell = ({ data, field }) => {
    const { i18n } = useTranslation();
    const findLabel = (items) => items.map((i) => {
        var _a, _b;
        const found = (_b = (_a = field.options
            .filter((f) => f.value === i)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.label;
        return getTranslation(found, i18n);
    }).join(', ');
    let content = '';
    if (optionsAreObjects(field.options)) {
        content = Array.isArray(data)
            ? findLabel(data) // hasMany
            : findLabel([data]);
    }
    else {
        content = Array.isArray(data)
            ? data.join(', ') // hasMany
            : data;
    }
    return (React.createElement("span", null, content));
};
export default SelectCell;
