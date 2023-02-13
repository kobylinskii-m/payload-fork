import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useDocumentInfo } from '../../utilities/DocumentInfo';
import Button from '../Button';
import { MinimalTemplate } from '../..';
import { requests } from '../../../api';
import { useForm } from '../../forms/Form/context';
import { useLocale } from '../../utilities/Locale';
import './index.scss';
const baseClass = 'status';
const Status = () => {
    var _a, _b;
    const { publishedDoc, unpublishedVersions, collection, global, id, getVersions, } = useDocumentInfo();
    const { toggleModal } = useModal();
    const { serverURL, routes: { api }, } = useConfig();
    const [processing, setProcessing] = useState(false);
    const { reset: resetForm } = useForm();
    const locale = useLocale();
    const { t, i18n } = useTranslation('version');
    const unPublishModalSlug = `confirm-un-publish-${id}`;
    const revertModalSlug = `confirm-revert-${id}`;
    let statusToRender;
    if (((_a = unpublishedVersions === null || unpublishedVersions === void 0 ? void 0 : unpublishedVersions.docs) === null || _a === void 0 ? void 0 : _a.length) > 0 && publishedDoc) {
        statusToRender = t('changed');
    }
    else if (!publishedDoc) {
        statusToRender = t('draft');
    }
    else if (publishedDoc && ((_b = unpublishedVersions === null || unpublishedVersions === void 0 ? void 0 : unpublishedVersions.docs) === null || _b === void 0 ? void 0 : _b.length) <= 1) {
        statusToRender = t('published');
    }
    const performAction = useCallback(async (action) => {
        let url;
        let method;
        let body;
        setProcessing(true);
        if (action === 'unpublish') {
            body = {
                _status: 'draft',
            };
        }
        if (action === 'revert') {
            body = publishedDoc;
        }
        if (collection) {
            url = `${serverURL}${api}/${collection.slug}/${id}?depth=0&locale=${locale}&fallback-locale=null`;
            method = 'patch';
        }
        if (global) {
            url = `${serverURL}${api}/globals/${global.slug}?depth=0&locale=${locale}&fallback-locale=null`;
            method = 'post';
        }
        const res = await requests[method](url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': i18n.language,
            },
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
            let data;
            let fields;
            const json = await res.json();
            if (global) {
                data = json.result;
                fields = global.fields;
            }
            if (collection) {
                data = json.doc;
                fields = collection.fields;
            }
            resetForm(fields, data);
            toast.success(json.message);
            getVersions();
        }
        else {
            toast.error(t('error:unPublishingDocument'));
        }
        setProcessing(false);
        if (action === 'revert') {
            toggleModal(revertModalSlug);
        }
        if (action === 'unpublish') {
            toggleModal(unPublishModalSlug);
        }
    }, [collection, global, publishedDoc, serverURL, api, id, i18n, locale, resetForm, getVersions, t, toggleModal, revertModalSlug, unPublishModalSlug]);
    if (statusToRender) {
        return (React.createElement("div", { className: baseClass },
            React.createElement("div", { className: `${baseClass}__value-wrap` },
                React.createElement("span", { className: `${baseClass}__value` }, statusToRender),
                statusToRender === 'Published' && (React.createElement(React.Fragment, null,
                    "\u00A0\u2014\u00A0",
                    React.createElement(Button, { onClick: () => toggleModal(unPublishModalSlug), className: `${baseClass}__action`, buttonStyle: "none" }, t('unpublish')),
                    React.createElement(Modal, { slug: unPublishModalSlug, className: `${baseClass}__modal` },
                        React.createElement(MinimalTemplate, { className: `${baseClass}__modal-template` },
                            React.createElement("h1", null, t('confirmUnpublish')),
                            React.createElement("p", null, t('aboutToUnpublish')),
                            React.createElement(Button, { buttonStyle: "secondary", type: "button", onClick: processing ? undefined : () => toggleModal(unPublishModalSlug) }, t('general:cancel')),
                            React.createElement(Button, { onClick: processing ? undefined : () => performAction('unpublish') }, t(processing ? 'unpublishing' : 'general:confirm')))))),
                statusToRender === 'Changed' && (React.createElement(React.Fragment, null,
                    "\u00A0\u2014\u00A0",
                    React.createElement(Button, { onClick: () => toggleModal(revertModalSlug), className: `${baseClass}__action`, buttonStyle: "none" }, t('revertToPublished')),
                    React.createElement(Modal, { slug: revertModalSlug, className: `${baseClass}__modal` },
                        React.createElement(MinimalTemplate, { className: `${baseClass}__modal-template` },
                            React.createElement("h1", null, t('confirmRevertToSaved')),
                            React.createElement("p", null, t('aboutToRevertToPublished')),
                            React.createElement(Button, { buttonStyle: "secondary", type: "button", onClick: processing ? undefined : () => toggleModal(revertModalSlug) }, t('general:published')),
                            React.createElement(Button, { onClick: processing ? undefined : () => performAction('revert') }, t(processing ? 'reverting' : 'general:confirm')))))))));
    }
    return null;
};
export default Status;
