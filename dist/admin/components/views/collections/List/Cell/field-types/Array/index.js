import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../../../../../utilities/getTranslation';
const ArrayCell = ({ data, field }) => {
    var _a;
    const { t, i18n } = useTranslation('general');
    const arrayFields = data !== null && data !== void 0 ? data : [];
    const label = `${arrayFields.length} ${getTranslation(((_a = field === null || field === void 0 ? void 0 : field.labels) === null || _a === void 0 ? void 0 : _a.plural) || t('rows'), i18n)}`;
    return (React.createElement("span", null, label));
};
export default ArrayCell;
