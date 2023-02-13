import i18n from 'i18next';
import { SanitizedCollectionConfig } from '../../../../../collections/config/types';
import { RelationshipField } from '../../../../../fields/config/types';
import { Where } from '../../../../../types';
export declare type Props = Omit<RelationshipField, 'type'> & {
    path?: string;
};
export declare type Option = {
    label: string;
    value: string | number;
    relationTo?: string;
    options?: Option[];
};
export declare type OptionGroup = {
    label: string;
    options: Option[];
};
export declare type Value = {
    relationTo: string;
    value: string | number;
} | string | number;
declare type CLEAR = {
    type: 'CLEAR';
};
declare type ADD = {
    type: 'ADD';
    docs: any[];
    collection: SanitizedCollectionConfig;
    sort?: boolean;
    ids?: unknown[];
    i18n: typeof i18n;
};
export declare type Action = CLEAR | ADD;
export declare type ValueWithRelation = {
    relationTo: string;
    value: string;
};
export declare type GetResults = (args: {
    lastFullyLoadedRelation?: number;
    lastLoadedPage?: number;
    search?: string;
    value?: unknown;
    sort?: boolean;
    onSuccess?: () => void;
}) => Promise<void>;
export declare type FilterOptionsResult = {
    [relation: string]: Where;
};
export {};
