import { TypeWithID } from '../../config/types';
import { PayloadRequest } from '../../../express/types';
import { Document } from '../../../types';
import findByID from '../findByID';
import { Payload } from '../../..';
import { getDataLoader } from '../../dataloader';
import i18n from '../../../translations/init';

export type Options = {
  collection: string
  id: string
  depth?: number
  currentDepth?: number
  locale?: string
  fallbackLocale?: string
  user?: Document
  overrideAccess?: boolean
  showHiddenFields?: boolean
  disableErrors?: boolean
  req?: PayloadRequest
  draft?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function findByIDLocal<T extends TypeWithID = any>(payload: Payload, options: Options): Promise<T> {
  const {
    collection: collectionSlug,
    depth,
    currentDepth,
    id,
    locale,
    fallbackLocale,
    user,
    overrideAccess = true,
    disableErrors = false,
    showHiddenFields,
    req = {} as PayloadRequest,
    draft = false,
  } = options;

  const collection = payload.collections[collectionSlug];

  req.payloadAPI = 'local';
  req.locale = locale || req?.locale || (payload?.config?.localization ? payload?.config?.localization?.defaultLocale : null);
  req.fallbackLocale = fallbackLocale || req?.fallbackLocale || null;
  req.i18n = i18n(payload.config.i18n);
  req.payload = payload;

  if (typeof user !== 'undefined') req.user = user;

  if (!req.t) req.t = req.i18n.t;
  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req);

  return findByID({
    depth,
    currentDepth,
    id,
    collection,
    overrideAccess,
    disableErrors,
    showHiddenFields,
    req,
    draft,
  });
}
