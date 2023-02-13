import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../Config';
import { useAuth } from '../Auth';
import { requests } from '../../../api';
const Context = createContext({});
const requestOptions = (value, language) => ({
    body: JSON.stringify({ value }),
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
    },
});
export const PreferencesProvider = ({ children }) => {
    const contextRef = useRef({});
    const preferencesRef = useRef({});
    const config = useConfig();
    const { user } = useAuth();
    const { i18n } = useTranslation();
    const { serverURL, routes: { api } } = config;
    useEffect(() => {
        if (!user) {
            // clear preferences between users
            preferencesRef.current = {};
        }
    }, [user]);
    const getPreference = useCallback(async (key) => {
        if (typeof preferencesRef.current[key] !== 'undefined')
            return preferencesRef.current[key];
        const promise = new Promise((resolve) => {
            (async () => {
                const request = await requests.get(`${serverURL}${api}/_preferences/${key}`, {
                    headers: {
                        'Accept-Language': i18n.language,
                    },
                });
                let value = null;
                if (request.status === 200) {
                    const preference = await request.json();
                    value = preference.value;
                }
                preferencesRef.current[key] = value;
                resolve(value);
            })();
        });
        preferencesRef.current[key] = promise;
        return promise;
    }, [i18n.language, api, preferencesRef, serverURL]);
    const setPreference = useCallback(async (key, value) => {
        preferencesRef.current[key] = value;
        await requests.post(`${serverURL}${api}/_preferences/${key}`, requestOptions(value, i18n.language));
    }, [api, i18n.language, serverURL]);
    contextRef.current.getPreference = getPreference;
    contextRef.current.setPreference = setPreference;
    return (React.createElement(Context.Provider, { value: contextRef.current }, children));
};
export const usePreferences = () => useContext(Context);
