"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const graphql_scalars_1 = require("graphql-scalars");
const graphql_1 = require("graphql");
const formatName_1 = __importDefault(require("../../graphql/utilities/formatName"));
const buildPaginatedListType_1 = __importDefault(require("../../graphql/schema/buildPaginatedListType"));
const buildMutationInputType_1 = __importStar(require("../../graphql/schema/buildMutationInputType"));
const buildCollectionFields_1 = require("../../versions/buildCollectionFields");
const create_1 = __importDefault(require("./resolvers/create"));
const update_1 = __importDefault(require("./resolvers/update"));
const find_1 = __importDefault(require("./resolvers/find"));
const findByID_1 = __importDefault(require("./resolvers/findByID"));
const findVersionByID_1 = __importDefault(require("./resolvers/findVersionByID"));
const findVersions_1 = __importDefault(require("./resolvers/findVersions"));
const restoreVersion_1 = __importDefault(require("./resolvers/restoreVersion"));
const me_1 = __importDefault(require("../../auth/graphql/resolvers/me"));
const init_1 = __importDefault(require("../../auth/graphql/resolvers/init"));
const login_1 = __importDefault(require("../../auth/graphql/resolvers/login"));
const logout_1 = __importDefault(require("../../auth/graphql/resolvers/logout"));
const forgotPassword_1 = __importDefault(require("../../auth/graphql/resolvers/forgotPassword"));
const resetPassword_1 = __importDefault(require("../../auth/graphql/resolvers/resetPassword"));
const verifyEmail_1 = __importDefault(require("../../auth/graphql/resolvers/verifyEmail"));
const unlock_1 = __importDefault(require("../../auth/graphql/resolvers/unlock"));
const refresh_1 = __importDefault(require("../../auth/graphql/resolvers/refresh"));
const types_1 = require("../../fields/config/types");
const buildObjectType_1 = __importDefault(require("../../graphql/schema/buildObjectType"));
const buildWhereInputType_1 = __importDefault(require("../../graphql/schema/buildWhereInputType"));
const delete_1 = __importDefault(require("./resolvers/delete"));
const formatLabels_1 = require("../../utilities/formatLabels");
function initCollectionsGraphQL(payload) {
    Object.keys(payload.collections).forEach((slug) => {
        const collection = payload.collections[slug];
        const { config: { graphQL = {}, fields, timestamps, versions, }, } = collection;
        let singularName;
        let pluralName;
        const fromSlug = (0, formatLabels_1.formatNames)(collection.config.slug);
        if (graphQL.singularName) {
            singularName = (0, formatLabels_1.toWords)(graphQL.singularName, true);
        }
        else {
            singularName = fromSlug.singular;
        }
        if (graphQL.pluralName) {
            pluralName = (0, formatLabels_1.toWords)(graphQL.pluralName, true);
        }
        else {
            pluralName = fromSlug.plural;
        }
        // For collections named 'Media' or similar,
        // there is a possibility that the singular name
        // will equal the plural name. Append `all` to the beginning
        // of potential conflicts
        if (singularName === pluralName) {
            pluralName = `all${singularName}`;
        }
        collection.graphQL = {};
        const idField = fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
        const idType = (0, buildMutationInputType_1.getCollectionIDType)(collection.config);
        const baseFields = {};
        const whereInputFields = [
            ...fields,
        ];
        if (!idField) {
            baseFields.id = { type: idType };
            whereInputFields.push({
                name: 'id',
                type: 'text',
            });
        }
        if (timestamps) {
            baseFields.createdAt = {
                type: new graphql_1.GraphQLNonNull(graphql_scalars_1.DateTimeResolver),
            };
            baseFields.updatedAt = {
                type: new graphql_1.GraphQLNonNull(graphql_scalars_1.DateTimeResolver),
            };
            whereInputFields.push({
                name: 'createdAt',
                label: 'Created At',
                type: 'date',
            });
            whereInputFields.push({
                name: 'updatedAt',
                label: 'Updated At',
                type: 'date',
            });
        }
        const forceNullableObjectType = Boolean(versions === null || versions === void 0 ? void 0 : versions.drafts);
        collection.graphQL.type = (0, buildObjectType_1.default)({
            payload,
            name: singularName,
            parentName: singularName,
            fields,
            baseFields,
            forceNullable: forceNullableObjectType,
        });
        collection.graphQL.whereInputType = (0, buildWhereInputType_1.default)(singularName, whereInputFields, singularName);
        if (collection.config.auth && !collection.config.auth.disableLocalStrategy) {
            fields.push({
                name: 'password',
                label: 'Password',
                type: 'text',
                required: true,
            });
        }
        collection.graphQL.mutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, singularName, fields, singularName));
        collection.graphQL.updateMutationInputType = new graphql_1.GraphQLNonNull((0, buildMutationInputType_1.default)(payload, `${singularName}Update`, fields.filter((field) => !((0, types_1.fieldAffectsData)(field) && field.name === 'id')), `${singularName}Update`, true));
        payload.Query.fields[singularName] = {
            type: collection.graphQL.type,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(idType) },
                draft: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                    fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                } : {}),
            },
            resolve: (0, findByID_1.default)(collection),
        };
        payload.Query.fields[pluralName] = {
            type: (0, buildPaginatedListType_1.default)(pluralName, collection.graphQL.type),
            args: {
                where: { type: collection.graphQL.whereInputType },
                draft: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                    fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                } : {}),
                page: { type: graphql_1.GraphQLInt },
                limit: { type: graphql_1.GraphQLInt },
                sort: { type: graphql_1.GraphQLString },
            },
            resolve: (0, find_1.default)(collection),
        };
        payload.Mutation.fields[`create${singularName}`] = {
            type: collection.graphQL.type,
            args: {
                data: { type: collection.graphQL.mutationInputType },
                draft: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                } : {}),
            },
            resolve: (0, create_1.default)(collection),
        };
        payload.Mutation.fields[`update${singularName}`] = {
            type: collection.graphQL.type,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(idType) },
                data: { type: collection.graphQL.updateMutationInputType },
                draft: { type: graphql_1.GraphQLBoolean },
                autosave: { type: graphql_1.GraphQLBoolean },
                ...(payload.config.localization ? {
                    locale: { type: payload.types.localeInputType },
                } : {}),
            },
            resolve: (0, update_1.default)(collection),
        };
        payload.Mutation.fields[`delete${singularName}`] = {
            type: collection.graphQL.type,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(idType) },
            },
            resolve: (0, delete_1.default)(collection),
        };
        if (collection.config.versions) {
            const versionCollectionFields = [
                ...(0, buildCollectionFields_1.buildVersionCollectionFields)(collection.config),
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
            collection.graphQL.versionType = (0, buildObjectType_1.default)({
                payload,
                name: `${singularName}Version`,
                fields: versionCollectionFields,
                parentName: `${singularName}Version`,
                forceNullable: forceNullableObjectType,
            });
            payload.Query.fields[`version${(0, formatName_1.default)(singularName)}`] = {
                type: collection.graphQL.versionType,
                args: {
                    id: { type: graphql_1.GraphQLString },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                },
                resolve: (0, findVersionByID_1.default)(collection),
            };
            payload.Query.fields[`versions${pluralName}`] = {
                type: (0, buildPaginatedListType_1.default)(`versions${(0, formatName_1.default)(pluralName)}`, collection.graphQL.versionType),
                args: {
                    where: {
                        type: (0, buildWhereInputType_1.default)(`versions${singularName}`, versionCollectionFields, `versions${singularName}`),
                    },
                    ...(payload.config.localization ? {
                        locale: { type: payload.types.localeInputType },
                        fallbackLocale: { type: payload.types.fallbackLocaleInputType },
                    } : {}),
                    page: { type: graphql_1.GraphQLInt },
                    limit: { type: graphql_1.GraphQLInt },
                    sort: { type: graphql_1.GraphQLString },
                },
                resolve: (0, findVersions_1.default)(collection),
            };
            payload.Mutation.fields[`restoreVersion${(0, formatName_1.default)(singularName)}`] = {
                type: collection.graphQL.type,
                args: {
                    id: { type: graphql_1.GraphQLString },
                },
                resolve: (0, restoreVersion_1.default)(collection),
            };
        }
        if (collection.config.auth) {
            const authFields = collection.config.auth.disableLocalStrategy ? [] : [{
                    name: 'email',
                    type: 'email',
                    required: true,
                }];
            collection.graphQL.JWT = (0, buildObjectType_1.default)({
                payload,
                name: (0, formatName_1.default)(`${slug}JWT`),
                fields: [
                    ...collection.config.fields.filter((field) => (0, types_1.fieldAffectsData)(field) && field.saveToJWT),
                    ...authFields,
                    {
                        name: 'collection',
                        type: 'text',
                        required: true,
                    },
                ],
                parentName: (0, formatName_1.default)(`${slug}JWT`),
            });
            payload.Query.fields[`me${singularName}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}Me`),
                    fields: {
                        token: {
                            type: graphql_1.GraphQLString,
                        },
                        user: {
                            type: collection.graphQL.type,
                        },
                        exp: {
                            type: graphql_1.GraphQLInt,
                        },
                        collection: {
                            type: graphql_1.GraphQLString,
                        },
                    },
                }),
                resolve: (0, me_1.default)(collection),
            };
            payload.Query.fields[`initialized${singularName}`] = {
                type: graphql_1.GraphQLBoolean,
                resolve: (0, init_1.default)(collection),
            };
            payload.Mutation.fields[`refreshToken${singularName}`] = {
                type: new graphql_1.GraphQLObjectType({
                    name: (0, formatName_1.default)(`${slug}Refreshed${singularName}`),
                    fields: {
                        user: {
                            type: collection.graphQL.JWT,
                        },
                        refreshedToken: {
                            type: graphql_1.GraphQLString,
                        },
                        exp: {
                            type: graphql_1.GraphQLInt,
                        },
                    },
                }),
                args: {
                    token: { type: graphql_1.GraphQLString },
                },
                resolve: (0, refresh_1.default)(collection),
            };
            payload.Mutation.fields[`logout${singularName}`] = {
                type: graphql_1.GraphQLString,
                resolve: (0, logout_1.default)(collection),
            };
            if (!collection.config.auth.disableLocalStrategy) {
                if (collection.config.auth.maxLoginAttempts > 0) {
                    payload.Mutation.fields[`unlock${singularName}`] = {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
                        args: {
                            email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                        },
                        resolve: (0, unlock_1.default)(collection),
                    };
                }
                payload.Mutation.fields[`login${singularName}`] = {
                    type: new graphql_1.GraphQLObjectType({
                        name: (0, formatName_1.default)(`${slug}LoginResult`),
                        fields: {
                            token: {
                                type: graphql_1.GraphQLString,
                            },
                            user: {
                                type: collection.graphQL.type,
                            },
                            exp: {
                                type: graphql_1.GraphQLInt,
                            },
                        },
                    }),
                    args: {
                        email: { type: graphql_1.GraphQLString },
                        password: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, login_1.default)(collection),
                };
                payload.Mutation.fields[`forgotPassword${singularName}`] = {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
                    args: {
                        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                        disableEmail: { type: graphql_1.GraphQLBoolean },
                        expiration: { type: graphql_1.GraphQLInt },
                    },
                    resolve: (0, forgotPassword_1.default)(collection),
                };
                payload.Mutation.fields[`resetPassword${singularName}`] = {
                    type: new graphql_1.GraphQLObjectType({
                        name: (0, formatName_1.default)(`${slug}ResetPassword`),
                        fields: {
                            token: { type: graphql_1.GraphQLString },
                            user: { type: collection.graphQL.type },
                        },
                    }),
                    args: {
                        token: { type: graphql_1.GraphQLString },
                        password: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, resetPassword_1.default)(collection),
                };
                payload.Mutation.fields[`verifyEmail${singularName}`] = {
                    type: graphql_1.GraphQLBoolean,
                    args: {
                        token: { type: graphql_1.GraphQLString },
                    },
                    resolve: (0, verifyEmail_1.default)(collection),
                };
            }
        }
    });
}
exports.default = initCollectionsGraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9ncmFwaHFsL2luaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxxREFBbUQ7QUFDbkQscUNBTWlCO0FBRWpCLG9GQUE0RDtBQUM1RCx5R0FBaUY7QUFDakYsc0dBQTBHO0FBQzFHLGdGQUFvRjtBQUNwRixnRUFBZ0Q7QUFDaEQsZ0VBQWdEO0FBQ2hELDREQUE0QztBQUM1QyxvRUFBb0Q7QUFDcEQsa0ZBQWtFO0FBQ2xFLDRFQUE0RDtBQUM1RCxnRkFBZ0U7QUFDaEUseUVBQWlEO0FBQ2pELDZFQUFxRDtBQUNyRCwrRUFBdUQ7QUFDdkQsaUZBQXlEO0FBQ3pELGlHQUF5RTtBQUN6RSwrRkFBdUU7QUFDdkUsMkZBQW1FO0FBQ25FLGlGQUF5RDtBQUN6RCxtRkFBMkQ7QUFFM0QscURBQW9FO0FBQ3BFLDJGQUF5RjtBQUN6RixtR0FBMkU7QUFDM0UsZ0VBQW1EO0FBQ25ELCtEQUFvRTtBQUdwRSxTQUFTLHNCQUFzQixDQUFDLE9BQWdCO0lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hELE1BQU0sVUFBVSxHQUFlLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUNOLE9BQU8sR0FBRyxFQUEwQyxFQUNwRCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsR0FDVCxHQUNGLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxZQUFZLENBQUM7UUFDakIsSUFBSSxVQUFVLENBQUM7UUFDZixNQUFNLFFBQVEsR0FBRyxJQUFBLDBCQUFXLEVBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEIsWUFBWSxHQUFHLElBQUEsc0JBQU8sRUFBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO2FBQU07WUFDTCxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztTQUNsQztRQUNELElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN0QixVQUFVLEdBQUcsSUFBQSxzQkFBTyxFQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNMLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQzlCO1FBRUQsNENBQTRDO1FBQzVDLGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQseUJBQXlCO1FBQ3pCLElBQUksWUFBWSxLQUFLLFVBQVUsRUFBRTtZQUMvQixVQUFVLEdBQUcsTUFBTSxZQUFZLEVBQUUsQ0FBQztTQUNuQztRQUVELFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBMkIsQ0FBQztRQUVqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDdkYsTUFBTSxNQUFNLEdBQUcsSUFBQSw0Q0FBbUIsRUFBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEQsTUFBTSxVQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUV4QyxNQUFNLGdCQUFnQixHQUFHO1lBQ3ZCLEdBQUcsTUFBTTtTQUNWLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUNqQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxTQUFTLEdBQUc7Z0JBQ3JCLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsa0NBQWdCLENBQUM7YUFDM0MsQ0FBQztZQUVGLFVBQVUsQ0FBQyxTQUFTLEdBQUc7Z0JBQ3JCLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsa0NBQWdCLENBQUM7YUFDM0MsQ0FBQztZQUVGLGdCQUFnQixDQUFDLElBQUksQ0FBQztnQkFDcEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQztZQUVILGdCQUFnQixDQUFDLElBQUksQ0FBQztnQkFDcEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTFELFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUEseUJBQWUsRUFBQztZQUN4QyxPQUFPO1lBQ1AsSUFBSSxFQUFFLFlBQVk7WUFDbEIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsTUFBTTtZQUNOLFVBQVU7WUFDVixhQUFhLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUEsNkJBQW1CLEVBQ3JELFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsWUFBWSxDQUNiLENBQUM7UUFFRixJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLElBQUksd0JBQWMsQ0FBQyxJQUFBLGdDQUFzQixFQUM5RSxPQUFPLEVBQ1AsWUFBWSxFQUNaLE1BQU0sRUFDTixZQUFZLENBQ2IsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLHdCQUFjLENBQUMsSUFBQSxnQ0FBc0IsRUFDcEYsT0FBTyxFQUNQLEdBQUcsWUFBWSxRQUFRLEVBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsRUFDM0UsR0FBRyxZQUFZLFFBQVEsRUFDdkIsSUFBSSxDQUNMLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHO1lBQ25DLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDN0IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBYyxFQUFFO2dCQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQy9DLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFO2lCQUNoRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDUjtZQUNELE9BQU8sRUFBRSxJQUFBLGtCQUFnQixFQUFDLFVBQVUsQ0FBQztTQUN0QyxDQUFDO1FBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDakMsSUFBSSxFQUFFLElBQUEsZ0NBQXNCLEVBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pFLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQ2xELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBYyxFQUFFO2dCQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQy9DLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFO2lCQUNoRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFVLEVBQUU7Z0JBQzFCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBVSxFQUFFO2dCQUMzQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTthQUM5QjtZQUNELE9BQU8sRUFBRSxJQUFBLGNBQVksRUFBQyxVQUFVLENBQUM7U0FDbEMsQ0FBQztRQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsWUFBWSxFQUFFLENBQUMsR0FBRztZQUNqRCxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzdCLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtnQkFDcEQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFjLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtpQkFDaEQsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ1I7WUFDRCxPQUFPLEVBQUUsSUFBQSxnQkFBYyxFQUFDLFVBQVUsQ0FBQztTQUNwQyxDQUFDO1FBRUYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZLEVBQUUsQ0FBQyxHQUFHO1lBQ2pELElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDN0IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFO2dCQUMxRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQWMsRUFBRTtnQkFDL0IsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUFjLEVBQUU7Z0JBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtpQkFDaEQsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ1I7WUFDRCxPQUFPLEVBQUUsSUFBQSxnQkFBYyxFQUFDLFVBQVUsQ0FBQztTQUNwQyxDQUFDO1FBRUYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZLEVBQUUsQ0FBQyxHQUFHO1lBQ2pELElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDN0IsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDekM7WUFDRCxPQUFPLEVBQUUsSUFBQSxnQkFBaUIsRUFBQyxVQUFVLENBQUM7U0FDdkMsQ0FBQztRQUVGLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDOUIsTUFBTSx1QkFBdUIsR0FBWTtnQkFDdkMsR0FBRyxJQUFBLG9EQUE0QixFQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xEO29CQUNFLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNEO29CQUNFLElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsTUFBTTtpQkFDYjthQUNGLENBQUM7WUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFBLHlCQUFlLEVBQUM7Z0JBQy9DLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLEdBQUcsWUFBWSxTQUFTO2dCQUM5QixNQUFNLEVBQUUsdUJBQXVCO2dCQUMvQixVQUFVLEVBQUUsR0FBRyxZQUFZLFNBQVM7Z0JBQ3BDLGFBQWEsRUFBRSx1QkFBdUI7YUFDdkMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFBLG9CQUFVLEVBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHO2dCQUMzRCxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUNwQyxJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7b0JBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTt3QkFDL0MsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUU7cUJBQ2hFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpQkFDUjtnQkFDRCxPQUFPLEVBQUUsSUFBQSx5QkFBdUIsRUFBQyxVQUFVLENBQUM7YUFDN0MsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsVUFBVSxFQUFFLENBQUMsR0FBRztnQkFDOUMsSUFBSSxFQUFFLElBQUEsZ0NBQXNCLEVBQUMsV0FBVyxJQUFBLG9CQUFVLEVBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkFDakcsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsSUFBQSw2QkFBbUIsRUFDdkIsV0FBVyxZQUFZLEVBQUUsRUFDekIsdUJBQXVCLEVBQ3ZCLFdBQVcsWUFBWSxFQUFFLENBQzFCO3FCQUNGO29CQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTt3QkFDL0MsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUU7cUJBQ2hFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRTtvQkFDMUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFVLEVBQUU7b0JBQzNCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSx1QkFBYSxFQUFFO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUUsSUFBQSxzQkFBb0IsRUFBQyxVQUFVLENBQUM7YUFDMUMsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixJQUFBLG9CQUFVLEVBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHO2dCQUNyRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUM3QixJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7aUJBQzVCO2dCQUNELE9BQU8sRUFBRSxJQUFBLHdCQUFzQixFQUFDLFVBQVUsQ0FBQzthQUM1QyxDQUFDO1NBQ0g7UUFFRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlFLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxPQUFPO29CQUNiLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUEseUJBQWUsRUFBQztnQkFDdkMsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxvQkFBVSxFQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7Z0JBQzlCLE1BQU0sRUFBRTtvQkFDTixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBQSx3QkFBZ0IsRUFBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUN6RixHQUFHLFVBQVU7b0JBQ2I7d0JBQ0UsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLElBQUksRUFBRSxNQUFNO3dCQUNaLFFBQVEsRUFBRSxJQUFJO3FCQUNmO2lCQUNGO2dCQUNELFVBQVUsRUFBRSxJQUFBLG9CQUFVLEVBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQzthQUNyQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFlBQVksRUFBRSxDQUFDLEdBQUc7Z0JBQzFDLElBQUksRUFBRSxJQUFJLDJCQUFpQixDQUFDO29CQUMxQixJQUFJLEVBQUUsSUFBQSxvQkFBVSxFQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7b0JBQzdCLE1BQU0sRUFBRTt3QkFDTixLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLHVCQUFhO3lCQUNwQjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSTt5QkFDOUI7d0JBQ0QsR0FBRyxFQUFFOzRCQUNILElBQUksRUFBRSxvQkFBVTt5QkFDakI7d0JBQ0QsVUFBVSxFQUFFOzRCQUNWLElBQUksRUFBRSx1QkFBYTt5QkFDcEI7cUJBQ0Y7aUJBQ0YsQ0FBQztnQkFDRixPQUFPLEVBQUUsSUFBQSxZQUFFLEVBQUMsVUFBVSxDQUFDO2FBQ3hCLENBQUM7WUFFRixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLFlBQVksRUFBRSxDQUFDLEdBQUc7Z0JBQ25ELElBQUksRUFBRSx3QkFBYztnQkFDcEIsT0FBTyxFQUFFLElBQUEsY0FBSSxFQUFDLFVBQVUsQ0FBQzthQUMxQixDQUFDO1lBRUYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxZQUFZLEVBQUUsQ0FBQyxHQUFHO2dCQUN2RCxJQUFJLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQztvQkFDMUIsSUFBSSxFQUFFLElBQUEsb0JBQVUsRUFBQyxHQUFHLElBQUksWUFBWSxZQUFZLEVBQUUsQ0FBQztvQkFDbkQsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3lCQUM3Qjt3QkFDRCxjQUFjLEVBQUU7NEJBQ2QsSUFBSSxFQUFFLHVCQUFhO3lCQUNwQjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0gsSUFBSSxFQUFFLG9CQUFVO3lCQUNqQjtxQkFDRjtpQkFDRixDQUFDO2dCQUNGLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTtpQkFDL0I7Z0JBQ0QsT0FBTyxFQUFFLElBQUEsaUJBQU8sRUFBQyxVQUFVLENBQUM7YUFDN0IsQ0FBQztZQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsWUFBWSxFQUFFLENBQUMsR0FBRztnQkFDakQsSUFBSSxFQUFFLHVCQUFhO2dCQUNuQixPQUFPLEVBQUUsSUFBQSxnQkFBTSxFQUFDLFVBQVUsQ0FBQzthQUM1QixDQUFDO1lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUNoRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRTtvQkFDL0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZLEVBQUUsQ0FBQyxHQUFHO3dCQUNqRCxJQUFJLEVBQUUsSUFBSSx3QkFBYyxDQUFDLHdCQUFjLENBQUM7d0JBQ3hDLElBQUksRUFBRTs0QkFDSixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSx3QkFBYyxDQUFDLHVCQUFhLENBQUMsRUFBRTt5QkFDbkQ7d0JBQ0QsT0FBTyxFQUFFLElBQUEsZ0JBQU0sRUFBQyxVQUFVLENBQUM7cUJBQzVCLENBQUM7aUJBQ0g7Z0JBRUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQyxHQUFHO29CQUNoRCxJQUFJLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQzt3QkFDMUIsSUFBSSxFQUFFLElBQUEsb0JBQVUsRUFBQyxHQUFHLElBQUksYUFBYSxDQUFDO3dCQUN0QyxNQUFNLEVBQUU7NEJBQ04sS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSx1QkFBYTs2QkFDcEI7NEJBQ0QsSUFBSSxFQUFFO2dDQUNKLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUk7NkJBQzlCOzRCQUNELEdBQUcsRUFBRTtnQ0FDSCxJQUFJLEVBQUUsb0JBQVU7NkJBQ2pCO3lCQUNGO3FCQUNGLENBQUM7b0JBQ0YsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSx1QkFBYSxFQUFFO3dCQUM5QixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTtxQkFDbEM7b0JBQ0QsT0FBTyxFQUFFLElBQUEsZUFBSyxFQUFDLFVBQVUsQ0FBQztpQkFDM0IsQ0FBQztnQkFFRixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsWUFBWSxFQUFFLENBQUMsR0FBRztvQkFDekQsSUFBSSxFQUFFLElBQUksd0JBQWMsQ0FBQyx3QkFBYyxDQUFDO29CQUN4QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksd0JBQWMsQ0FBQyx1QkFBYSxDQUFDLEVBQUU7d0JBQ2xELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBYyxFQUFFO3dCQUN0QyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRTtxQkFDakM7b0JBQ0QsT0FBTyxFQUFFLElBQUEsd0JBQWMsRUFBQyxVQUFVLENBQUM7aUJBQ3BDLENBQUM7Z0JBRUYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLFlBQVksRUFBRSxDQUFDLEdBQUc7b0JBQ3hELElBQUksRUFBRSxJQUFJLDJCQUFpQixDQUFDO3dCQUMxQixJQUFJLEVBQUUsSUFBQSxvQkFBVSxFQUFDLEdBQUcsSUFBSSxlQUFlLENBQUM7d0JBQ3hDLE1BQU0sRUFBRTs0QkFDTixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTs0QkFDOUIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO3lCQUN4QztxQkFDRixDQUFDO29CQUNGLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUJBQWEsRUFBRTt3QkFDOUIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7cUJBQ2xDO29CQUNELE9BQU8sRUFBRSxJQUFBLHVCQUFhLEVBQUMsVUFBVSxDQUFDO2lCQUNuQyxDQUFDO2dCQUVGLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsWUFBWSxFQUFFLENBQUMsR0FBRztvQkFDdEQsSUFBSSxFQUFFLHdCQUFjO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUU7cUJBQy9CO29CQUNELE9BQU8sRUFBRSxJQUFBLHFCQUFXLEVBQUMsVUFBVSxDQUFDO2lCQUNqQyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELGtCQUFlLHNCQUFzQixDQUFDIn0=