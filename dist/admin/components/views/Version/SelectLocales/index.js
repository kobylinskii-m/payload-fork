import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect from '../../../elements/ReactSelect';
import './index.scss';
const baseClass = 'select-version-locales';
const SelectLocales = ({ onChange, value, options }) => {
    const { t } = useTranslation('version');
    return (React.createElement("div", { className: baseClass },
        React.createElement("div", { className: `${baseClass}__label` }, t('showLocales')),
        React.createElement(ReactSelect, { isMulti: true, placeholder: t('selectLocales'), onChange: onChange, value: value, options: options })));
};
export default SelectLocales;
