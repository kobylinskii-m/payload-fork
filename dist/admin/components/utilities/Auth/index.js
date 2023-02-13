import React, { useState, createContext, useContext, useEffect, useCallback, } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation, useHistory } from 'react-router-dom';
import { useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../Config';
import { requests } from '../../../api';
import useDebounce from '../../../hooks/useDebounce';
const Context = createContext({});
const maxTimeoutTime = 2147483647;
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [tokenInMemory, setTokenInMemory] = useState();
    const { pathname } = useLocation();
    const { push } = useHistory();
    const config = useConfig();
    const { admin: { user: userSlug, inactivityRoute: logoutInactivityRoute, }, serverURL, routes: { admin, api, }, } = config;
    const exp = user === null || user === void 0 ? void 0 : user.exp;
    const [permissions, setPermissions] = useState();
    const { i18n } = useTranslation();
    const { openModal, closeAllModals } = useModal();
    const [lastLocationChange, setLastLocationChange] = useState(0);
    const debouncedLocationChange = useDebounce(lastLocationChange, 10000);
    const id = user === null || user === void 0 ? void 0 : user.id;
    const refreshCookie = useCallback(() => {
        const now = Math.round((new Date()).getTime() / 1000);
        const remainingTime = (exp || 0) - now;
        if (exp && remainingTime < 120) {
            setTimeout(async () => {
                const request = await requests.post(`${serverURL}${api}/${userSlug}/refresh-token`, {
                    headers: {
                        'Accept-Language': i18n.language,
                    },
                });
                if (request.status === 200) {
                    const json = await request.json();
                    setUser(json.user);
                }
                else {
                    setUser(null);
                    push(`${admin}${logoutInactivityRoute}`);
                }
            }, 1000);
        }
    }, [exp, serverURL, api, userSlug, push, admin, logoutInactivityRoute, i18n]);
    const setToken = useCallback((token) => {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setTokenInMemory(token);
    }, []);
    const logOut = useCallback(() => {
        setUser(null);
        setTokenInMemory(undefined);
        requests.post(`${serverURL}${api}/${userSlug}/logout`);
    }, [serverURL, api, userSlug]);
    // On mount, get user and set
    useEffect(() => {
        const fetchMe = async () => {
            const request = await requests.get(`${serverURL}${api}/${userSlug}/me`, {
                headers: {
                    'Accept-Language': i18n.language,
                },
            });
            if (request.status === 200) {
                const json = await request.json();
                setUser((json === null || json === void 0 ? void 0 : json.user) || null);
                if (json === null || json === void 0 ? void 0 : json.token) {
                    setToken(json.token);
                }
            }
        };
        fetchMe();
    }, [i18n, setToken, api, serverURL, userSlug]);
    // When location changes, refresh cookie
    useEffect(() => {
        if (id) {
            refreshCookie();
        }
    }, [debouncedLocationChange, refreshCookie, id]);
    useEffect(() => {
        setLastLocationChange(Date.now());
    }, [pathname]);
    // When user changes, get new access
    useEffect(() => {
        async function getPermissions() {
            const request = await requests.get(`${serverURL}${api}/access`, {
                headers: {
                    'Accept-Language': i18n.language,
                },
            });
            if (request.status === 200) {
                const json = await request.json();
                setPermissions(json);
            }
        }
        if (id) {
            getPermissions();
        }
    }, [i18n, id, api, serverURL]);
    useEffect(() => {
        let reminder;
        const now = Math.round((new Date()).getTime() / 1000);
        const remainingTime = exp - now;
        if (remainingTime > 0) {
            reminder = setTimeout(() => {
                openModal('stay-logged-in');
            }, (Math.min((remainingTime - 60) * 1000), maxTimeoutTime));
        }
        return () => {
            if (reminder)
                clearTimeout(reminder);
        };
    }, [exp, openModal]);
    useEffect(() => {
        let forceLogOut;
        const now = Math.round((new Date()).getTime() / 1000);
        const remainingTime = exp - now;
        if (remainingTime > 0) {
            forceLogOut = setTimeout(() => {
                setUser(null);
                push(`${admin}${logoutInactivityRoute}`);
                closeAllModals();
            }, Math.min(remainingTime * 1000, maxTimeoutTime));
        }
        return () => {
            if (forceLogOut)
                clearTimeout(forceLogOut);
        };
    }, [exp, push, closeAllModals, admin, i18n, logoutInactivityRoute]);
    return (React.createElement(Context.Provider, { value: {
            user,
            logOut,
            refreshCookie,
            permissions,
            setToken,
            token: tokenInMemory,
        } }, children));
};
export const useAuth = () => useContext(Context);
