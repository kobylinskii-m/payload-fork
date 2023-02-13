import { Payload } from '..';
import { Collection, TypeWithID } from '../collections/config/types';
declare type Args = {
    payload: Payload;
    collection: Collection;
    query: Record<string, unknown>;
    id: string | number;
    lean?: boolean;
};
export declare const getLatestCollectionVersion: <T extends TypeWithID = any>({ payload, collection: { config, Model, }, query, id, lean, }: Args) => Promise<T>;
export {};
