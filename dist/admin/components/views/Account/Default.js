import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import Eyebrow from '../../elements/Eyebrow';
import Form from '../../forms/Form';
import PreviewButton from '../../elements/PreviewButton';
import FormSubmit from '../../forms/Submit';
import RenderFields from '../../forms/RenderFields';
import CopyToClipboard from '../../elements/CopyToClipboard';
import fieldTypes from '../../forms/field-types';
import RenderTitle from '../../elements/RenderTitle';
import LeaveWithoutSaving from '../../modals/LeaveWithoutSaving';
import Meta from '../../utilities/Meta';
import Auth from '../collections/Edit/Auth';
import Loading from '../../elements/Loading';
import { OperationContext } from '../../utilities/OperationProvider';
import { ToggleTheme } from './ToggleTheme';
import { Gutter } from '../../elements/Gutter';
import ReactSelect from '../../elements/ReactSelect';
import Label from '../../forms/Label';
import './index.scss';
const baseClass = 'account';
const DefaultAccount = (props) => {
    var _a, _b, _c, _d;
    const { collection, data, permissions, hasSavePermission, apiURL, initialState, isLoading, action, } = props;
    const { slug, fields, admin: { useAsTitle, preview, }, timestamps, auth, } = collection;
    const { admin: { dateFormat }, routes: { admin } } = useConfig();
    const { t, i18n } = useTranslation('authentication');
    const languageOptions = Object.entries(i18n.options.resources).map(([language, resource]) => ({ label: resource.general.thisLanguage, value: language }));
    const classes = [
        baseClass,
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: classes },
        isLoading && (React.createElement(Loading, null)),
        !isLoading && (React.createElement(OperationContext.Provider, { value: "update" },
            React.createElement(Form, { className: `${baseClass}__form`, method: "patch", action: action, initialState: initialState, disabled: !hasSavePermission },
                React.createElement("div", { className: `${baseClass}__main` },
                    React.createElement(Meta, { title: t('account'), description: t('accountOfCurrentUser'), keywords: t('account') }),
                    React.createElement(Eyebrow, null),
                    !(((_a = collection.versions) === null || _a === void 0 ? void 0 : _a.drafts) && ((_c = (_b = collection.versions) === null || _b === void 0 ? void 0 : _b.drafts) === null || _c === void 0 ? void 0 : _c.autosave)) && (React.createElement(LeaveWithoutSaving, null)),
                    React.createElement("div", { className: `${baseClass}__edit` },
                        React.createElement(Gutter, { className: `${baseClass}__header` },
                            React.createElement("h1", null,
                                React.createElement(RenderTitle, { ...{ data, useAsTitle, fallback: `[${t('general:untitled')}]` } })),
                            React.createElement(Auth, { useAPIKey: auth.useAPIKey, collection: collection, email: data === null || data === void 0 ? void 0 : data.email, operation: "update" }),
                            React.createElement(RenderFields, { permissions: permissions.fields, readOnly: !hasSavePermission, filter: (field) => { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) !== 'sidebar'; }, fieldTypes: fieldTypes, fieldSchema: fields })),
                        React.createElement(Gutter, { className: `${baseClass}__payload-settings` },
                            React.createElement("h3", null, t('general:payloadSettings')),
                            React.createElement("div", { className: `${baseClass}__language` },
                                React.createElement(Label, { label: t('general:language') }),
                                React.createElement(ReactSelect, { value: languageOptions.find((language) => (language.value === i18n.language)), options: languageOptions, onChange: ({ value }) => (i18n.changeLanguage(value)) })),
                            React.createElement(ToggleTheme, null)))),
                React.createElement("div", { className: `${baseClass}__sidebar-wrap` },
                    React.createElement("div", { className: `${baseClass}__sidebar` },
                        React.createElement("div", { className: `${baseClass}__sidebar-sticky-wrap` },
                            React.createElement("ul", { className: `${baseClass}__collection-actions` }, ((_d = permissions === null || permissions === void 0 ? void 0 : permissions.create) === null || _d === void 0 ? void 0 : _d.permission) && (React.createElement(React.Fragment, null,
                                React.createElement("li", null,
                                    React.createElement(Link, { to: `${admin}/collections/${slug}/create` }, t('general:createNew')))))),
                            React.createElement("div", { className: `${baseClass}__document-actions${preview ? ` ${baseClass}__document-actions--with-preview` : ''}` },
                                React.createElement(PreviewButton, { generatePreviewURL: preview, data: data }),
                                hasSavePermission && (React.createElement(FormSubmit, { buttonId: "action-save" }, t('general:save')))),
                            React.createElement("div", { className: `${baseClass}__sidebar-fields` },
                                React.createElement(RenderFields, { permissions: permissions.fields, readOnly: !hasSavePermission, filter: (field) => { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.admin) === null || _a === void 0 ? void 0 : _a.position) === 'sidebar'; }, fieldTypes: fieldTypes, fieldSchema: fields })),
                            React.createElement("ul", { className: `${baseClass}__meta` },
                                React.createElement("li", { className: `${baseClass}__api-url` },
                                    React.createElement("span", { className: `${baseClass}__label` },
                                        "API URL",
                                        ' ',
                                        React.createElement(CopyToClipboard, { value: apiURL })),
                                    React.createElement("a", { href: apiURL, target: "_blank", rel: "noopener noreferrer" }, apiURL)),
                                React.createElement("li", null,
                                    React.createElement("div", { className: `${baseClass}__label` }, "ID"),
                                    React.createElement("div", null, data === null || data === void 0 ? void 0 : data.id)),
                                timestamps && (React.createElement(React.Fragment, null,
                                    data.updatedAt && (React.createElement("li", null,
                                        React.createElement("div", { className: `${baseClass}__label` }, t('general:lastModified')),
                                        React.createElement("div", null, format(new Date(data.updatedAt), dateFormat)))),
                                    data.createdAt && (React.createElement("li", null,
                                        React.createElement("div", { className: `${baseClass}__label` }, t('general:created')),
                                        React.createElement("div", null, format(new Date(data.createdAt), dateFormat)))))))))))))));
};
export default DefaultAccount;
