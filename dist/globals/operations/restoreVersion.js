"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const afterChange_1 = require("../../fields/hooks/afterChange");
const afterRead_1 = require("../../fields/hooks/afterRead");
async function restoreVersion(args) {
    const { id, depth, globalConfig, req, req: { t, payload, payload: { globals: { Model, }, }, }, overrideAccess, showHiddenFields, } = args;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    if (!overrideAccess) {
        await (0, executeAccess_1.default)({ req }, globalConfig.access.update);
    }
    // /////////////////////////////////////
    // Retrieve original raw version
    // /////////////////////////////////////
    const VersionModel = payload.versions[globalConfig.slug];
    let rawVersion = await VersionModel.findOne({
        _id: id,
    });
    if (!rawVersion) {
        throw new errors_1.NotFound(t);
    }
    rawVersion = rawVersion.toJSON({ virtuals: true });
    // /////////////////////////////////////
    // fetch previousDoc
    // /////////////////////////////////////
    const previousDoc = await payload.findGlobal({
        slug: globalConfig.slug,
        depth,
    });
    // /////////////////////////////////////
    // Update global
    // /////////////////////////////////////
    const global = await Model.findOne({ globalType: globalConfig.slug });
    let result = rawVersion.version;
    if (global) {
        result = await Model.findOneAndUpdate({ globalType: globalConfig.slug }, result, { new: true });
    }
    else {
        result.globalType = globalConfig.slug;
        result = await Model.create(result);
    }
    result = result.toJSON({ virtuals: true });
    // custom id type reset
    result.id = result._id;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = await (0, afterRead_1.afterRead)({
        depth,
        doc: result,
        entityConfig: globalConfig,
        req,
        overrideAccess,
        showHiddenFields,
    });
    // /////////////////////////////////////
    // afterRead - Global
    // /////////////////////////////////////
    await globalConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({
            doc: result,
            req,
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterChange - Fields
    // /////////////////////////////////////
    result = await (0, afterChange_1.afterChange)({
        data: result,
        doc: result,
        previousDoc,
        entityConfig: globalConfig,
        operation: 'update',
        req,
    });
    // /////////////////////////////////////
    // afterChange - Global
    // /////////////////////////////////////
    await globalConfig.hooks.afterChange.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({
            doc: result,
            previousDoc,
            req,
        }) || result;
    }, Promise.resolve());
    return result;
}
exports.default = restoreVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2xvYmFscy9vcGVyYXRpb25zL3Jlc3RvcmVWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkVBQXFEO0FBQ3JELG9HQUE0RTtBQUc1RSx5Q0FBd0M7QUFDeEMsZ0VBQTZEO0FBQzdELDREQUF5RDtBQVd6RCxLQUFLLFVBQVUsY0FBYyxDQUFxQyxJQUFlO0lBQy9FLE1BQU0sRUFDSixFQUFFLEVBQ0YsS0FBSyxFQUNMLFlBQVksRUFDWixHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsQ0FBQyxFQUNELE9BQU8sRUFDUCxPQUFPLEVBQUUsRUFDUCxPQUFPLEVBQUUsRUFDUCxLQUFLLEdBQ04sR0FDRixHQUNGLEVBQ0QsY0FBYyxFQUNkLGdCQUFnQixHQUNqQixHQUFHLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxTQUFTO0lBQ1Qsd0NBQXdDO0lBRXhDLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsTUFBTSxJQUFBLHVCQUFhLEVBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFEO0lBRUQsd0NBQXdDO0lBQ3hDLGdDQUFnQztJQUNoQyx3Q0FBd0M7SUFFeEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekQsSUFBSSxVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQzFDLEdBQUcsRUFBRSxFQUFFO0tBQ1IsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLE1BQU0sSUFBSSxpQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMs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