import type { TFunction } from 'react-i18next';
import { Column } from '../../elements/Table/types';
import { SanitizedCollectionConfig } from '../../../../collections/config/types';
import { SanitizedGlobalConfig } from '../../../../globals/config/types';
export declare const getColumns: (collection: SanitizedCollectionConfig, global: SanitizedGlobalConfig, t: TFunction) => Column[];
