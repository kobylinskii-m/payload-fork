import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import Eyebrow from '../../elements/Eyebrow';
import { useStepNav } from '../../elements/StepNav';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';
import { Gutter } from '../../elements/Gutter';
const baseClass = 'not-found';
const NotFound = () => {
    const { setStepNav } = useStepNav();
    const { routes: { admin } } = useConfig();
    const { t } = useTranslation('general');
    useEffect(() => {
        setStepNav([{
                label: t('notFound'),
            }]);
    }, [setStepNav, t]);
    return (React.createElement("div", { className: baseClass },
        React.createElement(Meta, { title: t('notFound'), description: t('pageNotFound'), keywords: `404 ${t('notFound')}` }),
        React.createElement(Eyebrow, null),
        React.createElement(Gutter, { className: `${baseClass}__wrap` },
            React.createElement("h1", null, t('nothingFound')),
            React.createElement("p", null, t('sorryNotFound')),
            React.createElement(Button, { el: "link", to: `${admin}` }, t('backToDashboard')))));
};
export default NotFound;
