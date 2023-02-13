import React, { useState, useCallback, useEffect } from 'react';
import qs from 'qs';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../utilities/Config';
import ReactSelect from '../../../elements/ReactSelect';
import { mostRecentVersionOption, publishedVersionOption } from '../shared';
import './index.scss';
const baseClass = 'compare-version';
const maxResultsPerRequest = 10;
const baseOptions = [
    mostRecentVersionOption,
];
const CompareVersion = (props) => {
    const { onChange, value, baseURL, versionID, parentID, publishedDoc } = props;
    const { admin: { dateFormat, }, } = useConfig();
    const [options, setOptions] = useState(baseOptions);
    const [lastLoadedPage, setLastLoadedPage] = useState(1);
    const [errorLoading, setErrorLoading] = useState('');
    const { t, i18n } = useTranslation('version');
    const getResults = useCallback(async ({ lastLoadedPage: lastLoadedPageArg, }) => {
        const query = {
            limit: maxResultsPerRequest,
            page: lastLoadedPageArg,
            depth: 0,
            where: {
                and: [
                    {
                        id: {
                            not_equals: versionID,
                        },
                    },
                ],
            },
        };
        if (parentID) {
            query.where.and.push({
                parent: {
                    equals: parentID,
                },
            });
        }
        const search = qs.stringify(query);
        const response = await fetch(`${baseURL}?${search}`, {
            credentials: 'include',
            headers: {
                'Accept-Language': i18n.language,
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data.docs.length > 0) {
                setOptions((existingOptions) => [
                    ...existingOptions,
                    ...data.docs.map((doc) => ({
                        label: format(new Date(doc.createdAt), dateFormat),
                        value: doc.id,
                    })),
                ]);
                setLastLoadedPage(data.page);
            }
        }
        else {
            setErrorLoading(t('error:unspecific'));
        }
    }, [dateFormat, baseURL, parentID, versionID, t, i18n]);
    const classes = [
        'field-type',
        baseClass,
        errorLoading && 'error-loading',
    ].filter(Boolean).join(' ');
    useEffect(() => {
        getResults({ lastLoadedPage: 1 });
    }, [getResults]);
    useEffect(() => {
        if ((publishedDoc === null || publishedDoc === void 0 ? void 0 : publishedDoc._status) === 'published')
            setOptions((currentOptions) => [publishedVersionOption, ...currentOptions]);
    }, [publishedDoc]);
    return (React.createElement("div", { className: classes },
        React.createElement("div", { className: `${baseClass}__label` }, t('compareVersion')),
        !errorLoading && (React.createElement(ReactSelect, { isSearchable: false, placeholder: t('selectVersionToCompare'), onChange: onChange, onMenuScrollToBottom: () => {
                getResults({ lastLoadedPage: lastLoadedPage + 1 });
            }, value: value, options: options })),
        errorLoading && (React.createElement("div", { className: `${baseClass}__error-loading` }, errorLoading))));
};
export default CompareVersion;
