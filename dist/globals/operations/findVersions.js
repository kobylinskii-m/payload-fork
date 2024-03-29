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
const buildGlobalFields_1 = require("../../versions/buildGlobalFields");
async function findVersions(args) {
    const { where, page, limit, depth, globalConfig, req, req: { locale, payload, }, overrideAccess, showHiddenFields, } = args;
    const VersionsModel = payload.versions[globalConfig.slug];
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
        const accessResults = await (0, executeAccess_1.default)({ req }, globalConfig.access.readVersions);
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
        fields: (0, buildGlobalFields_1.buildVersionGlobalFields)(globalConfig),
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
    // afterRead - Fields
    // /////////////////////////////////////
    let result = {
        ...paginatedDocs,
        docs: await Promise.all(paginatedDocs.docs.map(async (data) => ({
            ...data,
            version: await (0, afterRead_1.afterRead)({
                depth,
                doc: data.version,
                entityConfig: globalConfig,
                req,
                overrideAccess,
                showHiddenFields,
                findMany: true,
            }),
        }))),
    };
    // /////////////////////////////////////
    // afterRead - Global
    // /////////////////////////////////////
    result = {
        ...result,
        docs: await Promise.all(result.docs.map(async (doc) => {
            const docRef = doc;
            await globalConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9maW5kVmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSw2RUFBcUQ7QUFDckQsb0dBQTRFO0FBRTVFLDRDQUF3RDtBQUN4RCxzR0FBOEU7QUFDOUUsa0VBQStEO0FBRy9ELDREQUF5RDtBQUN6RCx3RUFBNEU7QUFjNUUsS0FBSyxVQUFVLFlBQVksQ0FBcUMsSUFBZTtJQUM3RSxNQUFNLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFlBQVksRUFDWixHQUFHLEVBQ0gsR0FBRyxFQUFFLEVBQ0gsTUFBTSxFQUNOLE9BQU8sR0FDUixFQUNELGNBQWMsRUFDZCxnQkFBZ0IsR0FDakIsR0FBRyxJQUFJLENBQUM7SUFFVCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxRCx3Q0FBd0M7SUFDeEMsU0FBUztJQUNULHdDQUF3QztJQUV4QyxNQUFNLFlBQVksR0FBc0IsRUFBRSxDQUFDO0lBQzNDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBRTlCLElBQUksS0FBSyxFQUFFO1FBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM5QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlDLFlBQVksQ0FBQyxLQUFLLEdBQUc7WUFDbkIsR0FBRyxLQUFLO1lBQ1IsR0FBRyxFQUFFO2dCQUNILEdBQUcsR0FBRzthQUNQO1NBQ0YsQ0FBQztRQUVG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