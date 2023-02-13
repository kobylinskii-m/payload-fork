import React from 'react';
import { useHistory } from 'react-router-dom';
import { useModal, Modal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import MinimalTemplate from '../../templates/Minimal';
import Button from '../../elements/Button';
import './index.scss';
const baseClass = 'stay-logged-in';
const modalSlug = 'stay-logged-in';
const StayLoggedInModal = (props) => {
    const { refreshCookie } = props;
    const history = useHistory();
    const config = useConfig();
    const { routes: { admin }, admin: { logoutRoute } } = config;
    const { toggleModal } = useModal();
    const { t } = useTranslation('authentication');
    return (React.createElement(Modal, { className: baseClass, slug: "stay-logged-in" },
        React.createElement(MinimalTemplate, { className: `${baseClass}__template` },
            React.createElement("h1", null, t('stayLoggedIn')),
            React.createElement("p", null, t('youAreInactive')),
            React.createElement("div", { className: `${baseClass}__actions` },
                React.createElement(Button, { buttonStyle: "secondary", onClick: () => {
                        toggleModal(modalSlug);
                        history.push(`${admin}${logoutRoute}`);
                    } }, t('logOut')),
                React.createElement(Button, { onClick: () => {
                        refreshCookie();
                        toggleModal(modalSlug);
                    } }, t('stayLoggedIn'))))));
};
export default StayLoggedInModal;
