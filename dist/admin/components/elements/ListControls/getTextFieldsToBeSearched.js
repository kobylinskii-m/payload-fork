import { fieldAffectsData, } from "../../../../fields/config/types";
import flattenFields from "../../../../utilities/flattenFieldsForSearch";
export const getTextFieldsToBeSearched = (listSearchableFields, fields) => () => {
    if (listSearchableFields) {
        const flattenedFields = flattenFields(fields);
        return flattenedFields.filter((field) => fieldAffectsData(field) && listSearchableFields.includes(field.name));
    }
    return null;
};
