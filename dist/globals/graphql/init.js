"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const graphql_1 = require("graphql");
const pluralize_1 = require("pluralize");
const formatName_1 = __importDefault(require("../../graphql/utilities/formatName"));
const buildGlobalFields_1 = require("../../versions/buildGlobalFields");
const buildPaginatedListType_1 = __importDefault(require("../../graphql/schema/buildPaginatedListType"));
const findOne_1 = __importDefault(require("./resolvers/findOne"));
const update_1 = __importDefault(require("./resolvers/update"));
const findVersionByID_1 = __importDefault(require("./resolvers/findVersionByID"));
const findVersions_1 = __importDefault(require("./resolvers/findVersions"));
const restoreVersion_1 = __importDefault(require("./resolvers/restoreVersion"));
const buildObjectType_1 = __importDefault(require("../../graphql/schema/buildObjectType"));
const buildMutationInputType_1 = __importDefault(require("../../graphql/schema/buildMutationInputType"));
const buildWhereInputType_1 = __importDefault(require("../../graphql/schema/buildWhereInputType"));
const formatLabels_1 = require("../../utilities/formatLabels");
function initGlobalsGraphQL(payload) {
    if (payload.config.globals) {
        Object.keys(payload.globals.config).forEach((slug) => {
            var _a;
            const global = payload.globals.config[slug];
            const { fields, versions, } = global;
            const formattedName = ((_a = global.graphQL) === null || _a === void 0 ? void 0 : _a.name) ? global.graphQL.name : (0, pluralize_1.singular)((0, formatLabels_1.toWords)(global.slug, true));
            global.graphQL = {};
            const forceNullableObjectType = Boolean(versions === null || versions === void 0 ? void 0 : versions.drafts);
            global.graphQL.type = (0, buildObjectType_1.default)({
                payload,
                name: formattedName,
                parentName: formattedName,
                fields,
                forceNullable: forceNullableObjectType,
            });
            global.graphQL.mutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, formattedName, fields, formattedName));
            payload.Query.fields[formattedName] = {
                type: global.graphQL.type,
                args: {
                    draft: { type: graphql_1.GraphQLBoolean },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                },
                resolve: (0, findOne_1.default)(global),
            };
            payload.Mutation.fields[`update${formattedName}`] = {
                type: global.graphQL.type,
                args: {
                    data: { type: global.graphQL.mutationInputType },
                    draft: { type: graphql_1.GraphQLBoolean },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                    } : {}),
                },
                resolve: (0, update_1.default)(global),
            };
            if (global.versions) {
                const versionGlobalFields = [
                    ...(0, buildGlobalFields_1.buildVersionGlobalFields)(global),
                    {
                        name: 'id',
                        type: 'text',
                    },
                    {
                        name: 'createdAt',
                        label: 'Created At',
                        type: 'date',
                    },
                    {
                        name: 'updatedAt',
                        label: 'Updated At',
                        type: 'date',
                    },
                ];
                global.graphQL.versionType = (0, buildObjectType_1.default)({
                    payload,
                    name: `${formattedName}Version`,
                    parentName: `${formattedName}Version`,
                    fields: versionGlobalFields,
                    forceNullable: forceNullableObjectType,
                });
                payload.Query.fields[`version${(0, formatName_1.default)(formattedName)}`] = {
                    type: global.graphQL.versionType,
                    args: {
                        id: { type: graphql_1.GraphQLString },
                        ...(payload.config.localization ? {
                            locale: { type: payload.types.localeInputType },
                            fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                        } : {}),
                    },
                    resolve: (0, findVersionByID_1.default)(global),
                };
                payload.Query.fields[`versions${formattedName}`] = {
                    type: (0, buildPaginatedListType_1.default)(`versions${(0, formatName_1.default)(formattedName)}`, global.graphQL.versionType),
                    args: {
                        where: {
                            type: (0, buildWhereInputType_1.default)(`versions${formattedName}`, versionGlobalFields, `versions${formattedName}`),
                        },
                        ...(payload.config.localization ? {
                            locale: { type: payload.types.localeInputType },
                            fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                        } : {}),
                        page: { type: graphql_1.GraphQLInt },
                        limit: { type: graphql_1.GraphQLInt },
                        sort: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, findVersions_1.default)(global),
                };
                payload.Mutation.fields[`restoreVersion${(0, formatName_1.default)(formattedName)}`] = {
                    type: global.graphQL.type,
                    args: {
                        id: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, restoreVersion_1.default)(global),
                };
            }
        });
    }
}
exports.default = initGlobalsGraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nbG9iYWxzL2dyYXBocWwvaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNDQUFzQztBQUN0QyxxQ0FBb0Y7QUFDcEYseUNBQXFDO0FBQ3JDLG9GQUE0RDtBQUM1RCx3RUFBNEU7QUFDNUUseUdBQWlGO0FBQ2pGLGtFQUFrRDtBQUNsRCxnRUFBZ0Q7QUFDaEQsa0ZBQWtFO0FBQ2xFLDRFQUE0RDtBQUM1RCxnRkFBZ0U7QUFFaEUsMkZBQW1FO0FBQ25FLHlHQUFpRjtBQUNqRixtR0FBMkU7QUFFM0UsK0RBQXVEO0FBR3ZELFNBQVMsa0JBQWtCLENBQUMsT0FBZ0I7SUFDMUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQ25ELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLE1BQU0sRUFDSixNQUFNLEVBQ04sUUFBUSxHQUNULEdBQUcsTUFBTSxDQUFDO1lBRVgsTUFBTSxhQUFhLEdBQUcsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLElBQUksRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUEsb0JBQVEsRUFBQyxJQUFBLHNCQUFPLEVBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRXhHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBc0MsQ0FBQztZQUV4RCxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsTUFBTSxDQUFDLENBQUM7WUFF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