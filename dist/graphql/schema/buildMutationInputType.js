"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionIDType = void 0;
/* eslint-disable no-use-before-define */
const graphql_1 = require("graphql");
const graphql_type_json_1 = require("graphql-type-json");
const withNullableType_1 = __importDefault(require("./withNullableType"));
const formatName_1 = __importDefault(require("../utilities/formatName"));
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const types_1 = require("../../fields/config/types");
const formatLabels_1 = require("../../utilities/formatLabels");
const groupOrTabHasRequiredSubfield_1 = require("../../utilities/groupOrTabHasRequiredSubfield");
const getCollectionIDType = (config) => {
    const idField = config.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
    if (!idField)
        return graphql_1.GraphQLString;
    switch (idField.type) {
        case 'number':
            return graphql_1.GraphQLInt;
        default:
            return graphql_1.GraphQLString;
    }
};
exports.getCollectionIDType = getCollectionIDType;
function buildMutationInputType(payload, name, fields, parentName, forceNullable = false) {
    const fieldToSchemaMap = {
        number: (inputObjectTypeConfig, field) => {
            const type = field.name === 'id' ? graphql_1.GraphQLInt : graphql_1.GraphQLFloat;
            return {
                ...inputObjectTypeConfig,
                [field.name]: { type: (0, withNullableType_1.default)(field, type, forceNullable) },
            };
        },
        text: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        email: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        textarea: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        richText: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_type_json_1.GraphQLJSON, forceNullable) },
        }),
        code: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        date: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        upload: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        radio: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, graphql_1.GraphQLString, forceNullable) },
        }),
        point: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: (0, withNullableType_1.default)(field, (0, graphql_1.GraphQLList)(graphql_1.GraphQLFloat), forceNullable) },
        }),
        checkbox: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: graphql_1.GraphQLBoolean },
        }),
        select: (inputObjectTypeConfig, field) => {
            const formattedName = `${(0, combineParentName_1.default)(parentName, field.name)}_MutationInput`;
            let type = new graphql_1.GraphQLEnumType({
                name: formattedName,
                values: field.options.reduce((values, option) => {
                    if (typeof option === 'object' && option.value) {
                        return {
                            ...values,
                            [(0, formatName_1.default)(option.value)]: {
                                value: option.value,
                            },
                        };
                    }
                    if (typeof option === 'string') {
                        return {
                            ...values,
                            [option]: {
                                value: option,
                            },
                        };
                    }
                    return values;
                }, {}),
            });
            type = field.hasMany ? new graphql_1.GraphQLList(type) : type;
            type = (0, withNullableType_1.default)(field, type, forceNullable);
            return {
                ...inputObjectTypeConfig,
                [field.name]: { type },
            };
        },
        relationship: (inputObjectTypeConfig, field) => {
            const { relationTo } = field;
            let type;
            if (Array.isArray(relationTo)) {
                const fullName = `${(0, combineParentName_1.default)(parentName, (0, formatLabels_1.toWords)(field.name, true))}RelationshipInput`;
                type = new graphql_1.GraphQLInputObjectType({
                    name: fullName,
                    fields: {
                        relationTo: {
                            type: new graphql_1.GraphQLEnumType({
                                name: `${fullName}RelationTo`,
                                values: relationTo.reduce((values, option) => ({
                                    ...values,
                                    [(0, formatName_1.default)(option)]: {
                                        value: option,
                                    },
                                }), {}),
                            }),
                        },
                        value: { type: graphql_type_json_1.GraphQLJSON },
                    },
                });
            }
            else {
                type = (0, exports.getCollectionIDType)(payload.collections[relationTo].config);
            }
            return {
                ...inputObjectTypeConfig,
                [field.name]: { type: field.hasMany ? new graphql_1.GraphQLList(type) : type },
            };
        },
        array: (inputObjectTypeConfig, field) => {
            const fullName = (0, combineParentName_1.default)(parentName, (0, formatLabels_1.toWords)(field.name, true));
            let type = buildMutationInputType(payload, fullName, field.fields, fullName);
            type = new graphql_1.GraphQLList((0, withNullableType_1.default)(field, type, forceNullable));
            return {
                ...inputObjectTypeConfig,
                [field.name]: { type },
            };
        },
        group: (inputObjectTypeConfig, field) => {
            const requiresAtLeastOneField = (0, groupOrTabHasRequiredSubfield_1.groupOrTabHasRequiredSubfield)(field);
            const fullName = (0, combineParentName_1.default)(parentName, (0, formatLabels_1.toWords)(field.name, true));
            let type = buildMutationInputType(payload, fullName, field.fields, fullName);
            if (requiresAtLeastOneField)
                type = new graphql_1.GraphQLNonNull(type);
            return {
                ...inputObjectTypeConfig,
                [field.name]: { type },
            };
        },
        blocks: (inputObjectTypeConfig, field) => ({
            ...inputObjectTypeConfig,
            [field.name]: { type: graphql_type_json_1.GraphQLJSON },
        }),
        row: (inputObjectTypeConfig, field) => field.fields.reduce((acc, subField) => {
            const addSubField = fieldToSchemaMap[subField.type];
            if (addSubField)
                return addSubField(acc, subField);
            return acc;
        }, inputObjectTypeConfig),
        collapsible: (inputObjectTypeConfig, field) => field.fields.reduce((acc, subField) => {
            const addSubField = fieldToSchemaMap[subField.type];
            if (addSubField)
                return addSubField(acc, subField);
            return acc;
        }, inputObjectTypeConfig),
        tabs: (inputObjectTypeConfig, field) => {
            return field.tabs.reduce((acc, tab) => {
                if ((0, types_1.tabHasName)(tab)) {
                    const fullName = (0, combineParentName_1.default)(parentName, (0, formatLabels_1.toWords)(tab.name, true));
                    const requiresAtLeastOneField = (0, groupOrTabHasRequiredSubfield_1.groupOrTabHasRequiredSubfield)(field);
                    let type = buildMutationInputType(payload, fullName, tab.fields, fullName);
                    if (requiresAtLeastOneField)
                        type = new graphql_1.GraphQLNonNull(type);
                    return {
                        ...inputObjectTypeConfig,
                        [tab.name]: { type },
                    };
                }
                return {
                    ...acc,
                    ...tab.fields.reduce((subFieldSchema, subField) => {
                        const addSubField = fieldToSchemaMap[subField.type];
                        if (addSubField)
                            return addSubField(subFieldSchema, subField);
                        return subFieldSchema;
                    }, acc),
                };
            }, inputObjectTypeConfig);
        },
    };
    const fieldName = (0, formatName_1.default)(name);
    return new graphql_1.GraphQLInputObjectType({
        name: `mutation${fieldName}Input`,
        fields: fields.reduce((inputObjectTypeConfig, field) => {
            const fieldSchema = fieldToSchemaMap[field.type];
            if (typeof fieldSchema !== 'function') {
                return inputObjectTypeConfig;
            }
            return {
                ...inputObjectTypeConfig,
                ...fieldSchema(inputObjectTypeConfig, field),
            };
        }, {}),
    });
}
exports.default = buildMutationInputType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRNdXRhdGlvbklucHV0VHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3NjaGVtYS9idWlsZE11dGF0aW9uSW5wdXRUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlDQUF5QztBQUN6QyxxQ0FZaUI7QUFDakIseURBQWdEO0FBQ2hELDBFQUFrRDtBQUNsRCx5RUFBaUQ7QUFDakQsdUZBQStEO0FBQy9ELHFEQUF1VTtBQUN2VSwrREFBdUQ7QUFHdkQsaUdBQThGO0FBRXZGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUFpQyxFQUFxQixFQUFFO0lBQzFGLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDOUYsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLHVCQUFhLENBQUM7SUFDbkMsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssUUFBUTtZQUNYLE9BQU8sb0JBQVUsQ0FBQztRQUNwQjtZQUNFLE9BQU8sdUJBQWEsQ0FBQztLQUN4QjtBQUNILENBQUMsQ0FBQztBQVRXLFFBQUEsbUJBQW1CLHVCQVM5QjtBQU1GLFNBQVMsc0JBQXNCLENBQUMsT0FBZ0IsRUFBRSxJQUFZLEVBQUUsTUFBZSxFQUFFLFVBQWtCLEVBQUUsYUFBYSxHQUFHLEtBQUs7SUFDeEgsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixNQUFNLEVBQUUsQ0FBQyxxQkFBNEMsRUFBRSxLQUFrQixFQUFFLEVBQUU7WUFDM0UsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFVLENBQUMsQ0FBQyxDQUFDLHNCQUFZLENBQUM7WUFDN0QsT0FB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