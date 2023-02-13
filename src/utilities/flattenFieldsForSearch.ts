import {
  Field,
  FieldAffectingData,
  fieldAffectsData,
  FieldBase,
  fieldIsPresentationalOnly,
  FieldPresentationalOnly,
  FieldWithSubFields,
  SearchableField,
  tabHasName,
} from "../fields/config/types";

function fieldHasSubFields(
  field: SearchableField
): field is FieldWithSubFields {
  return (
    field.type === "group" ||
    field.type === "array" ||
    field.type === "row" ||
    field.type === "collapsible" ||
    (field.type === "relationship" && typeof field.fields !== "undefined")
  );
}

const flattenFields = (
  fields: Field[],
  path: string[] = [],
  keepPresentationalFields?: boolean
): (FieldAffectingData | FieldPresentationalOnly)[] => {
  return fields.reduce((fieldsToUse, field) => {
    if (fieldHasSubFields(field)) {
      const _path = [...path];
      if (field.type !== "row") _path.push((field as FieldBase).name);

      return [
        ...fieldsToUse,
        ...flattenFields(field.fields, _path, keepPresentationalFields),
      ];
    }

    if (
      fieldAffectsData(field) ||
      (keepPresentationalFields && fieldIsPresentationalOnly(field))
    ) {
      return [
        ...fieldsToUse,
        { ...field, name: [...path, field.name].join(".") },
      ];
    }

    if (field.type === "tabs") {
      return [
        ...fieldsToUse,
        ...field.tabs.reduce((tabFields, tab) => {
          return [
            ...tabFields,
            ...(tabHasName(tab)
              ? [{ ...tab, type: "tab" }]
              : flattenFields(tab.fields, path, keepPresentationalFields)),
          ];
        }, []),
      ];
    }

    return fieldsToUse;
  }, []);
};

export default flattenFields;
