import httpStatus from 'http-status';
import { Where, Document } from '../../types';
import { Collection } from '../config/types';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields';
import executeAccess from '../../auth/executeAccess';
import { NotFound, Forbidden, APIError, ValidationError } from '../../errors';
import { PayloadRequest } from '../../express/types';
import { hasWhereAccessResult } from '../../auth/types';
import { saveCollectionDraft } from '../../versions/drafts/saveCollectionDraft';
import { saveCollectionVersion } from '../../versions/saveCollectionVersion';
import { uploadFiles } from '../../uploads/uploadFiles';
import cleanUpFailedVersion from '../../versions/cleanUpFailedVersion';
import { ensurePublishedCollectionVersion } from '../../versions/ensurePublishedCollectionVersion';
import { beforeChange } from '../../fields/hooks/beforeChange';
import { beforeValidate } from '../../fields/hooks/beforeValidate';
import { afterChange } from '../../fields/hooks/afterChange';
import { afterRead } from '../../fields/hooks/afterRead';
import { generateFileData } from '../../uploads/generateFileData';
import { getLatestCollectionVersion } from '../../versions/getLatestCollectionVersion';

export type Arguments = {
  collection: Collection
  req: PayloadRequest
  id: string | number
  data: Record<string, unknown>
  depth?: number
  disableVerificationEmail?: boolean
  overrideAccess?: boolean
  showHiddenFields?: boolean
  overwriteExistingFiles?: boolean
  draft?: boolean
  autosave?: boolean
}

