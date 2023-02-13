import type { TFunction } from 'react-i18next';
import { SanitizedCollectionConfig } from '../../../../../collections/config/types';
import { Column } from '../../../elements/Table/types';
declare const buildColumns: (collection: SanitizedCollectionConfig, columns: string[], t: TFunction) => Column[];
export default buildColumns;
