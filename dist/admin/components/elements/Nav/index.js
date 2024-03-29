import React, { useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import RenderCustomComponent from '../../utilities/RenderCustomComponent';
import Chevron from '../../icons/Chevron';
import Menu from '../../icons/Menu';
import CloseMenu from '../../icons/CloseMenu';
import Icon from '../../graphics/Icon';
import Account from '../../graphics/Account';
import Localizer from '../Localizer';
import NavGroup from '../NavGroup';
import Logout from '../Logout';
import { groupNavItems, EntityType } from '../../../utilities/groupNavItems';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'nav';
const DefaultNav = () => {
    const { permissions } = useAuth();
    const [menuActive, setMenuActive] = useState(false);
    const [groups, setGroups] = useState([]);
    const history = useHistory();
    const { i18n } = useTranslation('general');
    const { collections, globals, routes: { admin, }, admin: { components: { beforeNavLinks, afterNavLinks, }, }, } = useConfig();
    const classes = [
        baseClass,
        menuActive && `${baseClass}--menu-active`,
    ].filter(Boolean)
        .join(' ');
    useEffect(() => {
        setGroups(groupNavItems([
            ...collections.map((collection) => {
                const entityToGroup = {
                    type: EntityType.collection,
                    entity: collection,
                };
                return entityToGroup;
            }),
            ...globals.map((global) => {
                const entityToGroup = {
                    type: EntityType.global,
                    entity: global,
                };
                return entityToGroup;
            }),
        ], permissions, i18n));
    }, [collections, globals, permissions, i18n, i18n.language]);
    useEffect(() => history.listen(() => {
        setMenuActive(false);
    }), [history]);
    return (React.createElement("aside", { className: classes },
        React.createElement("div", { className: `${baseClass}__scroll` },
            React.createElement("header", null,
                React.createElement(Link, { to: admin, className: `${baseClass}__brand` },
                    React.createElement(Icon, null)),
                React.createElement("button", { type: "button", className: `${baseClass}__mobile-menu-btn`, onClick: () => setMenuActive(!menuActive) },
                    menuActive && (React.createElement(CloseMenu, null)),
                    !menuActive && (React.createElement(Menu, null)))),
            React.createElement("nav", { className: `${baseClass}__wrap` },
                Array.isArray(beforeNavLinks) && beforeNavLinks.map((Component, i) => React.createElement(Component, { key: i })),
                groups.map(({ label, entities }, key) => {
                    return (React.createElement(NavGroup, { ...{ key, label } }, entities.map(({ entity, type }, i) => {
                        let entityLabel;
                        let href;
                        let id;
                        if (type === EntityType.collection) {
                            href = `${admin}/collections/${entity.slug}`;
                            entityLabel = getTranslation(entity.labels.plural, i18n);
                            id = `nav-${entity.slug}`;
                        }
                        if (type === EntityType.global) {
                            href = `${admin}/globals/${entity.slug}`;
                            entityLabel = getTranslation(entity.label, i18n);
                            id = `nav-global-${entity.slug}`;
                        }
                        return (React.createElement(NavLink, { id: id, className: `${baseClass}__link`, activeClassName: "active", key: i, to: href },
                            React.createElement(Chevron, null),
                            entityLabel));
                    })));
                }),
                Array.isArray(afterNavLinks) && afterNavLinks.map((Component, i) => React.createElement(Component, { key: i })),
                React.createElement("div", { className: `${baseClass}__controls` },
                    React.createElement(Localizer, null),
                    React.createElement(Link, { to: `${admin}/account`, className: `${baseClass}__account` },
                        React.createElement(Account, null)),
                    React.createElement(Logout, null))))));
};
const Nav = () => {
    const { admin: { components: { Nav: CustomNav, } = {
        Nav: undefined,
    }, } = {}, } = useConfig();
    return (React.createElement(RenderCustomComponent, { CustomComponent: CustomNav, DefaultComponent: DefaultNav }));
};
export default Nav;
