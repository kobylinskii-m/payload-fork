"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const micro_memoize_1 = __importDefault(require("micro-memoize"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const errors_1 = require("../../errors");
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const types_1 = require("../../auth/types");
const replaceWithDraftIfAvailable_1 = __importDefault(require("../../versions/drafts/replaceWithDraftIfAvailable"));
const afterRead_1 = require("../../fields/hooks/afterRead");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findByID(incomingArgs) {
    var _a;
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'read',
        })) || args;
    }, Promise.resolve());
    const { depth, collection: { Model, config: collectionConfig, }, id, req, req: { t, locale, payload, }, disableErrors, currentDepth, overrideAccess = false, showHiddenFields, draft: draftEnabled = false, } = args;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const accessResult = !overrideAccess ? await (0, executeAccess_1.default)({ req, disableErrors, id }, collectionConfig.access.read) : true;
    // If errors are disabled, and access returns false, return null
    if (accessResult === false)
        return null;
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
    if ((0, types_1.hasWhereAccessResult)(accessResult)) {
        queryToBuild.where.and.push(accessResult);
    }
    const query = await Model.buildQuery(queryToBuild, locale);
    // /////////////////////////////////////
    // Find by ID
    // /////////////////////////////////////
    if (!query.$and[0]._id)
        throw new errors_1.NotFound(t);
    if (!req.findByID)
        req.findByID = {};
    if (!req.findByID[collectionConfig.slug]) {
        const nonMemoizedFindByID = async (q) => Model.findOne(q, {}).lean();
        req.findByID[collectionConfig.slug] = (0, micro_memoize_1.default)(nonMemoizedFindByID, {
            isPromise: true,
            maxSize: 100,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore This is straight from their docs, bad typings
            transformKey: JSON.stringify,
        });
    }
    let result = await req.findByID[collectionConfig.slug](query);
    if (!result) {
        if (!disableErrors) {
            throw new errors_1.NotFound(t);
        }
        return null;
    }
    // Clone the result - it may have come back memoized
    result = JSON.parse(JSON.stringify(result));
    result = (0, sanitizeInternalFields_1.default)(result);
    // /////////////////////////////////////
    // Replace document with draft if available
    // /////////////////////////////////////
    if (((_a = collectionConfig.versions) === null || _a === void 0 ? void 0 : _a.drafts) && draftEnabled) {
        result = await (0, replaceWithDraftIfAvailable_1.default)({
            payload,
            entity: collectionConfig,
            entityType: 'collection',
            doc: result,
            accessResult,
            locale,
        });
    }
    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
        await priorHook;
        result = await hook({
            req,
            query,
            doc: result,
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = await (0, afterRead_1.afterRead)({
        currentDepth,
        doc: result,
        depth,
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
            query,
            doc: result,
        }) || result;
    }, Promise.resolve());
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return result;
}
exports.default = findByID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEJ5SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9maW5kQnlJRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUF5QztBQUN6QyxrRUFBb0M7QUFHcEMsb0dBQTRFO0FBQzVFLHlDQUF3QztBQUN4Qyw2RUFBcUQ7QUFFckQsNENBQXdEO0FBQ3hELG9IQUE0RjtBQUM1Riw0REFBeUQ7QUFjekQsOERBQThEO0FBQzlELEtBQUssVUFBVSxRQUFRLENBQTZCLFlBQXVCOztJQUN6RSxJQUFJLElBQUksR0FBRyxZQUFZLENBQUM7SUFFeEIsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUMvQix3Q0FBd0M7SUFFeEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xGLE1BQU0sU0FBUyxDQUFDO1FBRWhCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ2pCLElBQUk7WUFDSixTQUFTLEVBQUUsTUFBTTtTQUNsQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDZCxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFdEIsTUFBTSxFQUNKLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUFFLGdCQUFnQixHQUN6QixFQUNELEVBQUUsRUFDRixHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsQ0FBQyxFQUNELE1BQU0sRUFDTixPQUFPLEdBQ1IsRUFDRCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGNBQWMsR0FBRyxLQUFLLEVBQ3RCLGdCQUFnQixFQUNoQixLQUFLLEVBQUUsWUFBWSxHQUFHLEtBQUssR0FDNUIsR0FBRyxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMsU0FB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