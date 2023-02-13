import type { TFunction } from 'i18next';
import { FileToSave } from './types';
import { Payload } from '..';
export declare const uploadFiles: (payload: Payload, files: FileToSave[], t: TFunction) => Promise<void>;
