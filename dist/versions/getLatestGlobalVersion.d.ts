import { Payload } from '..';
import { TypeWithID } from '../collections/config/types';
import { SanitizedGlobalConfig } from '../globals/config/types';
declare type Args = {
    payload: Payload;
    config: SanitizedGlobalConfig;
    query: Record<string, unknown>;
};
export declare const getLatestGlobalVersion: <T extends TypeWithID = any>({ payload, config, query, }: Args) => Promise<T>;
export {};
