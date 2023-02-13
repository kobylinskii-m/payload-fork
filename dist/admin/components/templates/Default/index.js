import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import DefaultNav from '../../elements/Nav';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';
import Meta from '../../utilities/Meta';
import './index.scss';
const baseClass = 'template-default';
const Default = ({ children, className }) => {
    const { admin: { components: { Nav: CustomNav, } = {
        Nav: undefined,
    }, } = {}, } = useConfig();
    const { t } = useTranslation('general');
    const classes = [
        baseClass,
        className,
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes },
        React.createElement(Meta, { title: t('dashboard'), description: `${t('dashboard')} Payload CMS`, keywords: `${t('dashboard')}, Payload CMS` }),
        React.createElement(RenderCustomComponent, { DefaultComponent: DefaultNav, CustomComponent: CustomNav }),
        React.createElement("div", { className: `${baseClass}__wrap` }, children)));
};
export default Default;
