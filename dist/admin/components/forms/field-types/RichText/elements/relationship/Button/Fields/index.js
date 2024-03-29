import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../../../../utilities/Config';
import { useAuth } from '../../../../../../../utilities/Auth';
import { useFormFields } from '../../../../../../Form/context';
import Relationship from '../../../../../Relationship';
import Select from '../../../../../Select';
const createOptions = (collections, permissions) => collections.reduce((options, collection) => {
    var _a, _b, _c, _d;
    if (((_c = (_b = (_a = permissions === null || permissions === void 0 ? void 0 : permissions.collections) === null || _a === void 0 ? void 0 : _a[collection.slug]) === null || _b === void 0 ? void 0 : _b.read) === null || _c === void 0 ? void 0 : _c.permission) && ((_d = collection === null || collection === void 0 ? void 0 : collection.admin) === null || _d === void 0 ? void 0 : _d.enableRichTextRelationship)) {
        return [
            ...options,
            {
                label: collection.labels.plural,
                value: collection.slug,
            },
        ];
    }
    return options;
}, []);
const RelationshipFields = () => {
    const { collections } = useConfig();
    const { permissions } = useAuth();
    const { t } = useTranslation('fields');
    const [options, setOptions] = useState(() => createOptions(collections, permissions));
    const relationTo = useFormFields(([fields]) => { var _a; return (_a = fields.relationTo) === null || _a === void 0 ? void 0 : _a.value; });
    useEffect(() => {
        setOptions(createOptions(collections, permissions));
    }, [collections, permissions]);
    return (React.createElement(Fragment, null,
        React.createElement(Select, { required: true, label: t('relationTo'), name: "relationTo", options: options }),
        relationTo && (React.createElement(Relationship, { label: t('relatedDocument'), name: "value", relationTo: relationTo, required: true }))));
};
export default RelationshipFields;
