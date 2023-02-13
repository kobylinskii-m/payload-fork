import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../../../../../utilities/getTranslation';
import useIntersect from '../../../../../../../hooks/useIntersect';
import { useConfig } from '../../../../../../utilities/Config';
import { useListRelationships } from '../../../RelationshipProvider';
import { handlerAsTitle } from '../../../../../../../../utilities/formatLabels';
import './index.scss';
const baseClass = 'relationship-cell';
const totalToShow = 3;
const RelationshipCell = (props) => {
    var _a;
    const { field, data: cellData } = props;
    const { collections, routes } = useConfig();
    const [intersectionRef, entry] = useIntersect();
    const [values, setValues] = useState([]);
    const { getRelationships, documents } = useListRelationships();
    const [hasRequested, setHasRequested] = useState(false);
    const { t, i18n } = useTranslation('general');
    const isAboveViewport = ((_a = entry === null || entry === void 0 ? void 0 : entry.boundingClientRect) === null || _a === void 0 ? void 0 : _a.top) < window.innerHeight;
    useEffect(() => {
        if (cellData && isAboveViewport && !hasRequested) {
            const formattedValues = [];
            const arrayCellData = Array.isArray(cellData) ? cellData : [cellData];
            arrayCellData.slice(0, (arrayCellData.length < totalToShow ? arrayCellData.length : totalToShow)).forEach((cell) => {
                if (typeof cell === 'object' && 'relationTo' in cell && 'value' in cell) {
                    formattedValues.push(cell);
                }
                if ((typeof cell === 'number' || typeof cell === 'string') && typeof field.relationTo === 'string') {
                    formattedValues.push({
                        value: cell,
                        relationTo: field.relationTo,
                    });
                }
            });
            getRelationships(formattedValues);
            setHasRequested(true);
            setValues(formattedValues);
        }
    }, [cellData, field, collections, isAboveViewport, routes.api, hasRequested, getRelationships]);
    return (React.createElement("div", { className: baseClass, ref: intersectionRef },
        values.map(({ relationTo, value }, i) => {
            const document = documents[relationTo][value];
            const relatedCollection = collections.find(({ slug }) => slug === relationTo);
            return (React.createElement(React.Fragment, { key: i },
                document === false && `${t('untitled')} - ID: ${value}`,
                document === null && t('loading'),
                document && (handlerAsTitle(document, relatedCollection.admin.useAsTitle) || `${t('untitled')} - ID: ${value}`),
                values.length > i + 1 && ', '));
        }),
        Array.isArray(cellData) && cellData.length > totalToShow
            && t('fields:itemsAndMore', { items: '', count: cellData.length - totalToShow }),
        values.length === 0 && t('noLabel', { label: getTranslation(field.label, i18n) })));
};
export default RelationshipCell;
