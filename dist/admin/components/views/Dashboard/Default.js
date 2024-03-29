import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import Eyebrow from '../../elements/Eyebrow';
import Card from '../../elements/Card';
import Button from '../../elements/Button';
import { Gutter } from '../../elements/Gutter';
import { groupNavItems, EntityType } from '../../../utilities/groupNavItems';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'dashboard';
const Dashboard = (props) => {
    const { collections, globals, permissions, } = props;
    const { push } = useHistory();
    const { i18n } = useTranslation('general');
    const { routes: { admin, }, admin: { components: { afterDashboard, beforeDashboard, }, }, } = useConfig();
    const [groups, setGroups] = useState([]);
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
    }, [collections, globals, i18n, permissions]);
    return (React.createElement("div", { className: baseClass },
        React.createElement(Eyebrow, null),
        React.createElement(Gutter, { className: `${baseClass}__wrap` },
            Array.isArray(beforeDashboard) && beforeDashboard.map((Component, i) => React.createElement(Component, { key: i })),
            groups.map(({ label, entities }, groupIndex) => {
                return (React.createElement(React.Fragment, { key: groupIndex },
                    React.createElement("h2", { className: `${baseClass}__label` }, label),
                    React.createElement("ul", { className: `${baseClass}__card-list` }, entities.map(({ entity, type }, entityIndex) => {
                        var _a, _b, _c;
                        let title;
                        let createHREF;
                        let onClick;
                        let hasCreatePermission;
                        if (type === EntityType.collection) {
                            title = getTranslation(entity.labels.plural, i18n);
                            onClick = () => push({ pathname: `${admin}/collections/${entity.slug}` });
                            createHREF = `${admin}/collections/${entity.slug}/create`;
                            hasCreatePermission = (_c = (_b = (_a = permissions === null || permissions === void 0 ? void 0 : permissions.collections) === null || _a === void 0 ? void 0 : _a[entity.slug]) === null || _b === void 0 ? void 0 : _b.create) === null || _c === void 0 ? void 0 : _c.permission;
                        }
                        if (type === EntityType.global) {
                            title = getTranslation(entity.label, i18n);
                            onClick = () => push({ pathname: `${admin}/globals/${entity.slug}` });
                        }
                        return (React.createElement("li", { key: entityIndex },
                            React.createElement(Card, { title: title, id: `card-${entity.slug}`, onClick: onClick, actions: (hasCreatePermission && type === EntityType.collection) ? (React.createElement(Button, { el: "link", to: createHREF, icon: "plus", round: true, buttonStyle: "icon-label", iconStyle: "with-border" })) : undefined })));
                    }))));
            }),
            Array.isArray(afterDashboard) && afterDashboard.map((Component, i) => React.createElement(Component, { key: i })))));
};
export default Dashboard;
