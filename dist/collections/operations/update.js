"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const errors_1 = require("../../errors");
const types_1 = require("../../auth/types");
const saveCollectionDraft_1 = require("../../versions/drafts/saveCollectionDraft");
const saveCollectionVersion_1 = require("../../versions/saveCollectionVersion");
const uploadFiles_1 = require("../../uploads/uploadFiles");
const cleanUpFailedVersion_1 = __importDefault(require("../../versions/cleanUpFailedVersion"));
const ensurePublishedCollectionVersion_1 = require("../../versions/ensurePublishedCollectionVersion");
const beforeChange_1 = require("../../fields/hooks/beforeChange");
const beforeValidate_1 = require("../../fields/hooks/beforeValidate");
const afterChange_1 = require("../../fields/hooks/afterChange");
const afterRead_1 = require("../../fields/hooks/afterRead");
const generateFileData_1 = require("../../uploads/generateFileData");
const getLatestCollectionVersion_1 = require("../../versions/getLatestCollectionVersion");
async function update(incomingArgs) {
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
    const { depth, collection, collection: { Model, config: collectionConfig, }, id, req, req: { t, locale, payload, payload: { config, }, }, overrideAccess, showHiddenFields, overwriteExistingFiles = false, draft: draftArg = false, autosave = false, } = args;
    if (!id) {
        throw new errors_1.APIError('Missing ID of document to update.', http_status_1.default.BAD_REQUEST);
    }
    let { data } = args;
    const { password } = data;
    const shouldSaveDraft = Boolean(draftArg && collectionConfig.versions.drafts);
    const shouldSavePassword = Boolean(password && collectionConfig.auth && !shouldSaveDraft);
    const lean = !shouldSavePassword;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResults = !overrideAccess ? await (0, executeAccess_1.default)({ req, id, data }, collectionConfig.access.update) : true;
    const hasWherePolicy = (0, types_1.hasWhereAccessResult)(accessResults);
    // /////////////////////////////////////
    // Retrieve document
    // /////////////////////////////////////
    const queryToBuild = {
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
    if ((0, types_1.hasWhereAccessResult)(accessResults)) {
        queryToBuild.where.and.push(accessResults);
    }
    const query = await Model.buildQuery(queryToBuild, locale);
    const doc = await (0, getLatestCollectionVersion_1.getLatestCollectionVersion)({ payload, collection, id, query, lean });
    if (!doc && !hasWherePolicy)
        throw new errors_1.NotFound(t);
    if (!doc && hasWherePolicy)
        throw new errors_1.Forbidden(t);
    let docWithLocales = JSON.stringify(lean ? doc : doc.toJSON({ virtuals: true }));
    docWithLocales = JSON.parse(docWithLocales);
    const originalDoc = await (0, afterRead_1.afterRead)({
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
    const { data: newFileData, files: filesToUpload } = await (0, generateFileData_1.generateFileData)({
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
    data = await (0, beforeValidate_1.beforeValidate)({
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
        await (0, uploadFiles_1.uploadFiles)(payload, filesToUpload, t);
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
    let result = await (0, beforeChange_1.beforeChange)({
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
        await doc.setPassword(password);
        await doc.save();
        delete data.password;
        delete result.password;
    }
    // /////////////////////////////////////
    // Create version from existing doc
    // /////////////////////////////////////
    let createdVersion;
    if (collectionConfig.versions && !shouldSaveDraft) {
        createdVersion = await (0, saveCollectionVersion_1.saveCollectionVersion)({
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
        await (0, ensurePublishedCollectionVersion_1.ensurePublishedCollectionVersion)({
            payload,
            config: collectionConfig,
            req,
            docWithLocales,
            id,
        });
        result = await (0, saveCollectionDraft_1.saveCollectionDraft)({
            payload,
            config: collectionConfig,
            req,
            data: result,
            id,
            autosave,
        });
    }
    else {
        try {
            result = await Model.findByIdAndUpdate({ _id: id }, result, { new: true });
        }
        catch (error) {
            (0, cleanUpFailedVersion_1.default)({
                payload,
                entityConfig: collectionConfig,
                version: createdVersion,
            });
            // Handle uniqueness error from MongoDB
            throw error.code === 11000 && error.keyValue
                ? new errors_1.ValidationError([{ message: 'Value must be unique', field: Object.keys(error.keyValue)[0] }], t)
                : error;
        }
        const resultString = JSON.stringify(result);
        result = JSON.parse(resultString);
        // custom id type reset
        result.id = result._id;
    }
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = await (0, afterRead_1.afterRead)({
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
    result = await (0, afterChange_1.afterChange)({
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
exports.default = update;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvdXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBR3JDLG9HQUE0RTtBQUM1RSw2RUFBcUQ7QUFDckQseUNBQThFO0FBRTlFLDRDQUF3RDtBQUN4RCxtRkFBZ0Y7QUFDaEYsZ0ZBQTZFO0FBQzdFLDJEQUF3RDtBQUN4RCwrRkFBdUU7QUFDdkUsc0dBQW1HO0FBQ25HLGtFQUErRDtBQUMvRCxzRUFBbUU7QUFDbkUsZ0VBQTZEO0FBQzdELDREQUF5RDtBQUN6RCxxRUFBa0U7QUFDbEUsMEZBQXVGO0FBZ0J2RixLQUFLLFVBQVUsTUFBTSxDQUFDLFlBQXVCO0lBQzNDLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQztJQUV4Qix3Q0FBd0M7SUFDeEMsK0JBQStCO0lBQy9CLHdDQUF3QztJQUV4QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDbEYsTUFBTSxTQUFTLENBQUM7UUFFaEIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDakIsSUFBSTtZQUNKLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNkLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV0QixNQUFNLEVBQ0osS0FBSyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQUUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUFFLGdCQUFnQixHQUN6QixFQUNELEVBQUUsRUFDRixHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixPQUFPLEVBQ1AsT0FBTyxFQUFFLEVBQ1AsTUFBTSxHQUNQLEdBQ0Ys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