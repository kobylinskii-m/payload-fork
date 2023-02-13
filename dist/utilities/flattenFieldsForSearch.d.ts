import { Field, FieldAffectingData, FieldPresentationalOnly } from "../fields/config/types";
declare const flattenFields: (fields: Field[], path?: string[], keepPresentationalFields?: boolean) => (FieldAffectingData | FieldPresentationalOnly)[];
export default flattenFields;
