import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import querystring from 'qs';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../utilities/Config';
import { reducer } from './reducer';
import useDebounce from '../../../../../hooks/useDebounce';
const Context = createContext({});
export const RelationshipProvider = ({ children }) => {
    const [documents, dispatchDocuments] = useReducer(reducer, {});
    const debouncedDocuments = useDebounce(documents, 100);
    const config = useConfig();
    const { i18n } = useTranslation();
    const { serverURL, routes: { api }, } = config;
    useEffect(() => {
        Object.entries(debouncedDocuments).forEach(async ([slug, docs]) => {
            const idsToLoad = [];
            Object.entries(docs).forEach(([id, value]) => {
                if (value === null) {
                    idsToLoad.push(id);
                }
            });
            if (idsToLoad.length > 0) {
                const url = `${serverURL}${api}/${slug}`;
                const params = {
                    depth: 0,
                    'where[id][in]': idsToLoad,
                    limit: 250,
                };
                const query = querystring.stringify(params, { addQueryPrefix: true });
                const result = await fetch(`${url}${query}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language,
                    },
                });
                if (result.ok) {
                    const json = await result.json();
                    if (json.docs) {
                        dispatchDocuments({ type: 'ADD_LOADED', docs: json.docs, relationTo: slug, idsToLoad });
                    }
                }
                else {
                    dispatchDocuments({ type: 'ADD_LOADED', docs: [], relationTo: slug, idsToLoad });
                }
            }
        });
    }, [i18n, serverURL, api, debouncedDocuments]);
    const getRelationships = useCallback(async (relationships) => {
        dispatchDocuments({ type: 'REQUEST', docs: relationships });
    }, []);
    return (React.createElement(Context.Provider, { value: { getRelationships, documents } }, children));
};
export const useListRelationships = () => useContext(Context);
