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
const afterRead_1 = require("../../fields/hooks/afterRead");
const buildCollectionFields_1 = require("../../versions/buildCollectionFields");
async function findVersions(args) {
    const { where, page, limit, depth, collection: { config: collectionConfig, }, req, req: { locale, payload, }, overrideAccess, showHiddenFields, } = args;
    const VersionsModel = payload.versions[collectionConfig.slug];
    // /////////////////////////////////////
    // Access
    // /////////////////////////////////////
    const queryToBuild = {};
    let useEstimatedCount = false;
    if (where) {
        let and = [];
        if (Array.isArray(where.and))
            and = where.and;
        if (Array.isArray(where.AND))
            and = where.AND;
        queryToBuild.where = {
            ...where,
            and: [
                ...and,
            ],
        };
        const constraints = (0, flattenWhereConstraints_1.default)(queryToBuild);
        useEstimatedCount = constraints.some((prop) => Object.keys(prop).some((key) => key === 'near'));
    }
    if (!overrideAccess) {
        const accessResults = await (0, executeAccess_1.default)({ req }, collectionConfig.access.readVersions);
        if ((0, types_1.hasWhereAccessResult)(accessResults)) {
            if (!where) {
                queryToBuild.where = {
                    and: [
                        accessResults,
                    ],
                };
            }
            else {
                queryToBuild.where.and.push(accessResults);
            }
        }
    }
    const query = await VersionsModel.buildQuery(queryToBuild, locale);
    // /////////////////////////////////////
    // Find
    // /////////////////////////////////////
    const [sortProperty, sortOrder] = (0, buildSortParam_1.buildSortParam)({
        sort: args.sort || '-updatedAt',
        fields: (0, buildCollectionFields_1.buildVersionCollectionFields)(collectionConfig),
        timestamps: true,
        config: payload.config,
        locale,
    });
    const paginatedDocs = await VersionsModel.paginate(query, {
        page: page || 1,
        limit: limit !== null && limit !== void 0 ? limit : 10,
        sort: {
            [sortProperty]: sortOrder,
        },
        lean: true,
        leanWithId: true,
        useEstimatedCount,
    });
    // /////////////////////////////////////
    // beforeRead - Collection
    // /////////////////////////////////////
    let result = {
        ...paginatedDocs,
        docs: await Promise.all(paginatedDocs.docs.map(async (doc) => {
            const docString = JSON.stringify(doc);
            const docRef = JSON.parse(docString);
            await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef.version = await hook({ req, query, doc: docRef.version }) || docRef.version;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (data) => ({
            ...data,
            version: await (0, afterRead_1.afterRead)({
                depth,
                doc: data.version,
                entityConfig: collectionConfig,
                overrideAccess,
                req,
                showHiddenFields,
                findMany: true,
            }),
        }))),
    };
    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            const docRef = doc;
            await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
                await priorHook;
                docRef.version = await hook({ req, query, doc: doc.version, findMany: true }) || doc.version;
            }, Promise.resolve());
            return docRef;
        })),
    };
    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////
    result = {
        ...result,
        docs: result.docs.map((doc) => (0, sanitizeInternalFields_1.default)(doc)),
    };
    return result;
}
exports.default = findVersions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvZmluZFZlcnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsNkVBQXFEO0FBQ3JELG9HQUE0RTtBQUU1RSw0Q0FBd0Q7QUFDeEQsc0dBQThFO0FBQzlFLGtFQUErRDtBQUcvRCw0REFBeUQ7QUFDekQsZ0ZBQW9GO0FBY3BGLEtBQUssVUFBVSxZQUFZLENBQXFDLElBQWU7SUFDN0UsTUFBTSxFQUNKLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFDVixNQUFNLEVBQUUsZ0JBQWdCLEdBQ3pCLEVBQ0QsR0FBRyxFQUNILEdBQUcsRUFBRSxFQUNILE1BQU0sRUFDTixPQUFPLEdBQ1IsRUFDRCxjQUFjLEVBQ2QsZ0JBQWdCLEdBQ2pCLEdBQUcsSUFBSSxDQUFDO0lBRVQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQW9CLENBQUM7SUFFakYsd0NBQXdDO0lBQ3hDLFNBQVM7SUFDVCx3Q0FBd0M7SUFFeEMsTUFBTSxZQUFZLEdBQXNCLEVBQUUsQ0FBQztJQUMzQyxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUU5QixJQUFJLEtBQUssRUFBRTtRQUNULElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDOUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QyxZQUFZLENBQUMsS0FBSyxHQUFHO1lBQ25CLEdBQUcsS0FBSztZQUNSLEdBQUcs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