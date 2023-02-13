import { CollectionConfig } from "../collections/config/types";
import { Field } from "../fields/config/types";

export default function appendFields(
  collections: CollectionConfig[],
  fields: Field[]
) {
  return fields.map((field) => {
    if (field.type !== "relationship") {
      return field;
    }

    const relative_collection = collections.find(
      (col) => col.slug === field.relationTo
    );
    if (!relative_collection) {
      return field;
    }

    return { ...field, fields: relative_collection.fields };
  });
}
