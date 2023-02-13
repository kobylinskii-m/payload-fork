"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const sanitizeInternalFields_1 = __importDefault(require("../../utilities/sanitizeInternalFields"));
const types_1 = require("../../auth/types");
const flattenWhereConstraints_1 = __importDefault(require("../../utilities/flattenWhereConstraints"));
const buildSortParam_1 = require("../../mongoose/buildSortParam");
const replaceWithDraftIfAvailable_1 = __importDefault(require("../../versions/drafts/replaceWithDraftIfAvailable"));
const afterRead_1 = require("../../fields/hooks/afterRead");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function find(incomingArgs) {
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
    const { where, page, limit, depth, currentDepth, draft: draftsEnabled, collection: { Model, config: collectionConfig, }, req, req: { locale, payload, }, overrideAccess, disableErrors, showHiddenFields, pagination = true, } = args;
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const queryToBuild = {
        where: {
            and: [],
        },
    };
    let useEstimatedCount = false;
    if (where) {
        queryToBuild.where = {
            and: [],
            ...where,
        };
        if (Array.isArray(where.AND)) {
            queryToBuild.where.and = [
                ...queryToBuild.where.and,
                ...where.AND,
            ];
        }
        const constraints = (0, flattenWhereConstraints_1.default)(queryToBuild);
        useEstimatedCount = constraints.some((prop) => Object.keys(prop).some((key) => key === 'near'));
    }
    let accessResult;
    if (!overrideAccess) {
        accessResult = await (0, executeAccess_1.default)({ req, disableErrors }, collectionConfig.access.read);
        // If errors are disabled, and access returns false, return empty results
        if (accessResult === false) {
            return {
                docs: [],
                totalDocs: 0,
                totalPages: 1,
                page: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
                limit,
            };
        }
        if ((0, types_1.hasWhereAccessResult)(accessResult)) {
            queryToBuild.where.and.push(accessResult);
        }
    }
    const query = await Model.buildQuery(queryToBuild, locale);
    // /////////////////////////////////////
    // Find
    // /////////////////////////////////////
    const [sortProperty, sortOrder] = (0, buildSortParam_1.buildSortParam)({
        sort: args.sort,
        config: payload.config,
        fields: collectionConfig.fields,
        timestamps: collectionConfig.timestamps,
        locale,
    });
    const usePagination = pagination && limit !== 0;
    const limitToUse = limit !== null && limit !== void 0 ? limit : (usePagination ? 10 : 0);
    const paginatedDocs = await Model.paginate(query, {
        page: page || 1,
        sort: {
            [sortProperty]: sortOrder,
        },
        limit: limitToUse,
        lean: true,
        leanWithId: true,
        useEstimatedCount,
        pagination: usePagination,
        useCustomCountFn: pagination ? undefined : () => Promise.resolve(1),
        options: {
            // limit must also be set here, it's ignored when pagination is false
            limit: limitToUse,
        },
    });
    let result = {
        ...paginatedDocs,
        docs: paginatedDocs.docs.map((doc) => {
            const sanitizedDoc = JSON.parse(JSON.stringify(doc));
            sanitizedDoc.id = sanitizedDoc._id;
            return (0, sanitizeInternalFields_1.default)(sanitizedDoc);
        }),
    };
    // /////////////////////////////////////
    // Replace documents with drafts if available
    // /////////////////////////////////////
    if (((_a = collectionConfig.versions) === null || _a === void 0 ? void 0 : _a.drafts) && draftsEnabled) {
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc) => (0, replaceWithDraftIfAvailable_1.default)({
                accessResult,
                payload,
                entity: collectionConfig,
                entityType: 'collection',
                doc,
                locale,
            }))),
        };
    }
    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            let docRef = doc;
            await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef = await hook({ req, query, doc: docRef }) || docRef;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => (0, afterRead_1.afterRead)({
            depth,
            currentDepth,
            doc,
            entityConfig: collectionConfig,
            overrideAccess,
            req,
            showHiddenFields,
            findMany: true,
        }))),
    };
    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            let docRef = doc;
            await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef = await hook({ req, query, doc, findMany: true }) || doc;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    return result;
}
exports.default = find;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9vcGVyYXRpb25zL2ZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSw2RUFBcUQ7QUFDckQsb0dBQTRFO0FBRzVFLDRDQUF3RDtBQUN4RCxzR0FBOEU7QUFDOUUsa0VBQStEO0FBQy9ELG9IQUE0RjtBQUU1Riw0REFBeUQ7QUFrQnpELDhEQUE4RDtBQUM5RCxLQUFLLFVBQVUsSUFBSSxDQUE2QixZQUF1Qjs7SUFDckUsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDO0lBRXhCLHdDQUF3QztJQUN4QywrQkFBK0I7SUFDL0Isd0NBQXdDO0lBRXhDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNsRixNQUFNLFNBQVMsQ0FBQztRQUVoQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNqQixJQUFJO1lBQ0osU0FBUyxFQUFFLE1BQU07U0FDbEIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXRCLE1BQU0sRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEtBQUssRUFDTCxLQUFLLEVBQ0wsWUFBWSxFQUNaLEtBQUssRUFBRSxhQUFhLEVBQ3BCLFVBQVUsRUFBRSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsR0FBRyxFQUNILEdBQUcsRUFBRSxFQUNILE1BQU0sRUFDTixPQUFPLEdBQ1IsRUFDRCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixVQUFVLEdBQUcsSUFBSSxHQUNsQixHQUFHLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxTQUFTO0lBQ1Qsd0NB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