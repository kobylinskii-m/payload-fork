import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../../../../../utilities/getTranslation';
const BlocksCell = ({ data, field }) => {
    const { t, i18n } = useTranslation('fields');
    const selectedBlocks = data ? data.map(({ blockType }) => blockType) : [];
    const blockLabels = field.blocks.map((s) => ({ slug: s.slug, label: getTranslation(s.labels.singular, i18n) }));
    let label = `0 ${getTranslation(field.labels.plural, i18n)}`;
    const formatBlockList = (blocks) => blocks.map((b) => {
        var _a;
        const filtered = (_a = blockLabels.filter((f) => f.slug === b)) === null || _a === void 0 ? void 0 : _a[0];
        return filtered === null || filtered === void 0 ? void 0 : filtered.label;
    }).join(', ');
    const itemsToShow = 5;
    if (selectedBlocks.length > itemsToShow) {
        const more = selectedBlocks.length - itemsToShow;
        label = `${selectedBlocks.length} ${getTranslation(field.labels.plural, i18n)} - ${t('fields:itemsAndMore', { items: formatBlockList(selectedBlocks.slice(0, itemsToShow)), count: more })}`;
    }
    else if (selectedBlocks.length > 0) {
        label = `${selectedBlocks.length} ${getTranslation(selectedBlocks.length === 1 ? field.labels.singular : field.labels.plural, i18n)} - ${formatBlockList(selectedBlocks)}`;
    }
    return (React.createElement("span", null, label));
};
export default BlocksCell;
