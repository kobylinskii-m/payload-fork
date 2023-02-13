import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocused, useSelected } from 'slate-react';
import usePayloadAPI from '../../../../../../../hooks/usePayloadAPI';
import RelationshipIcon from '../../../../../../icons/Relationship';
import { useConfig } from '../../../../../../utilities/Config';
import { handlerAsTitle } from '../../../../../../../../utilities/formatLabels';
import './index.scss';
const baseClass = 'rich-text-relationship';
const initialParams = {
    depth: 0,
};
const Element = (props) => {
    var _a;
    const { attributes, children, element } = props;
    const { relationTo, value } = element;
    const { collections, serverURL, routes: { api } } = useConfig();
    const [relatedCollection] = useState(() => collections.find((coll) => coll.slug === relationTo));
    const selected = useSelected();
    const focused = useFocused();
    const { t } = useTranslation('fields');
    const [{ data }] = usePayloadAPI(`${serverURL}${api}/${relatedCollection.slug}/${value === null || value === void 0 ? void 0 : value.id}`, { initialParams });
    return (React.createElement("div", { className: [
            baseClass,
            (selected && focused) && `${baseClass}--selected`,
        ].filter(Boolean).join(' '), contentEditable: false, ...attributes },
        React.createElement(RelationshipIcon, null),
        React.createElement("div", { className: `${baseClass}__wrap` },
            React.createElement("div", { className: `${baseClass}__label` }, t('labelRelationship', { label: relatedCollection.labels.singular })),
            React.createElement("h5", null, handlerAsTitle(data, ((_a = relatedCollection === null || relatedCollection === void 0 ? void 0 : relatedCollection.admin) === null || _a === void 0 ? void 0 : _a.useAsTitle) || 'id'))),
        children));
};
export default Element;
