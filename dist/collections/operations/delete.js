"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const types_1 = require("../../auth/types");
const fileExists_1 = __importDefault(require("../../uploads/fileExists"));
const afterRead_1 = require("../../fields/hooks/afterRead");
async function deleteOperation(incomingArgs) {
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'delete',
        })) || args;
    }, Promise.resolve());
    const { depth, collection: { Model, config: collectionConfig, }, id, req, req: { t, locale, payload: { config, preferences, }, }, overrideAccess, showHiddenFields, } = args;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResults = !overrideAccess ? await (0, executeAccess_1.default)({ req, id }, collectionConfig.access.delete) : true;
    const hasWhereAccess = (0, types_1.hasWhereAccessResult)(accessResults);
    // /////////////////////////////////////
    // beforeDelete - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeDelete.reduce(async (priorHook, hook) => {
        await priorHook;
        return hook({
            req,
            id,
        });
    }, Promise.resolve());
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
    const docToDelete = await Model.findOne(query);
    if (!docToDelete && !hasWhereAccess)
        throw new errors_1.NotFound(t);
    if (!docToDelete && hasWhereAccess)
        throw new errors_1.Forbidden(t);
    const resultToDelete = docToDelete.toJSON({ virtuals: true });
    // /////////////////////////////////////
    // Delete any associated files
    // /////////////////////////////////////
    if (collectionConfig.upload) {
        const { staticDir } = collectionConfig.upload;
        const staticPath = path_1.default.resolve(config.paths.configDir, staticDir);
        const fileToDelete = `${staticPath}/${resultToDelete.filename}`;
        if (await (0, fileExists_1.default)(fileToDelete)) {
            fs_1.default.unlink(fileToDelete, (err) => {
                if (err) {
                    throw new errors_1.ErrorDeletingFile(t);
                }
            });
        }
        if (resultToDelete.sizes) {
            Object.values(resultToDelete.sizes).forEach(async (size) => {
                const sizeToDelete = `${staticPath}/${size.filename}`;
                if (await (0, fileExists_1.default)(sizeToDelete)) {
                    fs_1.default.unlink(sizeToDelete, (err) => {
                        if (err) {
                            throw new errors_1.ErrorDeletingFile(t);
                        }
                    });
                }
            });
        }
    }
    // /////////////////////////////////////
    // Delete document
    // /////////////////////////////////////
    const doc = await Model.findOneAndDelete({ _id: id });
    let result = doc.toJSON({ virtuals: true });
    // custom id type reset
    result.id = result._id;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // Delete Preferences
    // /////////////////////////////////////
    if (collectionConfig.auth) {
        await preferences.Model.deleteMany({ user: id, userCollection: collectionConfig.slug });
    }
    await preferences.Model.deleteMany({ key: `collection-${collectionConfig.slug}-${id}` });
    // /////////////////////////////////////
    // afterDelete - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterDelete.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({ req, id, doc: result }) || result;
    }, Promise.resolve());
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
    // 8. Return results
    // /////////////////////////////////////
    return result;
}
exports.default = deleteOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUd4QixvR0FBNEU7QUFDNUUseUNBQXNFO0FBQ3RFLDZFQUFxRDtBQUdyRCw0Q0FBd0Q7QUFFeEQsMEVBQWtEO0FBQ2xELDREQUF5RDtBQVd6RCxLQUFLLFVBQVUsZUFBZSxDQUFDLFlBQXVCO0lBQ3BELElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQztJQUV4Qix3Q0FBd0M7SUFDeEMsK0JBQStCO0lBQy9CLHdDQUF3QztJQUV4QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUE4QyxFQUFFLElBQXlCLEVBQUUsRUFBRTtRQUM1SSxNQUFNLFNBQVMsQ0FBQztRQUVoQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixJQUFJO1lBQ0osU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sRUFDSixLQUFLLEVBQ0wsVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxnQkFBZ0IsR0FDekIsRUFDRCxFQUFFLEVBQ0YsR0FBRyxFQUNILEdBQUcsRUFBRSxFQUNILENBQUMsRUFDRCxNQUFNLEVBQ04sT0FBTyxFQUFFLEVBQ1AsTUFBTSxFQUNOLFdBQVcsR0FDWixHQUNGLEVBQ0QsY0FBYyxFQUNkLGdCQUFnQixHQUNqQixHQUFHLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxTQUFTO0lBQ1Qsd0NBQXdDO0lBRXhDLE1BQU0sYUFBYSxHQUFHLENBQUMsY0FBYyxDQUFD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