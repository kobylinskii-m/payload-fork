import React, { useEffect, useState } from 'react';
import { useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import Button from '../../../elements/Button';
import Label from '../../Label';
import Error from '../../Error';
import FileDetails from '../../../elements/FileDetails';
import FieldDescription from '../../FieldDescription';
import AddModal from './Add';
import SelectExistingModal from './SelectExisting';
import { useEditDepth, EditDepthContext } from '../../../utilities/EditDepth';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const baseClass = 'upload';
const UploadInput = (props) => {
    const { path, required, readOnly, style, className, width, description, label, relationTo, fieldTypes, value, onChange, showError, serverURL = 'http://localhost:3000', api = '/api', collection, errorMessage, filterOptions, } = props;
    const { toggleModal, modalState } = useModal();
    const { t, i18n } = useTranslation('fields');
    const editDepth = useEditDepth();
    const addModalSlug = `${path}-add-depth-${editDepth}`;
    const selectExistingModalSlug = `${path}-select-existing-depth-${editDepth}`;
    const [file, setFile] = useState(undefined);
    const [missingFile, setMissingFile] = useState(false);
    const [modalToRender, setModalToRender] = useState();
    const classes = [
        'field-type',
        baseClass,
        className,
        showError && 'error',
        readOnly && 'read-only',
    ].filter(Boolean).join(' ');
    useEffect(() => {
        if (typeof value === 'string' && value !== '') {
            const fetchFile = async () => {
                const response = await fetch(`${serverURL}${api}/${relationTo}/${value}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language,
                    },
                });
                if (response.ok) {
                    const json = await response.json();
                    setFile(json);
                }
                else {
                    setMissingFile(true);
                    setFile(undefined);
                }
            };
            fetchFile();
        }
        else {
            setFile(undefined);
        }
    }, [
        value,
        relationTo,
        api,
        serverURL,
        i18n,
    ]);
    useEffect(() => {
        var _a, _b;
        if (!((_a = modalState[addModalSlug]) === null || _a === void 0 ? void 0 : _a.isOpen) && !((_b = modalState[selectExistingModalSlug]) === null || _b === void 0 ? void 0 : _b.isOpen)) {
            setModalToRender(undefined);
        }
    }, [modalState, addModalSlug, selectExistingModalSlug]);
    return (React.createElement("div", { className: classes, style: {
            ...style,
            width,
        } },
        React.createElement(Error, { showError: showError, message: errorMessage }),
        React.createElement(Label, { htmlFor: `field-${path.replace(/\./gi, '__')}`, label: label, required: required }),
        (collection === null || collection === void 0 ? void 0 : collection.upload) && (React.createElement(React.Fragment, null,
            (file && !missingFile) && (React.createElement(FileDetails, { collection: collection, doc: file, handleRemove: () => {
                    onChange(null);
                } })),
            (!file || missingFile) && (React.createElement("div", { className: `${baseClass}__wrap` },
                React.createElement(Button, { buttonStyle: "secondary", onClick: () => {
                        toggleModal(addModalSlug);
                        setModalToRender(addModalSlug);
                    } }, t('uploadNewLabel', { label: getTranslation(collection.labels.singular, i18n) })),
                React.createElement(Button, { buttonStyle: "secondary", onClick: () => {
                        toggleModal(selectExistingModalSlug);
                        setModalToRender(selectExistingModalSlug);
                    } }, t('chooseFromExisting')))),
            React.createElement(EditDepthContext.Provider, { value: editDepth + 1 },
                modalToRender === addModalSlug && (React.createElement(AddModal, { ...{
                        collection,
                        slug: addModalSlug,
                        fieldTypes,
                        setValue: (e) => {
                            setMissingFile(false);
                            onChange(e);
                        },
                    } })),
                modalToRender === selectExistingModalSlug && (React.createElement(SelectExistingModal, { ...{
                        collection,
                        slug: selectExistingModalSlug,
                        setValue: onChange,
                        addModalSlug,
                        filterOptions,
                        path,
                    } }))),
            React.createElement(FieldDescription, { value: file, description: description })))));
};
export default UploadInput;