async function update(incomingArgs: Arguments): Promise<Document> {
  let args = incomingArgs;

  // /////////////////////////////////////
  // beforeOperation - Collection
  // /////////////////////////////////////

  await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
    await priorHook;

    args = (await hook({
      args,
      operation: 'update',
    })) || args;
  }, Promise.resolve());

  const {
    depth,
    collection,
    collection: {
      Model,
      config: collectionConfig,
    },
    id,
    req,
    req: {
      t,
      locale,
      payload,
      payload: {
        config,
      },
    },
    overrideAccess,
    showHiddenFields,
    overwriteExistingFiles = false,
    draft: draftArg = false,
    autosave = false,
  } = args;

  if (!id) {
    throw new APIError('Missing ID of document to update.', httpStatus.BAD_REQUEST);
  }

  let { data } = args;
  const { password } = data;
  const shouldSaveDraft = Boolean(draftArg && collectionConfig.versions.drafts);
  const shouldSavePassword = Boolean(password && collectionConfig.auth && !shouldSaveDraft);
  const lean = !shouldSavePassword;

  // /////////////////////////////////////
  // Access
  // /////////////////////////////////////

  const accessResults = !overrideAccess ? await executeAccess({ req, id, data }, collectionConfig.access.update) : true;
  const hasWherePolicy = hasWhereAccessResult(accessResults);

  // /////////////////////////////////////
  // Retrieve document
  // /////////////////////////////////////

  const queryToBuild: { where: Where } = {
    where: {
      and: [
        {
          id: {
            equals: id,
          },
        },
      ],
    },
  };

  if (hasWhereAccessResult(accessResults)) {
    (queryToBuild.where.and as Where[]).push(accessResults);
  }

  const query = await Model.buildQuery(queryToBuild, locale);

  const doc = await getLatestCollectionVersion({ payload, collection, id, query, lean });

  if (!doc && !hasWherePolicy) throw new NotFound(t);
  if (!doc && hasWherePolicy) throw new Forbidden(t);

  let docWithLocales: Document = JSON.stringify(lean ? doc : doc.toJSON({ virtuals: true }));
  docWithLocales = JSON.parse(docWithLocales);

  const originalDoc = await afterRead({
    depth: 0,
    doc: docWithLocales,
    entityConfig: collectionConfig,
    req,
    overrideAccess: true,
    showHiddenFields,
  });

  // /////////////////////////////////////
  // Generate data for all files and sizes
  // /////////////////////////////////////

  const { data: newFileData, files: filesToUpload } = await generateFileData({
    config,
    collection,
    req,
    data,
    throwOnMissingFile: false,
    overwriteExistingFiles,
  });

  data = newFileData;

  // /////////////////////////////////////
  // beforeValidate - Fields
  // /////////////////////////////////////

  data = await beforeValidate({
    data,
    doc: originalDoc,
    entityConfig: collectionConfig,
    id,
    operation: 'update',
    overrideAccess,
    req,
  });

  // /////////////////////////////////////
  // beforeValidate - Collection
  // /////////////////////////////////////

  await collectionConfig.hooks.beforeValidate.reduce(async (priorHook, hook) => {
    await priorHook;

    data = (await hook({
      data,
      req,
      operation: 'update',
      originalDoc,
    })) || data;
  }, Promise.resolve());

  // /////////////////////////////////////
  // Write files to local storage
  // /////////////////////////////////////

  if (!collectionConfig.upload.disableLocalStorage) {
    await uploadFiles(payload, filesToUpload, t);
  }

  // /////////////////////////////////////
  // beforeChange - Collection
  // /////////////////////////////////////

  await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook) => {
    await priorHook;

    data = (await hook({
      data,
      req,
      originalDoc,
      operation: 'update',
    })) || data;
  }, Promise.resolve());

  // /////////////////////////////////////
  // beforeChange - Fields
  // /////////////////////////////////////

  let result = await beforeChange({
    data,
    doc: originalDoc,
    docWithLocales,
    entityConfig: collectionConfig,
    id,
    operation: 'update',
    req,
    skipValidation: shouldSaveDraft || data._status === 'draft',
  });

  // /////////////////////////////////////
  // Handle potential password update
  // /////////////////////////////////////

  if (shouldSavePassword) {
    await doc.setPassword(password as string);
    await doc.save();
    delete data.password;
    delete result.password;
  }

  // /////////////////////////////////////
  // Create version from existing doc
  // /////////////////////////////////////

  let createdVersion;

  if (collectionConfig.versions && !shouldSaveDraft) {
    createdVersion = await saveCollectionVersion({
      payload,
      config: collectionConfig,
      req,
      docWithLocales,
      id,
    });
  }

  // /////////////////////////////////////
  // Update
  // /////////////////////////////////////

  if (shouldSaveDraft) {
    await ensurePublishedCollectionVersion({
      payload,
      config: collectionConfig,
      req,
      docWithLocales,
      id,
    });

    result = await saveCollectionDraft({
      payload,
      config: collectionConfig,
      req,
      data: result,
      id,
      autosave,
    });
  } else {
    try {
      result = await Model.findByIdAndUpdate(
        { _id: id },
        result,
        { new: true },
      );
    } catch (error) {
      cleanUpFailedVersion({
        payload,
        entityConfig: collectionConfig,
        version: createdVersion,
      });

      // Handle uniqueness error from MongoDB
      throw error.code === 11000 && error.keyValue
        ? new ValidationError([{ message: 'Value must be unique', field: Object.keys(error.keyValue)[0] }], t)
        : error;
    }

    const resultString = JSON.stringify(result);
    result = JSON.parse(resultString);

    // custom id type reset
    result.id = result._id;
  }

  result = sanitizeInternalFields(result);

  // /////////////////////////////////////
  // afterRead - Fields
  // /////////////////////////////////////

  result = await afterRead({
    depth,
    doc: result,
    entityConfig: collectionConfig,
    req,
    overrideAccess,
    showHiddenFields,
  });

  // /////////////////////////////////////
  // afterRead - Collection
  // /////////////////////////////////////

  await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
    await priorHook;

    result = await hook({
      req,
      doc: result,
    }) || result;
  }, Promise.resolve());

  // /////////////////////////////////////
  // afterChange - Fields
  // /////////////////////////////////////

  result = await afterChange({
    data,
    doc: result,
    previousDoc: originalDoc,
    entityConfig: collectionConfig,
    operation: 'update',
    req,
  });

  // /////////////////////////////////////
  // afterChange - Collection
  // /////////////////////////////////////

  await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook) => {
    await priorHook;

    result = await hook({
      doc: result,
      previousDoc: originalDoc,
      req,
      operation: 'update',
    }) || result;
  }, Promise.resolve());

  // /////////////////////////////////////
  // Return results
  // /////////////////////////////////////

  return result;
}

export default update;
