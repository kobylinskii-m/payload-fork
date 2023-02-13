"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const types_1 = require("../../auth/types");
const afterRead_1 = require("../../fields/hooks/afterRead");
async function findVersionByID(args) {
    const { depth, globalConfig, id, req, req: { t, payload, locale, }, disableErrors, currentDepth, overrideAccess, showHiddenFields, } = args;
    const VersionsModel = payload.versions[globalConfig.slug];
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResults = !overrideAccess ? await (0, executeAccess_1.default)({ req, disableErrors, id }, globalConfig.access.readVersions) : true;
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
    await globalConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
        await priorHook;
        result.version = await hook({
            req,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9maW5kVmVyc2lvbkJ5SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxvR0FBNEU7QUFDNUUseUNBQW1EO0FBQ25ELDZFQUFxRDtBQUVyRCw0Q0FBd0Q7QUFHeEQsNERBQXlEO0FBYXpELEtBQUssVUFBVSxlQUFlLENBQXFDLElBQWU7SUFDaEYsTUFBTSxFQUNKLEtBQUssRUFDTCxZQUFZLEVBQ1osRUFBRSxFQUNGLEdBQUcsRUFDSCxHQUFHLEVBQUUsRUFDSCxDQUFDLEVBQ0QsT0FBTyxFQUNQLE1BQU0sR0FDUCxFQUNELGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLGdCQUFnQixHQUNqQixHQUFHLElBQUksQ0FBQztJQUVULE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTFELHdDQUF3QztJQUN4QyxTQUFTO0lBQ1Qsd0NBQXdDO0lBRXhDLE1BQU0sYUFBYSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUEsdUJBQWEsRUFBQyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRWpJLGdFQUFnRTtJQUNoRSxJQUFJLGFBQWEsS0FBSyxLQUFLO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFekMsTUFBTSxjQUFjLEdBQUcsT0FBTyxhQUFhLEtBQUssUUFBUSxDQUFDO0lBRXpELE1BQU0sWUFBWSxHQUFxQjtRQUNyQyxLQUFLLEVBQUU7WUFDTCxHQUFHLEVBQUU7Z0JBQ0g7b0JBQ0UsR0FBRyxFQUFFO3dCQUNILE1BQU0sRUFBRSxFQUFFO3FCQUNYO2lCQUNGO2FBQ0Y7U0FDRjtLQUNG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