import qs from 'qs';
export const requests = {
    get: (url, options = { headers: {} }) => {
        let query = '';
        if (options.params) {
            query = qs.stringify(options.params, { addQueryPrefix: true });
        }
        return fetch(`${url}${query}`, {
            credentials: 'include',
            headers: options.headers,
        });
    },
    post: (url, options = { headers: {} }) => {
        const headers = options && options.headers ? { ...options.headers } : {};
        const formattedOptions = {
            ...options,
            method: 'post',
            credentials: 'include',
            headers: {
                ...headers,
            },
        };
        return fetch(`${url}`, formattedOptions);
    },
    put: (url, options = { headers: {} }) => {
        const headers = options && options.headers ? { ...options.headers } : {};
        const formattedOptions = {
            ...options,
            method: 'put',
            credentials: 'include',
            headers: {
                ...headers,
            },
        };
        return fetch(url, formattedOptions);
    },
    patch: (url, options = { headers: {} }) => {
        const headers = options && options.headers ? { ...options.headers } : {};
        const formattedOptions = {
            ...options,
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...headers,
            },
        };
        return fetch(url, formattedOptions);
    },
    delete: (url, options = { headers: {} }) => {
        const headers = options && options.headers ? { ...options.headers } : {};
        const formattedOptions = {
            ...options,
            method: 'delete',
            credentials: 'include',
            headers: {
                ...headers,
            },
        };
        return fetch(url, formattedOptions);
    },
};
