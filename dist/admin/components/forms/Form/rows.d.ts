import { Fields } from './types';
declare type Result = {
    remainingFields: Fields;
    rows: Fields[];
};
export declare const separateRows: (path: string, fields: Fields) => Result;
export declare const flattenRows: (path: string, rows: Fields[]) => Fields;
export {};
