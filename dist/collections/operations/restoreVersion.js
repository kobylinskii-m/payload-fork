"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../../errors");
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const types_1 = require("../../auth/types");
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const afterChange_1 = require("../../fields/hooks/afterChange");
const afterRead_1 = require("../../fields/hooks/afterRead");
async function restoreVersion(args) {
    const { collection: { Model, config: collectionConfig, }, id, overrideAccess = false, showHiddenFields, depth, req: { t, locale, payload, }, req, } = args;
    if (!id) {
        throw new errors_1.APIError('Missing ID of version to restore.', http_status_1.default.BAD_REQUEST);
    }
    // /////////////////////////////////////
    // Retrieve original raw version
    // /////////////////////////////////////
    const VersionModel = payload.versions[collectionConfig.slug];
    let rawVersion = await VersionModel.findOne({
        _id: id,
    });
    if (!rawVersion) {
        throw new errors_1.NotFound(t);
    }
    rawVersion = rawVersion.toJSON({ virtuals: true });
    const parentDocID = rawVersion.parent;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResults = !overrideAccess ? await (0, executeAccess_1.default)({ req, id: parentDocID }, collectionConfig.access.update) : true;
    const hasWherePolicy = (0, types_1.hasWhereAccessResult)(accessResults);
    // /////////////////////////////////////
    // Retrieve document
    // /////////////////////////////////////
    const queryToBuild = {
        where: {
            and: [
                {
                    id: {
                        equals: parentDocID,
                    },
                },
            ],
        },
    };
    if ((0, types_1.hasWhereAccessResult)(accessResults)) {
        queryToBuild.where.and.push(accessResults);
    }
    const query = await Model.buildQuery(queryToBuild, locale);
    const doc = await Model.findOne(query);
    if (!doc && !hasWherePolicy)
        throw new errors_1.NotFound(t);
    if (!doc && hasWherePolicy)
        throw new errors_1.Forbidden(t);
    // /////////////////////////////////////
    // fetch previousDoc
    // /////////////////////////////////////
    const previousDoc = await payload.findByID({
        collection: collectionConfig.slug,
        id: parentDocID,
        depth,
    });
    // /////////////////////////////////////
    // Update
    // /////////////////////////////////////
    let result = await Model.findByIdAndUpdate({ _id: parentDocID }, rawVersion.version, { new: true });
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
        data: result,
        doc: result,
        previousDoc,
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
            req,
            previousDoc,
            operation: 'update',
        }) || result;
    }, Promise.resolve());
    return result;
}
exports.default = restoreVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9yZXN0b3JlVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUF5QztBQUN6Qyw4REFBcUM7QUFHckMseUNBQTZEO0FBQzdELDZFQUFxRDtBQUNyRCw0Q0FBd0Q7QUFFeEQsb0dBQTRFO0FBQzVFLGdFQUE2RDtBQUM3RCw0REFBeUQ7QUFhekQsS0FBSyxVQUFVLGNBQWMsQ0FBNkIsSUFBZTtJQUN2RSxNQUFNLEVBQ0osVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxnQkFBZ0IsR0FDekIsRUFDRCxFQUFFLEVBQ0YsY0FBYyxHQUFHLEtBQUssRUFDdEIsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxHQUFHLEVBQUUsRUFDSCxDQUFDLEVBQ0QsTUFBTSxFQUNOLE9BQU8sR0FDUixFQUNELEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQztJQUVULElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUCxNQUFNLElBQUksaUJBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pGO0lBRUQsd0NBQXdDO0lBQ3hDLGdDQUFnQztJQUNoQyx3Q0FBd0M7SUFFeEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU3RCxJQUFJLFVBQVUsR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDMUMsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxJQUFJLGlCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkI7SUFFRCxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUs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