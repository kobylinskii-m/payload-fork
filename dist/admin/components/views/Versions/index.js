import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { Banner, Pill } from '../..';
import { getTranslation } from '../../../../utilities/getTranslation';
import { shouldIncrementVersionCount } from '../../../../versions/shouldIncrementVersionCount';
import usePayloadAPI from '../../../hooks/usePayloadAPI';
import Eyebrow from '../../elements/Eyebrow';
import { Gutter } from '../../elements/Gutter';
import IDLabel from '../../elements/IDLabel';
import Loading from '../../elements/Loading';
import Paginator from '../../elements/Paginator';
import PerPage from '../../elements/PerPage';
import { useStepNav } from '../../elements/StepNav';
import Table from '../../elements/Table';
import { useConfig } from '../../utilities/Config';
import Meta from '../../utilities/Meta';
import { useSearchParams } from '../../utilities/SearchParams';
import { getColumns } from './columns';
import { handlerAsTitle } from '../../../../utilities/formatLabels';
import './index.scss';
const baseClass = 'versions';
const Versions = ({ collection, global }) => {
    var _a, _b, _c;
    const { serverURL, routes: { admin, api }, admin: { dateFormat } } = useConfig();
    const { setStepNav } = useStepNav();
    const { params: { id } } = useRouteMatch();
    const { t, i18n } = useTranslation('version');
    const [tableColumns] = useState(() => getColumns(collection, global, t));
    const [fetchURL, setFetchURL] = useState('');
    const { page, sort, limit } = useSearchParams();
    let docURL;
    let entityLabel;
    let slug;
    let entity;
    let editURL;
    if (collection) {
        ({ slug } = collection);
        docURL = `${serverURL}${api}/${slug}/${id}`;
        entityLabel = getTranslation(collection.labels.singular, i18n);
        entity = collection;
        editURL = `${admin}/collections/${collection.slug}/${id}`;
    }
    if (global) {
        ({ slug } = global);
        docURL = `${serverURL}${api}/globals/${slug}`;
        entityLabel = getTranslation(global.label, i18n);
        entity = global;
        editURL = `${admin}/globals/${global.slug}`;
    }
    const useAsTitle = ((_a = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _a === void 0 ? void 0 : _a.useAsTitle) || 'id';
    const [{ data: doc }] = usePayloadAPI(docURL, { initialParams: { draft: 'true' } });
    const [{ data: versionsData, isLoading: isLoadingVersions }, { setParams }] = usePayloadAPI(fetchURL);
    useEffect(() => {
        let nav = [];
        if (collection) {
            let docLabel = '';
            if (doc) {
                if (useAsTitle) {
                    const labelTitle = handlerAsTitle(doc, useAsTitle);
                    if (labelTitle) {
                        docLabel = labelTitle;
                    }
                    else {
                        docLabel = `[${t('general:untitled')}]`;
                    }
                }
                else {
                    docLabel = doc.id;
                }
            }
            nav = [
                {
                    url: `${admin}/collections/${collection.slug}`,
                    label: getTranslation(collection.labels.plural, i18n),
                },
                {
                    label: docLabel,
                    url: editURL,
                },
                {
                    label: t('versions'),
                },
            ];
        }
        if (global) {
            nav = [
                {
                    url: editURL,
                    label: getTranslation(global.label, i18n),
                },
                {
                    label: t('versions'),
                },
            ];
        }
        setStepNav(nav);
    }, [setStepNav, collection, global, useAsTitle, doc, admin, id, editURL, t, i18n]);
    useEffect(() => {
        const params = {
            depth: 1,
            page: undefined,
            sort: undefined,
            limit,
            where: {},
        };
        if (page)
            params.page = page;
        if (sort)
            params.sort = sort;
        let fetchURLToSet;
        if (collection) {
            fetchURLToSet = `${serverURL}${api}/${collection.slug}/versions`;
            params.where = {
                parent: {
                    equals: id,
                },
            };
        }
        if (global) {
            fetchURLToSet = `${serverURL}${api}/globals/${global.slug}/versions`;
        }
        // Performance enhancement
        // Setting the Fetch URL this way
        // prevents a double-fetch
        setFetchURL(fetchURLToSet);
        setParams(params);
    }, [setParams, page, sort, limit, serverURL, api, id, global, collection]);
    const labelTitle = handlerAsTitle(doc, useAsTitle);
    let useIDLabel = labelTitle === (doc === null || doc === void 0 ? void 0 : doc.id);
    let heading;
    let metaDesc;
    let metaTitle;
    if (collection) {
        metaTitle = `${t('versions')} - ${labelTitle} - ${entityLabel}`;
        metaDesc = t('viewingVersions', { documentTitle: labelTitle, entityLabel });
        heading = (doc === null || doc === void 0 ? void 0 : doc[useAsTitle]) || `[${t('general:untitled')}]`;
    }
    if (global) {
        metaTitle = `${t('versions')} - ${entityLabel}`;
        metaDesc = t('viewingVersionsGlobal', { entityLabel });
        heading = entityLabel;
        useIDLabel = false;
    }
    const docStatus = doc === null || doc === void 0 ? void 0 : doc._status;
    const docUpdatedAt = doc === null || doc === void 0 ? void 0 : doc.updatedAt;
    const showParentDoc = (versionsData === null || versionsData === void 0 ? void 0 : versionsData.page) === 1 && shouldIncrementVersionCount({ entity, docStatus, versions: versionsData });
    return (React.createElement("div", { className: baseClass },
        React.createElement(Meta, { title: metaTitle, description: metaDesc }),
        React.createElement(Eyebrow, null),
        React.createElement(Gutter, { className: `${baseClass}__wrap` },
            React.createElement("header", { className: `${baseClass}__header` },
                React.createElement("div", { className: `${baseClass}__intro` }, t('showingVersionsFor')),
                useIDLabel && (React.createElement(IDLabel, { id: doc === null || doc === void 0 ? void 0 : doc.id })),
                !useIDLabel && (React.createElement("h1", null, heading))),
            isLoadingVersions && (React.createElement(Loading, null)),
            showParentDoc && (React.createElement(Banner, { type: docStatus === 'published' ? 'success' : undefined, className: `${baseClass}__parent-doc` },
                t('currentDocumentStatus', { docStatus }),
                "-",
                ' ',
                format(new Date(docUpdatedAt), dateFormat),
                React.createElement("div", { className: `${baseClass}__parent-doc-pills` },
                    "\u00A0\u00A0",
                    React.createElement(Pill, { pillStyle: "white", to: editURL }, t('general:edit'))))),
            (versionsData === null || versionsData === void 0 ? void 0 : versionsData.totalDocs) > 0 && (React.createElement(React.Fragment, null,
                React.createElement(Table, { data: versionsData === null || versionsData === void 0 ? void 0 : versionsData.docs, columns: tableColumns }),
                React.createElement("div", { className: `${baseClass}__page-controls` },
                    React.createElement(Paginator, { limit: versionsData.limit, totalPages: versionsData.totalPages, page: versionsData.page, hasPrevPage: versionsData.hasPrevPage, hasNextPage: versionsData.hasNextPage, prevPage: versionsData.prevPage, nextPage: versionsData.nextPage, numberOfNeighbors: 1 }),
                    (versionsData === null || versionsData === void 0 ? void 0 : versionsData.totalDocs) > 0 && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: `${baseClass}__page-info` },
                            (versionsData.page * versionsData.limit) - (versionsData.limit - 1),
                            "-",
                            versionsData.totalPages > 1 && versionsData.totalPages !== versionsData.page ? (versionsData.limit * versionsData.page) : versionsData.totalDocs,
                            ' ',
                            t('of'),
                            ' ',
                            versionsData.totalDocs),
                        React.createElement(PerPage, { limits: (_c = (_b = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _b === void 0 ? void 0 : _b.pagination) === null || _c === void 0 ? void 0 : _c.limits, limit: limit ? Number(limit) : 10 })))))),
            (versionsData === null || versionsData === void 0 ? void 0 : versionsData.totalDocs) === 0 && (React.createElement("div", { className: `${baseClass}__no-versions` }, t('noFurtherVersionsFound'))))));
};
export default Versions;
