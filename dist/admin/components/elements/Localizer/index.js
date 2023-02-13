import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useLocale } from '../../utilities/Locale';
import { useSearchParams } from '../../utilities/SearchParams';
import Popup from '../Popup';
import './index.scss';
const baseClass = 'localizer';
const Localizer = () => {
    const { localization } = useConfig();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const { t } = useTranslation('general');
    if (localization) {
        const { locales } = localization;
        return (React.createElement("div", { className: baseClass },
            React.createElement(Popup, { horizontalAlign: "left", button: locale, render: ({ close }) => (React.createElement("div", null,
                    React.createElement("span", null, t('locales')),
                    React.createElement("ul", null, locales.map((localeOption) => {
                        const baseLocaleClass = `${baseClass}__locale`;
                        const localeClasses = [
                            baseLocaleClass,
                            locale === localeOption && `${baseLocaleClass}--active`,
                        ];
                        const newParams = {
                            ...searchParams,
                            locale: localeOption,
                        };
                        const search = qs.stringify(newParams);
                        if (localeOption !== locale) {
                            return (React.createElement("li", { key: localeOption, className: localeClasses.join(' ') },
                                React.createElement(Link, { to: { search }, onClick: close }, localeOption)));
                        }
                        return null;
                    })))) })));
    }
    return null;
};
export default Localizer;
