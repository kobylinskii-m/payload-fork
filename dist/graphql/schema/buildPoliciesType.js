"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_type_json_1 = require("graphql-type-json");
const graphql_1 = require("graphql");
const formatName_1 = __importDefault(require("../utilities/formatName"));
const formatLabels_1 = require("../../utilities/formatLabels");
const buildFields = (label, fieldsToBuild) => fieldsToBuild.reduce((builtFields, field) => {
    if (!field.hidden) {
        if (field.name) {
            const fieldName = (0, formatName_1.default)(field.name);
            const objectTypeFields = ['create', 'read', 'update', 'delete'].reduce((operations, operation) => {
                const capitalizedOperation = operation.charAt(0).toUpperCase() + operation.slice(1);
                return {
                    ...operations,
                    [operation]: {
                        type: new graphql_1.GraphQLObjectType({
                            name: `${label}_${fieldName}_${capitalizedOperation}`,
                            fields: {
                                permission: {
                                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
                                },
                            },
                        }),
                    },
                };
            }, {});
            if (field.fields) {
                objectTypeFields.fields = {
                    type: new graphql_1.GraphQLObjectType({
                        name: `${label}_${fieldName}_Fields`,
                        fields: buildFields(`${label}_${fieldName}`, field.fields),
                    }),
                };
            }
            return {
                ...builtFields,
                [field.name]: {
                    type: new graphql_1.GraphQLObjectType({
                        name: `${label}_${fieldName}`,
                        fields: objectTypeFields,
                    }),
                },
            };
        }
        if (!field.name && field.fields) {
            const subFields = buildFields(label, field.fields);
            return {
                ...builtFields,
                ...subFields,
            };
        }
        if (field.type === 'tabs') {
            return field.tabs.reduce((fieldsWithTabFields, tab) => {
                return {
                    ...fieldsWithTabFields,
                    ...buildFields(label, tab.fields),
                };
            }, { ...builtFields });
        }
    }
    return builtFields;
}, {});
const buildEntity = (name, entityFields, operations) => {
    const formattedName = (0, formatLabels_1.toWords)(name, true);
    const fields = {
        fields: {
            type: new graphql_1.GraphQLObjectType({
                name: (0, formatName_1.default)(`${formattedName}Fields`),
                fields: buildFields(`${formattedName}Fields`, entityFields),
            }),
        },
    };
    operations.forEach((operation) => {
        const capitalizedOperation = operation.charAt(0).toUpperCase() + operation.slice(1);
        fields[operation] = {
            type: new graphql_1.GraphQLObjectType({
                name: `${formattedName}${capitalizedOperation}Access`,
                fields: {
                    permission: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
                    where: { type: graphql_type_json_1.GraphQLJSONObject },
                },
            }),
        };
    });
    return fields;
};
function buildPoliciesType(payload) {
    const fields = {
        canAccessAdmin: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
        },
    };
    Object.values(payload.config.collections).forEach((collection) => {
        const collectionOperations = ['create', 'read', 'update', 'delete'];
        if (collection.auth && (typeof collection.auth.maxLoginAttempts !== 'undefined' && collection.auth.maxLoginAttempts !== 0)) {
            collectionOperations.push('unlock');
        }
        if (collection.versions) {
            collectionOperations.push('readVersions');
        }
        fields[(0, formatName_1.default)(collection.slug)] = {
            type: new graphql_1.GraphQLObjectType({
                name: (0, formatName_1.default)(`${collection.slug}Access`),
                fields: buildEntity(collection.slug, collection.fields, collectionOperations),
            }),
        };
    });
    Object.values(payload.config.globals).forEach((global) => {
        var _a, _b;
        const globalOperations = ['read', 'update'];
        if (global.versions) {
            globalOperations.push('readVersions');
        }
        fields[(0, formatName_1.default)(global.slug)] = {
            type: new graphql_1.GraphQLObjectType({
                name: (0, formatName_1.default)(`${((_a = global === null || global === void 0 ? void 0 : global.graphQL) === null || _a === void 0 ? void 0 : _a.name) || global.slug}Access`),
                fields: buildEntity(((_b = global === null || global === void 0 ? void 0 : global.graphQL) === null || _b === void 0 ? void 0 : _b.name) || global.slug, global.fields, globalOperations),
            }),
        };
    });
    return new graphql_1.GraphQLObjectType({
        name: 'Access',
        fields,
    });
}
exports.default = buildPoliciesType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRQb2xpY2llc1R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9zY2hlbWEvYnVpbGRQb2xpY2llc1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx5REFBc0Q7QUFDdEQscUNBQTRFO0FBQzVFLHlFQUFpRDtBQUtqRCwrREFBdUQ7QUFRdkQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3hGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2pCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtZQUNkLE1BQU0sU0FBUyxHQUFHLElBQUEsb0JBQVUsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekMsTUFBTSxnQkFBZ0IsR0FBcUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQ2pILE1BQU0sb0JBQW9CLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwRixPQUFPO29CQUNMLEdBQUcsVUFBVTtvQkFDYixDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNYLElBQUksRUFBRSxJQUFJLDJCQUFpQixDQUFDOzRCQUMxQixJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksU0FBUyxJQUFJLG9CQUFvQixFQUFFOzRCQUNyRCxNQUFNLEVBQUU7Z0NBQ04sVUFBVSxFQUFFO29DQUNWLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsd0JBQWMsQ0FBQztpQ0FDekM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRixDQUFDO1lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRVAsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNoQixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUc7b0JBQ3hCLElBQUksRUFBRSxJQUFJLDJCQUFpQixDQUFDO3dCQUMxQixJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksU0FBUyxTQUFTO3dCQUNwQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEdBQUcsS0FBSyxJQUFJLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7cUJBQzNELENBQUM7aUJBQ0gsQ0FBQzthQUNIO1lBRUQsT0FBTztnQkFDTCxHQUFHLFdBQVc7Z0JBQ2QsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ1osSUFBSSxFQUFFLElBQUksMkJBQWlCLENBQUM7d0JBQzFCLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxTQUFTLEVBQUU7d0JBQzdCLE1BQU0sRUFBRSxnQkFBZ0I7cUJBQ3pCLENBQUM7aUJBQ0g7YUFDRixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELE9BQU87Z0JBQ0wsR0FBRyxXQUFXO2dCQUNkLEdBQUcsU0FBUzthQUNiLENBQUM7U0FDSDtRQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNwRCxPQUFPO29CQUNMLEdBQUcsbUJBQW1CO29CQUN0QixHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsQ0FBQztZQUNKLENBQUMsRUFBRSxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN4QjtLQUNGO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFZLEVBQUUsWUFBcUIsRUFBRSxVQUEyQixFQUFFLEVBQUU7SUFDdkYsTUFBTSxhQUFhLEdBQUcsSUFBQSxzQkFBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBRztRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJLDJCQUFpQixDQUFDO2dCQUMxQixJQUFJLEVBQUUsSUFBQSxvQkFBVSxFQUFDLEdBQUcsYUFBYSxRQUFRLENBQUM7Z0JBQzFDLE1BQU0sRUFBRSxXQUFXLENBQUMsR0FBRyxhQUFhLFFBQVEsRUFBRSxZQUFZLENBQUM7YUFDNUQsQ0FBQztTQUNIO0tBQ0YsQ0FBQztJQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMvQixNQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFDbEIsSUFBSSxFQUFFLElBQUksMkJBQWlCLENBQUM7Z0JBQzFCLElBQUksRUFBRSxHQUFHLGFBQWEsR0FBRyxvQkFBb0IsUUFBUTtnQkFDckQsTUFBTSxFQUFFO29CQUNOLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLHdCQUFjLENBQUMsd0JBQWMsQ0FBQyxFQUFFO29CQUN4RCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUscUNBQWlCLEVBQUU7aUJBQ25DO2FBQ0YsQ0FBQztTQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLFNBQXdCLGlCQUFpQixDQUFDLE9BQWdCO0lBQ3hELE1BQU0sTUFBTSxHQUFHO1FBQ2IsY0FBYyxFQUFFO1lBQ2QsSUFBSSxFQUFFLElBQUksd0JBQWMsQ0FBQyx3QkFBYyxDQUFDO1NBQ3pDO0tBQ0YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFxQyxFQUFFLEVBQUU7UUFDMUYsTUFBTSxvQkFBb0IsR0FBb0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVyRixJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssV0FBVyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDMUgsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMzQztRQUVELE1BQU0sQ0FBQyxJQUFBLG9CQUFVLEVBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7WUFDcEMsSUFBSSxFQUFFLElBQUksMkJBQWlCLENBQUM7Z0JBQzFCLElBQUksRUFBRSxJQUFBLG9CQUFVLEVBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUM7Z0JBQzVDLE1BQU0sRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDO2FBQzlFLENBQUM7U0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBNkIsRUFBRSxFQUFFOztRQUM5RSxNQUFNLGdCQUFnQixHQUFvQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU3RCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxDQUFDLElBQUEsb0JBQVUsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRztZQUNoQyxJQUFJLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQztnQkFDMUIsSUFBSSxFQUFFLElBQUEsb0JBQVUsRUFBQyxHQUFHLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTywwQ0FBRSxJQUFJLEtBQUksTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDO2dCQUNqRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTywwQ0FBRSxJQUFJLEtBQUksTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDO2FBQzNGLENBQUM7U0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksMkJBQWlCLENBQUM7UUFDM0IsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNO0tBQ1AsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdDRCxvQ0E2Q0MifQ==