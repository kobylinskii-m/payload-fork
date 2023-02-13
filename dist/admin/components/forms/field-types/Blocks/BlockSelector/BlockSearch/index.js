import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../../../../../graphics/Search';
import './index.scss';
const baseClass = 'block-search';
const BlockSearch = (props) => {
    const { setSearchTerm } = props;
    const { t } = useTranslation('fields');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (React.createElement("div", { className: baseClass },
        React.createElement("input", { className: `${baseClass}__input`, placeholder: t('searchForBlock'), onChange: handleChange }),
        React.createElement(SearchIcon, null)));
};
export default BlockSearch;
