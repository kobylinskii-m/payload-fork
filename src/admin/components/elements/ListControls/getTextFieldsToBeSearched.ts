import {
  Field,
  FieldAffectingData,
  fieldAffectsData,
  TextField,
} from "../../../../fields/config/types";
import flattenFields from "../../../../utilities/flattenFieldsForSearch";

export const getTextFieldsToBeSearched =
  (listSearchableFields: string[], fields: Field[]) =>
  (): FieldAffectingData[] => {
    if (listSearchableFields) {
      const flattenedFields = flattenFields(fields);
      return flattenedFields.filter(
        (field) =>
          fieldAffectsData(field) && listSearchableFields.includes(field.name)
      ) as FieldAffectingData[];
    }

    return null;
  };
