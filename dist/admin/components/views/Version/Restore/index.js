import React, { Fragment, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, useModal } from '@faceless-ui/modal';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../utilities/Config';
import { Button, MinimalTemplate, Pill } from '../../..';
import { requests } from '../../../../api';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'restore-version';
const modalSlug = 'restore-version';
const Restore = ({ collection, global, className, versionID, originalDocID, versionDate }) => {
    const { serverURL, routes: { api, admin } } = useConfig();
    const history = useHistory();
    const { toggleModal } = useModal();
    const [processing, setProcessing] = useState(false);
    const { t, i18n } = useTranslation('version');
    let fetchURL = `${serverURL}${api}`;
    let redirectURL;
    let restoreMessage;
    if (collection) {
        fetchURL = `${fetchURL}/${collection.slug}/versions/${versionID}`;
        redirectURL = `${admin}/collections/${collection.slug}/${originalDocID}`;
        restoreMessage = t('aboutToRestore', { label: getTranslation(collection.labels.singular, i18n), versionDate });
    }
    if (global) {
        fetchURL = `${fetchURL}/globals/${global.slug}/versions/${versionID}`;
        redirectURL = `${admin}/globals/${global.slug}`;
        restoreMessage = t('aboutToRestoreGlobal', { label: getTranslation(global.label, i18n), versionDate });
    }
    const handleRestore = useCallback(async () => {
        setProcessing(true);
        const res = await requests.post(fetchURL, {
            headers: {
                'Accept-Language': i18n.language,
            },
        });
        if (res.status === 200) {
            const json = await res.json();
            toast.success(json.message);
            history.push(redirectURL);
        }
        else {
            toast.error(t('problemRestoringVersion'));
        }
    }, [fetchURL, history, redirectURL, t, i18n]);
    return (React.createElement(Fragment, null,
        React.createElement(Pill, { onClick: () => toggleModal(modalSlug), className: [baseClass, className].filter(Boolean).join(' ') }, t('restoreThisVersion')),
        React.createElement(Modal, { slug: modalSlug, className: `${baseClass}__modal` },
            React.createElement(MinimalTemplate, { className: `${baseClass}__modal-template` },
                React.createElement("h1", null, t('confirmVersionRestoration')),
                React.createElement("p", null, restoreMessage),
                React.createElement(Button, { buttonStyle: "secondary", type: "button", onClick: processing ? undefined : () => toggleModal(modalSlug) }, t('general:cancel')),
                React.createElement(Button, { onClick: processing ? undefined : handleRestore }, processing ? t('restoring') : t('general:confirm'))))));
};
export default Restore;
