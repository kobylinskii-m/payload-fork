"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const types_1 = require("../../auth/types");
const afterRead_1 = require("../../fields/hooks/afterRead");
async function findVersionByID(args) {
    const { depth, collection: { config: collectionConfig, }, id, req, req: { t, locale, payload, }, disableErrors, currentDepth, overrideAccess, showHiddenFields, } = args;
    if (!id) {
        throw new errors_1.APIError('Missing ID of version.', http_status_1.default.BAD_REQUEST);
    }
    const VersionsModel = (payload.versions[collectionConfig.slug]);
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResults = !overrideAccess ? await (0, executeAccess_1.default)({ req, disableErrors, id }, collectionConfig.access.readVersions) : true;
    // If errors are disabled, and access returns false, return null
    if (accessResults === false)
        return null;
    const hasWhereAccess = typeof accessResults === 'object';
    const queryToBuild = {
        where: {
            and: [
                {
                    _id: {
                        equals: id,
                    },
                },
            ],
        },
    };
    if ((0, types_1.hasWhereAccessResult)(accessResults)) {
        queryToBuild.where.and.push(accessResults);
    }
    const query = await VersionsModel.buildQuery(queryToBuild, locale);
    // /////////////////////////////////////
    // Find by ID
    // /////////////////////////////////////
    if (!query.$and[0]._id)
        throw new errors_1.NotFound(t);
    let result = await VersionsModel.findOne(query, {}).lean();
    if (!result) {
        if (!disableErrors) {
            if (!hasWhereAccess)
                throw new errors_1.NotFound(t);
            if (hasWhereAccess)
                throw new errors_1.Forbidden(t);
        }
        return null;
    }
    // Clone the result - it may have come back memoized
    result = JSON.parse(JSON.stringify(result));
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
        await priorHook;
        result.version = await hook({
            req,
            query,
            doc: result.version,
        }) || result.version;
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result.version = await (0, afterRead_1.afterRead)({
        currentDepth,
        depth,
        doc: result.version,
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
        result.version = await hook({
            req,
            query,
            doc: result.version,
        }) || result.version;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return result;
}
exports.default = findVersionByID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvZmluZFZlcnNpb25CeUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLDhEQUFxQztBQUdyQyxvR0FBNEU7QUFDNUUseUNBQTZEO0FBQzdELDZFQUFxRDtBQUVyRCw0Q0FBd0Q7QUFFeEQsNERBQXlEO0FBYXpELEtBQUssVUFBVSxlQUFlLENBQXFDLElBQWU7SUFDaEYsTUFBTSxFQUNKLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFDVixNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsRUFBRSxFQUNGLEdBQUcsRUFDSCxHQUFHLEVBQUUsRUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLE9BQU8sR0FDUixFQUNELGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGdCQUFnQixHQUNqQixHQUFHLElBQUksQ0FBQztJQUVULElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUCxNQUFNLElBQUksaUJBQVEsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3RFO0lBRUQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFvQixDQUFDO0lBRW5GLHdDQUF3QztJQUN4QyxTQUFTO0lBQ1Qsd0NBQXdDO0lBRXhDLE1BQU0sYUFBYSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUEsdUJBQWEsRUFBQyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFckksZ0VBQWdFO0lBQ2hFLElBQUksYUFBYSxLQUFLLEtBQUs7UUFBRSxPQUFPLElBQUks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