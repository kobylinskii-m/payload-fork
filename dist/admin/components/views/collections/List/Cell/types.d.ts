import { SanitizedCollectionConfig } from "../../../../../../collections/config/types";
import { Field } from "../../../../../../fields/config/types";
export declare type Props = {
  field: Field;
  colIndex: number;
  collection: SanitizedCollectionConfig;
  cellData: unknown;
  rowData: {
    [path: string]: unknown;
  };
};
