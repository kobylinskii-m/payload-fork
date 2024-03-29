import React, { useCallback, useEffect, useState } from 'react';
import { useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import Button from '../../../../elements/Button';
import Popup from '../../../../elements/Popup';
import { useRelatedCollections } from './useRelatedCollections';
import { useAuth } from '../../../../utilities/Auth';
import { AddNewRelationModal } from './Modal';
import { useEditDepth } from '../../../../utilities/EditDepth';
import Plus from '../../../../icons/Plus';
import { getTranslation } from '../../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'relationship-add-new';
export const AddNewRelation = ({ path, hasMany, relationTo, value, setValue, dispatchOptions }) => {
    const relatedCollections = useRelatedCollections(relationTo);
    const { toggleModal, isModalOpen } = useModal();
    const { permissions } = useAuth();
    const [hasPermission, setHasPermission] = useState(false);
    const [modalCollection, setModalCollection] = useState();
    const [popupOpen, setPopupOpen] = useState(false);
    const editDepth = useEditDepth();
    const { t, i18n } = useTranslation('fields');
    const modalSlug = `${path}-add-modal-depth-${editDepth}`;
    const openModal = useCallback(async (collection) => {
        setModalCollection(collection);
        toggleModal(modalSlug);
    }, [toggleModal, modalSlug]);
    const onSave = useCallback((json) => {
        const newValue = Array.isArray(relationTo) ? {
            relationTo: modalCollection.slug,
            value: json.doc.id,
        } : json.doc.id;
        dispatchOptions({
            type: 'ADD',
            collection: modalCollection,
            docs: [
                json.doc,
            ],
            sort: true,
            i18n,
        });
        if (hasMany) {
            setValue([...(Array.isArray(value) ? value : []), newValue]);
        }
        else {
            setValue(newValue);
        }
        setModalCollection(undefined);
        toggleModal(modalSlug);
    }, [relationTo, modalCollection, dispatchOptions, i18n, hasMany, toggleModal, modalSlug, setValue, value]);
    const onPopopToggle = useCallback((state) => {
        setPopupOpen(state);
    }, []);
    useEffect(() => {
        if (permissions) {
            if (relatedCollections.length === 1) {
                setHasPermission(permissions.collections[relatedCollections[0].slug].create.permission);
            }
            else {
                setHasPermission(relatedCollections.some((collection) => permissions.collections[collection.slug].create.permission));
            }
        }
    }, [permissions, relatedCollections]);
    useEffect(() => {
        if (!isModalOpen(modalSlug)) {
            setModalCollection(undefined);
        }
    }, [isModalOpen, modalSlug]);
    return hasPermission ? (React.createElement("div", { className: baseClass, id: `${path}-add-new` },
        relatedCollections.length === 1 && (React.createElement(Button, { className: `${baseClass}__add-button`, onClick: () => openModal(relatedCollections[0]), buttonStyle: "none", tooltip: t('addNewLabel', { label: relatedCollections[0].labels.singular }) },
            React.createElement(Plus, null))),
        relatedCollections.length > 1 && (React.createElement(Popup, { buttonType: "custom", horizontalAlign: "center", onToggleOpen: onPopopToggle, button: (React.createElement(Button, { className: `${baseClass}__add-button`, buttonStyle: "none", tooltip: popupOpen ? undefined : t('addNew') },
                React.createElement(Plus, null))), render: ({ close: closePopup }) => (React.createElement("ul", { className: `${baseClass}__relations` }, relatedCollections.map((relatedCollection) => {
                if (permissions.collections[relatedCollection.slug].create.permission) {
                    return (React.createElement("li", { key: relatedCollection.slug },
                        React.createElement("button", { className: `${baseClass}__relation-button ${baseClass}__relation-button--${relatedCollection.slug}`, type: "button", onClick: () => { closePopup(); openModal(relatedCollection); } }, getTranslation(relatedCollection.labels.singular, i18n))));
                }
                return null;
            }))) })),
        modalCollection && (React.createElement(AddNewRelationModal, { ...{ onSave, modalSlug, modalCollection } })))) : null;
};
