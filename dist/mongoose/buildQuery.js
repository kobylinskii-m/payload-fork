"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const deepmerge_1 = __importDefault(require("deepmerge"));
const mongoose_1 = __importDefault(require("mongoose"));
const combineMerge_1 = require("../utilities/combineMerge");
const getSchemaTypeOptions_1 = require("./getSchemaTypeOptions");
const operatorMap_1 = require("./operatorMap");
const sanitizeFormattedValue_1 = require("./sanitizeFormattedValue");
const validOperators = [
    "like",
    "contains",
    "in",
    "all",
    "not_in",
    "greater_than_equal",
    "greater_than",
    "less_than_equal",
    "less_than",
    "not_equals",
    "equals",
    "exists",
    "near",
];
const subQueryOptions = {
    limit: 50,
    lean: true,
};
class ParamParser {
    constructor(model, rawParams, locale) {
        this.parse = this.parse.bind(this);
        this.model = model;
        this.rawParams = rawParams;
        this.locale = locale;
        this.query = {
            searchParams: {},
            sort: false,
        };
    }
    // Entry point to the ParamParser class
    async parse() {
        if (typeof this.rawParams === "object") {
            for (const key of Object.keys(this.rawParams)) {
                if (key === "where") {
                    this.query.searchParams = await this.parsePathOrRelation(this.rawParams.where);
                }
                else if (key === "sort") {
                    this.query.sort = this.rawParams[key];
                }
            }
            return this.query;
        }
        return {};
    }
    async parsePathOrRelation(object) {
        let result = {};
        // We need to determine if the whereKey is an AND, OR, or a schema path
        for (const relationOrPath of Object.keys(object)) {
            if (relationOrPath.toLowerCase() === "and") {
                const andConditions = object[relationOrPath];
                const builtAndConditions = await this.buildAndOrConditions(andConditions);
                if (builtAndConditions.length > 0)
                    result.$and = builtAndConditions;
            }
            else if (relationOrPath.toLowerCase() === "or" &&
                Array.isArray(object[relationOrPath])) {
                const orConditions = object[relationOrPath];
                const builtOrConditions = await this.buildAndOrConditions(orConditions);
                if (builtOrConditions.length > 0)
                    result.$or = builtOrConditions;
            }
            else {
                // It's a path - and there can be multiple comparisons on a single path.
                // For example - title like 'test' and title not equal to 'tester'
                // So we need to loop on keys again here to handle each operator independently
                const pathOperators = object[relationOrPath];
                if (typeof pathOperators === "object") {
                    for (const operator of Object.keys(pathOperators)) {
                        if (validOperators.includes(operator)) {
                            const searchParam = await this.buildSearchParam(this.model.schema, relationOrPath, pathOperators[operator], operator);
                            if ((searchParam === null || searchParam === void 0 ? void 0 : searchParam.value) && (searchParam === null || searchParam === void 0 ? void 0 : searchParam.path)) {
                                result = {
                                    ...result,
                                    [searchParam.path]: searchParam.value,
                                };
                            }
                            else if (typeof (searchParam === null || searchParam === void 0 ? void 0 : searchParam.value) === "object") {
                                result = (0, deepmerge_1.default)(result, searchParam.value, {
                                    arrayMerge: combineMerge_1.combineMerge,
                                });
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    async buildAndOrConditions(conditions) {
        const completedConditions = [];
        // Loop over all AND / OR operations and add them to the AND / OR query param
        // Operations should come through as an array
        for (const condition of conditions) {
            // If the operation is properly formatted as an object
            if (typeof condition === "object") {
                const result = await this.parsePathOrRelation(condition);
                if (Object.keys(result).length > 0) {
                    completedConditions.push(result);
                }
            }
        }
        return completedConditions;
    }
    // Build up an array of auto-localized paths to search on
    // Multiple paths may be possible if searching on properties of relationship fields
    getLocalizedPaths(Model, incomingPath, operator) {
        const { schema } = Model;
        const pathSegments = incomingPath.split(".");
        let paths = [
            {
                path: "",
                complete: false,
                Model,
            },
        ];
        pathSegments.every((segment, i) => {
            const lastIncompletePath = paths.find(({ complete }) => !complete);
            const { path } = lastIncompletePath;
            const currentPath = path ? `${path}.${segment}` : segment;
            const currentSchemaType = schema.path(currentPath);
            const currentSchemaPathType = schema.pathType(currentPath);
            if (currentSchemaPathType === "nested") {
                lastIncompletePath.path = currentPath;
                return true;
            }
            const upcomingSegment = pathSegments[i + 1];
            if (currentSchemaType && currentSchemaPathType !== "adhocOrUndefined") {
                const currentSchemaTypeOptions = (0, getSchemaTypeOptions_1.getSchemaTypeOptions)(currentSchemaType);
                if (currentSchemaTypeOptions.localized) {
                    const upcomingLocalizedPath = `${currentPath}.${upcomingSegment}`;
                    const upcomingSchemaTypeWithLocale = schema.path(upcomingLocalizedPath);
                    if (upcomingSchemaTypeWithLocale) {
                        lastIncompletePath.path = currentPath;
                        return true;
                    }
                    const localePath = `${currentPath}.${this.locale}`;
                    const localizedSchemaType = schema.path(localePath);
                    if (localizedSchemaType || operator === "near") {
                        lastIncompletePath.path = localePath;
                        return true;
                    }
                }
                lastIncompletePath.path = currentPath;
                return true;
            }
            const priorSchemaType = schema.path(path);
            if (priorSchemaType) {
                const priorSchemaTypeOptions = (0, getSchemaTypeOptions_1.getSchemaTypeOptions)(priorSchemaType);
                if (typeof priorSchemaTypeOptions.ref === "string") {
                    const RefModel = mongoose_1.default.model(priorSchemaTypeOptions.ref);
                    lastIncompletePath.complete = true;
                    const remainingPath = pathSegments.slice(i).join(".");
                    paths = [
                        ...paths,
                        ...this.getLocalizedPaths(RefModel, remainingPath, operator),
                    ];
                    return false;
                }
            }
            if (operator === "near" || currentSchemaPathType === "adhocOrUndefined") {
                lastIncompletePath.path = currentPath;
            }
            return true;
        });
        return paths;
    }
    // Convert the Payload key / value / operator into a MongoDB query
    async buildSearchParam(schema, incomingPath, val, operator) {
        // Replace GraphQL nested field double underscore formatting
        let sanitizedPath = incomingPath.replace(/__/gi, ".");
        if (sanitizedPath === "id")
            sanitizedPath = "_id";
        const collectionPaths = this.getLocalizedPaths(this.model, sanitizedPath, operator);
        const [{ path }] = collectionPaths;
        if (path) {
            const schemaType = schema.path(path);
            const schemaOptions = (0, getSchemaTypeOptions_1.getSchemaTypeOptions)(schemaType);
            const formattedValue = (0, sanitizeFormattedValue_1.sanitizeQueryValue)(schemaType, path, operator, val);
            // If there are multiple collections to search through,
            // Recursively build up a list of query constraints
            if (collectionPaths.length > 1) {
                // Remove top collection and reverse array
                // to work backwards from top
                const collectionPathsToSearch = collectionPaths.slice(1).reverse();
                const initialRelationshipQuery = {
                    value: {},
                };
                const relationshipQuery = await collectionPathsToSearch.reduce(async (priorQuery, { Model: SubModel, path: subPath }, i) => {
                    const priorQueryResult = await priorQuery;
                    // On the "deepest" collection,
                    // Search on the value passed through the query
                    if (i === 0) {
                        const subQuery = await SubModel.buildQuery({
                            where: {
                                [subPath]: {
                                    [operator]: val,
                                },
                            },
                        }, this.locale);
                        const result = await SubModel.find(subQuery, subQueryOptions);
                        const $in = result.map((doc) => doc._id.toString());
                        if (collectionPathsToSearch.length === 1)
                            return { path, value: { $in } };
                        return {
                            value: { _id: { $in } },
                        };
                    }
                    const subQuery = priorQueryResult.value;
                    const result = await SubModel.find(subQuery, subQueryOptions);
                    const $in = result.map((doc) => doc._id.toString());
                    // If it is the last recursion
                    // then pass through the search param
                    if (i + 1 === collectionPathsToSearch.length) {
                        return { path, value: { $in } };
                    }
                    return {
                        value: {
                            _id: { $in },
                        },
                    };
                }, Promise.resolve(initialRelationshipQuery));
                return relationshipQuery;
            }
            if (operator && validOperators.includes(operator)) {
                const operatorKey = operatorMap_1.operatorMap[operator];
                let overrideQuery = false;
                let query;
                // If there is a ref, this is a relationship or upload field
                // IDs can be either string, number, or ObjectID
                // So we need to build an `or` query for all these types
                if (schemaOptions && (schemaOptions.ref || schemaOptions.refPath)) {
                    overrideQuery = true;
                    query = {
                        $or: [
                            {
                                [path]: {
                                    [operatorKey]: formattedValue,
                                },
                            },
                        ],
                    };
                    if (typeof formattedValue === "number" ||
                        (typeof formattedValue === "string" &&
                            mongoose_1.default.Types.ObjectId.isValid(formattedValue))) {
                        query.$or.push({
                            [path]: {
                                [operatorKey]: formattedValue.toString(),
                            },
                        });
                    }
                    if (typeof formattedValue === "string") {
                        if (!Number.isNaN(formattedValue)) {
                            query.$or.push({
                                [path]: {
                                    [operatorKey]: parseFloat(formattedValue),
                                },
                            });
                        }
                    }
                }
                // If forced query
                if (overrideQuery) {
                    return {
                        value: query,
                    };
                }
                // Some operators like 'near' need to define a full query
                // so if there is no operator key, just return the value
                if (!operatorKey) {
                    return {
                        path,
                        value: formattedValue,
                    };
                }
                return {
                    path,
                    value: { [operatorKey]: formattedValue },
                };
            }
        }
        return undefined;
    }
}
// This plugin asynchronously builds a list of Mongoose query constraints
// which can then be used in subsequent Mongoose queries.
function buildQueryPlugin(schema) {
    const modifiedSchema = schema;
    async function buildQuery(rawParams, locale) {
        const paramParser = new ParamParser(this, rawParams, locale);
        const params = await paramParser.parse();
        return params.searchParams;
    }
    modifiedSchema.statics.buildQuery = buildQuery;
}
exports.default = buildQueryPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRRdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb25nb29zZS9idWlsZFF1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6QywwREFBa0M7QUFDbEMsd0RBQWlEO0FBQ2pELDREQUF5RDtBQUV6RCxpRUFBOEQ7QUFDOUQsK0NBQTRDO0FBQzVDLHFFQUE4RDtBQUU5RCxNQUFNLGNBQWMsR0FBRztJQUNyQixNQUFNO0lBQ04sVUFBVTtJQUNWLElBQUk7SUFDSixLQUFLO0lBQ0wsUUFBUTtJQUNSLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxZQUFZO0lBQ1osUUFBUTtJQUNSLFFBQVE7SUFDUixNQUFNO0NBQ1AsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLEtBQUssRUFBRSxFQUFFO0lBQ1QsSUFBSSxFQUFFLElBQUk7Q0FDWCxDQUFDO0FBbUJGLE1BQU0sV0FBVztJQWNmLFlBQVksS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFjO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFlBQVksRUFBRSxFQUFFO1lBQ2hCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFFRCx1Q0FBdUM7SUFFdkMsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDdEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO29CQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQ3JCLENBQUM7aUJBQ0g7cUJBQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO29CQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QzthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU07UUFDOUIsSUFBSSxNQUFNLEdBQUcsRUFBc0IsQ0FBQztRQUNwQyx1RUFBdUU7UUFDdkUsS0FBSyxNQUFNLGNBQWMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELElBQUksY0FBYyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtnQkFDMUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUN4RCxhQUFhLENBQ2QsQ0FBQztnQkFDRixJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7YUFDckU7aUJBQU0sSUFDTCxjQUFjLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSTtnQkFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFDckM7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7YUFDbEU7aUJBQU07Z0JBQ0wsd0VBQXdFO2dCQUN4RSxrRUFBa0U7Z0JBQ2xFLDhFQUE4RTtnQkFDOUUsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtvQkFDckMsS0FBSyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO3dCQUNqRCxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7NEJBQ3JDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDakIsY0FBYyxFQUNkLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFDdkIsUUFBUSxDQUNULENBQUM7NEJBRUYsSUFBSSxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxLQUFLLE1BQUksV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksQ0FBQSxFQUFFO2dDQUMzQyxNQUFNLEdBQUc7b0NBQ1AsR0FBRyxNQUFNO29DQUNULENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLO2lDQUN0QyxDQUFDOzZCQUNIO2lDQUFNLElBQUksT0FBTyxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxLQUFLLENBQUEsS0FBSyxRQUFRLEVBQUU7Z0NBQ2pELE1BQU0sR0FBRyxJQUFBLG1CQUFTLEVBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0NBQzVDLFVBQVUsRUFBRSwyQkFBWTtpQ0FDekIsQ0FBQyxDQUFDOzZCQUNKO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBVTtRQUNuQyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUMvQiw2RUFBNkU7UUFDN0UsNkNBQTZDO1FBQzdDLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1lBQ2xDLHNEQUFzRDtZQUN0RCxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtnQkFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELHlEQUF5RDtJQUN6RCxtRkFBbUY7SUFFbkYsaUJBQWlCLENBQ2YsS0FBc0IsRUFDdEIsWUFBb0IsRUFDcEIsUUFBUTtRQUVSLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDekIsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssR0FBa0I7WUFDekI7Z0JBQ0UsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsS0FBSzthQUNOO1NBQ0YsQ0FBQztRQUVGLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsa0JBQWtCLENBQUM7WUFFcEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzFELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFM0QsSUFBSSxxQkFBcUIsS0FBSyxRQUFRLEVBQUU7Z0JBQ3RDLGtCQUFrQixDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTVDLElBQUksaUJBQWlCLElBQUkscUJBQXFCLEtBQUssa0JBQWtCLEVBQUU7Z0JBQ3JFLE1BQU0sd0JBQXdCLEdBQzVCLElBQUEsMkNBQW9CLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFMUMsSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLEVBQUU7b0JBQ3RDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxXQUFXLElBQUksZUFBZSxFQUFFLENBQUM7b0JBQ2xFLE1BQU0sNEJBQTRCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDOUMscUJBQXFCLENBQ3RCLENBQUM7b0JBRUYsSUFBSSw0QkFBNEIsRUFBRTt3QkFDaEMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQzt3QkFDdEMsT0FBTyxJQUFJLENBQUM7cUJBQ2I7b0JBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNuRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRXBELElBQUksbUJBQW1CLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTt3QkFDOUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQzt3QkFDckMsT0FBTyxJQUFJLENBQUM7cUJBQ2I7aUJBQ0Y7Z0JBRUQsa0JBQWtCLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDdEMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLE1BQU0sc0JBQXNCLEdBQUcsSUFBQSwyQ0FBb0IsRUFBQyxlQUFlLENBQUMsQ0FBQztnQkFDckUsSUFBSSxPQUFPLHNCQUFzQixDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQ2xELE1BQU0sUUFBUSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBUSxDQUFDO29CQUVuRSxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUVuQyxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFdEQsS0FBSyxHQUFHO3dCQUNOLEdBQUcsS0FBSzt3QkFDUixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQztxQkFDN0QsQ0FBQztvQkFFRixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBRUQsSUFBSSxRQUFRLEtBQUssTUFBTSxJQUFJLHFCQUFxQixLQUFLLGtCQUFrQixFQUFFO2dCQUN2RSxrQkFBa0IsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2FBQ3ZDO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxLQUFLLENBQUMsZ0JBQWdCLENBQ3BCLE1BQU0sRUFDTixZQUFZLEVBQ1osR0FBRyxFQUNILFFBQVE7UUFFUiw0REFBNEQ7UUFDNUQsSUFBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSSxhQUFhLEtBQUssSUFBSTtZQUFFLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFbEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUM1QyxJQUFJLENBQUMsS0FBSyxFQUNWLGFBQWEsRUFDYixRQUFRLENBQ1QsQ0FBQztRQUVGLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDO1FBRW5DLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLGFBQWEsR0FBRyxJQUFBLDJDQUFvQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sY0FBYyxHQUFHLElBQUEsMkNBQWtCLEVBQ3ZDLFVBQVUsRUFDVixJQUFJLEVBQ0osUUFBUSxFQUNSLEdBQUcsQ0FDSixDQUFDO1lBRUYsdURBQXVEO1lBQ3ZELG1EQUFtRDtZQUNuRCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QiwwQ0FBMEM7Z0JBQzFDLDZCQUE2QjtnQkFDN0IsTUFBTSx1QkFBdUIsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVuRSxNQUFNLHdCQUF3QixHQUFHO29CQUMvQixLQUFLLEVBQUUsRUFBRTtpQkFDSyxDQUFDO2dCQUVqQixNQUFNLGlCQUFpQixHQUFHLE1BQU0sdUJBQXVCLENBQUMsTUFBTSxDQUM1RCxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxVQUFVLENBQUM7b0JBRTFDLCtCQUErQjtvQkFDL0IsK0NBQStDO29CQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ1gsTUFBTSxRQUFRLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUN4Qzs0QkFDRSxLQUFLLEVBQUU7Z0NBQ0wsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQ0FDVCxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUc7aUNBQ2hCOzZCQUNGO3lCQUNGLEVBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDO3dCQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7d0JBRTlELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFFcEQsSUFBSSx1QkFBdUIsQ0FBQyxNQUFNLEtBQUssQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUVsQyxPQUFPOzRCQUNMLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO3lCQUN4QixDQUFDO3FCQUNIO29CQUVELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztvQkFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFFOUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUVwRCw4QkFBOEI7b0JBQzlCLHFDQUFxQztvQkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLHVCQUF1QixDQUFDLE1BQU0sRUFBRTt3QkFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3FCQUNqQztvQkFFRCxPQUFPO3dCQUNMLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUU7eUJBQ2I7cUJBQ0YsQ0FBQztnQkFDSixDQUFDLEVBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUMxQyxDQUFDO2dCQUVGLE9BQU8saUJBQWlCLENBQUM7YUFDMUI7WUFFRCxJQUFJLFFBQVEsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUxQyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksS0FBSyxDQUFDO2dCQUVWLDREQUE0RDtnQkFDNUQsZ0RBQWdEO2dCQUNoRCx3REFBd0Q7Z0JBQ3hELElBQUksYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2pFLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBRXJCLEtBQUssR0FBRzt3QkFDTixHQUFHLEVBQUU7NEJBQ0g7Z0NBQ0UsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQ0FDTixDQUFDLFdBQVcsQ0FBQyxFQUFFLGNBQWM7aUNBQzlCOzZCQUNGO3lCQUNGO3FCQUNGLENBQUM7b0JBRUYsSUFDRSxPQUFPLGNBQWMsS0FBSyxRQUFRO3dCQUNsQyxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVE7NEJBQ2pDLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsRUFDbEQ7d0JBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7NEJBQ2IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FDTixDQUFDLFdBQVcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUU7NkJBQ3pDO3lCQUNGLENBQUMsQ0FBQztxQkFDSjtvQkFFRCxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTt3QkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7NEJBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dDQUNiLENBQUMsSUFBSSxDQUFDLEVBQUU7b0NBQ04sQ0FBQyxXQUFXLENBQUMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDO2lDQUMxQzs2QkFDRixDQUFDLENBQUM7eUJBQ0o7cUJBQ0Y7aUJBQ0Y7Z0JBRUQsa0JBQWtCO2dCQUNsQixJQUFJLGFBQWEsRUFBRTtvQkFDakIsT0FBTzt3QkFDTCxLQUFLLEVBQUUsS0FBSztxQkFDYixDQUFDO2lCQUNIO2dCQUVELHlEQUF5RDtnQkFDekQsd0RBQXdEO2dCQUN4RCxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNoQixPQUFPO3dCQUNMLElBQUk7d0JBQ0osS0FBSyxFQUFFLGNBQWM7cUJBQ3RCLENBQUM7aUJBQ0g7Z0JBRUQsT0FBTztvQkFDTCxJQUFJO29CQUNKLEtBQUssRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFO2lCQUN6QyxDQUFDO2FBQ0g7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQUNELHlFQUF5RTtBQUN6RSx5REFBeUQ7QUFDekQsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNO0lBQzlCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUM5QixLQUFLLFVBQVUsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNO1FBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekMsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFDRCxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDakQsQ0FBQztBQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=