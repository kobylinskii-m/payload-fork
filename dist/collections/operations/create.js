"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const sendVerificationEmail_1 = __importDefault(require("../../auth/sendVerificationEmail"));
const types_1 = require("../../fields/config/types");
const uploadFiles_1 = require("../../uploads/uploadFiles");
const beforeChange_1 = require("../../fields/hooks/beforeChange");
const beforeValidate_1 = require("../../fields/hooks/beforeValidate");
const afterChange_1 = require("../../fields/hooks/afterChange");
const afterRead_1 = require("../../fields/hooks/afterRead");
const generateFileData_1 = require("../../uploads/generateFileData");
async function create(incomingArgs) {
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'create',
        })) || args;
    }, Promise.resolve());
    const { collection, collection: { Model, config: collectionConfig, }, req, req: { payload, payload: { config, emailOptions, }, }, disableVerificationEmail, depth, overrideAccess, showHiddenFields, overwriteExistingFiles = false, draft = false, } = args;
    let { data } = args;
    const shouldSaveDraft = Boolean(draft && collectionConfig.versions.drafts);
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    if (!overrideAccess) {
        await (0, executeAccess_1.default)({ req, data }, collectionConfig.access.create);
    }
    // /////////////////////////////////////
    // Custom id
    // /////////////////////////////////////
    const hasIdField = collectionConfig.fields.findIndex((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id') > -1;
    if (hasIdField) {
        data = {
            _id: data.id,
            ...data,
        };
    }
    // /////////////////////////////////////
    // Generate data for all files and sizes
    // /////////////////////////////////////
    const { data: newFileData, files: filesToUpload } = await (0, generateFileData_1.generateFileData)({
        config,
        collection,
        req,
        data,
        throwOnMissingFile: !shouldSaveDraft,
        overwriteExistingFiles,
    });
    data = newFileData;
    // /////////////////////////////////////
    // beforeValidate - Fields
    // /////////////////////////////////////
    data = await (0, beforeValidate_1.beforeValidate)({
        data,
        doc: {},
        entityConfig: collectionConfig,
        operation: 'create',
        overrideAccess,
        req,
    });
    // /////////////////////////////////////
    // beforeValidate - Collections
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeValidate.reduce(async (priorHook, hook) => {
        await priorHook;
        data = (await hook({
            data,
            req,
            operation: 'create',
        })) || data;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Write files to local storage
    // /////////////////////////////////////
    if (!collectionConfig.upload.disableLocalStorage) {
        await (0, uploadFiles_1.uploadFiles)(payload, filesToUpload, req.t);
    }
    // /////////////////////////////////////
    // beforeChange - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook) => {
        await priorHook;
        data = (await hook({
            data,
            req,
            operation: 'create',
        })) || data;
    }, Promise.resolve());
    // /////////////////////////////////////
    // beforeChange - Fields
    // /////////////////////////////////////
    const resultWithLocales = await (0, beforeChange_1.beforeChange)({
        data,
        doc: {},
        docWithLocales: {},
        entityConfig: collectionConfig,
        operation: 'create',
        req,
        skipValidation: shouldSaveDraft,
    });
    // /////////////////////////////////////
    // Create
    // /////////////////////////////////////
    let doc;
    if (collectionConfig.auth && !collectionConfig.auth.disableLocalStrategy) {
        if (data.email) {
            resultWithLocales.email = data.email.toLowerCase();
        }
        if (collectionConfig.auth.verify) {
            resultWithLocales._verified = false;
            resultWithLocales._verificationToken = crypto_1.default.randomBytes(20).toString('hex');
        }
        try {
            doc = await Model.register(resultWithLocales, data.password);
        }
        catch (error) {
            // Handle user already exists from passport-local-mongoose
            if (error.name === 'UserExistsError') {
                throw new errors_1.ValidationError([{ message: error.message, field: 'email' }], req.t);
            }
            throw error;
        }
    }
    else {
        try {
            doc = await Model.create(resultWithLocales);
        }
        catch (error) {
            // Handle uniqueness error from MongoDB
            throw error.code === 11000 && error.keyValue
                ? new errors_1.ValidationError([{ message: req.t('error:valueMustBeUnique'), field: Object.keys(error.keyValue)[0] }], req.t)
                : error;
        }
    }
    let result = doc.toJSON({ virtuals: true });
    const verificationToken = result._verificationToken;
    // custom id type reset
    result.id = result._id;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // Send verification email if applicable
    // /////////////////////////////////////
    if (collectionConfig.auth && collectionConfig.auth.verify) {
        (0, sendVerificationEmail_1.default)({
            emailOptions,
            config: payload.config,
            sendEmail: payload.sendEmail,
            collection: { config: collectionConfig, Model },
            user: result,
            token: verificationToken,
            req,
            disableEmail: disableVerificationEmail,
        });
    }
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = await (0, afterRead_1.afterRead)({
        depth,
        doc: result,
        entityConfig: collectionConfig,
        overrideAccess,
        req,
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
        previousDoc: {},
        entityConfig: collectionConfig,
        operation: 'create',
        req,
    });
    // /////////////////////////////////////
    // afterChange - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({
            doc: result,
            previousDoc: {},
            req: args.req,
            operation: 'create',
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return result;
}
exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLDZFQUFxRDtBQUNyRCxvR0FBNEU7QUFFNUUseUNBQStDO0FBRS9DLDZGQUFxRTtBQUlyRSxxREFBNkQ7QUFDN0QsMkRBQXdEO0FBQ3hELGtFQUErRDtBQUMvRCxzRUFBbUU7QUFDbkUsZ0VBQTZEO0FBQzdELDREQUF5RDtBQUN6RCxxRUFBa0U7QUFjbEUsS0FBSyxVQUFVLE1BQU0sQ0FBQyxZQUF1QjtJQUMzQyxJQUFJLElBQUksR0FBRyxZQUFZLENBQUM7SUFFeEIsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUMvQix3Q0FBd0M7SUFFeEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBOEMsRUFBRSxJQUF5QixFQUFFLEVBQUU7UUFDNUksTUFBTSxTQUFTLENBQUM7UUFFaEIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDakIsSUFBSTtZQUNKLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNkLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV0QixNQUFNLEVBQ0osVUFBVSxFQUNWLFVBQVUsRUFBRSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsR0FBRyxFQUNILEdBQUcsRUFBRSxFQUNILE9BQU8sRUFDUCxPQUFPLEVBQUUsRUFDUCxNQUFNLEVBQ04sWUFBWSxHQUNiLEdBQ0YsRUFDRCx3QkFBd0IsRUFDeEIsS0FBSyxFQUNMLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsc0JBQXNCLEdBQUcsS0FBSyxFQUM5QixLQUFLLEdB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