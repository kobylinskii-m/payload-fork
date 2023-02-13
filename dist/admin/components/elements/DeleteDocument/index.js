import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Modal, useModal } from '@faceless-ui/modal';
import { Trans, useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import Button from '../Button';
import MinimalTemplate from '../../templates/Minimal';
import { useForm } from '../../forms/Form/context';
import useTitle from '../../../hooks/useTitle';
import { requests } from '../../../api';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'delete-document';
const DeleteDocument = (props) => {
    const { title: titleFromProps, id, buttonId, collection: { admin: { useAsTitle, }, slug, labels: { singular, } = {}, } = {}, } = props;
    const { serverURL, routes: { api, admin } } = useConfig();
    const { setModified } = useForm();
    const [deleting, setDeleting] = useState(false);
    const { toggleModal } = useModal();
    const history = useHistory();
    const { t, i18n } = useTranslation('general');
    const title = useTitle(useAsTitle) || id;
    const titleToRender = titleFromProps || title;
    const modalSlug = `delete-${id}`;
    const addDefaultError = useCallback(() => {
        toast.error(t('error:deletingError', { title }));
    }, [t, title]);
    const handleDelete = useCallback(() => {
        setDeleting(true);
        setModified(false);
        requests.delete(`${serverURL}${api}/${slug}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': i18n.language,
            },
        }).then(async (res) => {
            try {
                const json = await res.json();
                if (res.status < 400) {
                    toggleModal(modalSlug);
                    toast.success(t('titleDeleted', { label: getTranslation(singular, i18n), title }));
                    return history.push(`${admin}/collections/${slug}`);
                }
                toggleModal(modalSlug);
                if (json.errors) {
                    json.errors.forEach((error) => toast.error(error.message));
                }
                else {
                    addDefaultError();
                }
                return false;
            }
            catch (e) {
                return addDefaultError();
            }
        });
    }, [setModified, serverURL, api, slug, id, toggleModal, modalSlug, t, singular, i18n, title, history, admin, addDefaultError]);
    if (id) {
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { type: "button", id: buttonId, className: `${baseClass}__toggle`, onClick: (e) => {
                    e.preventDefault();
                    setDeleting(false);
                    toggleModal(modalSlug);
                } }, t('delete')),
            React.createElement(Modal, { slug: modalSlug, className: baseClass },
                React.createElement(MinimalTemplate, { className: `${baseClass}__template` },
                    React.createElement("h1", null, t('confirmDeletion')),
                    React.createElement("p", null,
                        React.createElement(Trans, { i18nKey: "aboutToDelete", values: { label: singular, title: titleToRender }, t: t },
                            "aboutToDelete",
                            React.createElement("strong", null, titleToRender))),
                    React.createElement(Button, { id: "confirm-cancel", buttonStyle: "secondary", type: "button", onClick: deleting ? undefined : () => toggleModal(modalSlug) }, t('cancel')),
                    React.createElement(Button, { onClick: deleting ? undefined : handleDelete, id: "confirm-delete" }, deleting ? t('deleting') : t('confirm'))))));
    }
    return null;
};
export default DeleteDocument;
