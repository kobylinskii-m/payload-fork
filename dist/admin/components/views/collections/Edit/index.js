import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../utilities/Config';
import { useAuth } from '../../../utilities/Auth';
import usePayloadAPI from '../../../../hooks/usePayloadAPI';
import RenderCustomComponent from '../../../utilities/RenderCustomComponent';
import DefaultEdit from './Default';
import formatFields from './formatFields';
import buildStateFromSchema from '../../../forms/Form/buildStateFromSchema';
import { useLocale } from '../../../utilities/Locale';
import { useDocumentInfo } from '../../../utilities/DocumentInfo';
import { usePreferences } from '../../../utilities/Preferences';
import { EditDepthContext } from '../../../utilities/EditDepth';
const EditView = (props) => {
    var _a, _b, _c;
    const { collection: incomingCollection, isEditing } = props;
    const { slug, admin: { components: { views: { Edit: CustomEdit, } = {}, } = {}, } = {}, } = incomingCollection;
    const [fields] = useState(() => formatFields(incomingCollection, isEditing));
    const [collection] = useState(() => ({ ...incomingCollection, fields }));
    const [redirect, setRedirect] = useState();
    const locale = useLocale();
    const { serverURL, routes: { admin, api } } = useConfig();
    const { params: { id } = {} } = useRouteMatch();
    const { state: locationState } = useLocation();
    const history = useHistory();
    const [initialState, setInitialState] = useState();
    const { permissions, user } = useAuth();
    const { getVersions, preferencesKey } = useDocumentInfo();
    const { getPreference } = usePreferences();
    const { t } = useTranslation('general');
    const onSave = useCallback(async (json) => {
        var _a;
        getVersions();
        if (!isEditing) {
            setRedirect(`${admin}/collections/${collection.slug}/${(_a = json === null || json === void 0 ? void 0 : json.doc) === null || _a === void 0 ? void 0 : _a.id}`);
        }
        else {
            const state = await buildStateFromSchema({ fieldSchema: collection.fields, data: json.doc, user, id, operation: 'update', locale, t });
            setInitialState(state);
        }
    }, [admin, collection, isEditing, getVersions, user, id, t, locale]);
    const [{ data, isLoading: isLoadingDocument, isError }] = usePayloadAPI((isEditing ? `${serverURL}${api}/${slug}/${id}` : null), { initialParams: { 'fallback-locale': 'null', depth: 0, draft: 'true' } });
    const dataToRender = (locationState === null || locationState === void 0 ? void 0 : locationState.data) || data;
    useEffect(() => {
        if (isLoadingDocument) {
            return;
        }
        const awaitInitialState = async () => {
            const state = await buildStateFromSchema({ fieldSchema: fields, data: dataToRender, user, operation: isEditing ? 'update' : 'create', id, locale, t });
            await getPreference(preferencesKey);
            setInitialState(state);
        };
        awaitInitialState();
    }, [dataToRender, fields, isEditing, id, user, locale, isLoadingDocument, preferencesKey, getPreference, t]);
    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [history, redirect]);
    if (isError) {
        return (React.createElement(Redirect, { to: `${admin}/not-found` }));
    }
    const collectionPermissions = (_a = permissions === null || permissions === void 0 ? void 0 : permissions.collections) === null || _a === void 0 ? void 0 : _a[slug];
    const apiURL = `${serverURL}${api}/${slug}/${id}${collection.versions.drafts ? '?draft=true' : ''}`;
    const action = `${serverURL}${api}/${slug}${isEditing ? `/${id}` : ''}?locale=${locale}&depth=0&fallback-locale=null`;
    const hasSavePermission = (isEditing && ((_b = collectionPermissions === null || collectionPermissions === void 0 ? void 0 : collectionPermissions.update) === null || _b === void 0 ? void 0 : _b.permission)) || (!isEditing && ((_c = collectionPermissions === null || collectionPermissions === void 0 ? void 0 : collectionPermissions.create) === null || _c === void 0 ? void 0 : _c.permission));
    return (React.createElement(EditDepthContext.Provider, { value: 1 },
        React.createElement(RenderCustomComponent, { DefaultComponent: DefaultEdit, CustomComponent: CustomEdit, componentProps: {
                id,
                isLoading: !initialState,
                data: dataToRender,
                collection,
                permissions: collectionPermissions,
                isEditing,
                onSave,
                initialState,
                hasSavePermission,
                apiURL,
                action,
            } })));
};
export default EditView;
