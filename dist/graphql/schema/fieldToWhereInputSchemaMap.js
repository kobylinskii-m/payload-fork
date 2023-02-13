"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const graphql_type_json_1 = require("graphql-type-json");
const types_1 = require("../../fields/config/types");
const withOperators_1 = __importDefault(require("./withOperators"));
const operators_1 = __importDefault(require("./operators"));
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const formatName_1 = __importDefault(require("../utilities/formatName"));
const recursivelyBuildNestedPaths_1 = __importDefault(require("./recursivelyBuildNestedPaths"));
const fieldToSchemaMap = (parentName) => ({
    number: (field) => {
        const type = graphql_1.GraphQLFloat;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.comparison]),
        };
    },
    text: (field) => {
        const type = graphql_1.GraphQLString;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.partial, ...operators_1.default.contains]),
        };
    },
    email: (field) => {
        const type = graphql_scalars_1.EmailAddressResolver;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.partial, ...operators_1.default.contains]),
        };
    },
    textarea: (field) => {
        const type = graphql_1.GraphQLString;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.partial]),
        };
    },
    richText: (field) => {
        const type = graphql_type_json_1.GraphQLJSON;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.partial]),
        };
    },
    code: (field) => {
        const type = graphql_1.GraphQLString;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.partial]),
        };
    },
    radio: (field) => ({
        type: (0, withOperators_1.default)(field, new graphql_1.GraphQLEnumType({
            name: `${(0, combineParentName_1.default)(parentName, field.name)}_Input`,
            values: field.options.reduce((values, option) => {
                if ((0, types_1.optionIsObject)(option)) {
                    return {
                        ...values,
                        [(0, formatName_1.default)(option.value)]: {
                            value: option.value,
                        },
                    };
                }
                return {
                    ...values,
                    [(0, formatName_1.default)(option)]: {
                        value: option,
                    },
                };
            }, {}),
        }), parentName, [...operators_1.default.equality, ...operators_1.default.contains]),
    }),
    date: (field) => {
        const type = graphql_scalars_1.DateTimeResolver;
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.comparison, 'like']),
        };
    },
    point: (field) => {
        const type = (0, graphql_1.GraphQLList)(graphql_1.GraphQLFloat);
        return {
            type: (0, withOperators_1.default)(field, type, parentName, [...operators_1.default.equality, ...operators_1.default.comparison, ...operators_1.default.geo]),
        };
    },
    relationship: (field) => {
        let type = (0, withOperators_1.default)(field, graphql_1.GraphQLString, parentName, [...operators_1.default.equality, ...operators_1.default.contains]);
        if (Array.isArray(field.relationTo)) {
            type = new graphql_1.GraphQLInputObjectType({
                name: `${(0, combineParentName_1.default)(parentName, field.name)}_Relation`,
                fields: {
                    relationTo: {
                        type: new graphql_1.GraphQLEnumType({
                            name: `${(0, combineParentName_1.default)(parentName, field.name)}_Relation_RelationTo`,
                            values: field.relationTo.reduce((values, relation) => ({
                                ...values,
                                [(0, formatName_1.default)(relation)]: {
                                    value: relation,
                                },
                            }), {}),
                        }),
                    },
                    value: { type: graphql_1.GraphQLString },
                },
            });
        }
        return { type };
    },
    upload: (field) => ({
        type: (0, withOperators_1.default)(field, graphql_1.GraphQLString, parentName, [...operators_1.default.equality]),
    }),
    checkbox: (field) => ({
        type: (0, withOperators_1.default)(field, graphql_1.GraphQLBoolean, parentName, [...operators_1.default.equality]),
    }),
    select: (field) => ({
        type: (0, withOperators_1.default)(field, new graphql_1.GraphQLEnumType({
            name: `${(0, combineParentName_1.default)(parentName, field.name)}_Input`,
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
        }), parentName, [...operators_1.default.equality, ...operators_1.default.contains]),
    }),
    array: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, field),
    group: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, field),
    row: (field) => field.fields.reduce((rowSchema, subField) => {
        const getFieldSchema = fieldToSchemaMap(parentName)[subField.type];
        if (getFieldSchema) {
            const rowFieldSchema = getFieldSchema(subField);
            if ((0, types_1.fieldHasSubFields)(subField)) {
                return [
                    ...rowSchema,
                    ...rowFieldSchema,
                ];
            }
            if ((0, types_1.fieldAffectsData)(subField)) {
                return [
                    ...rowSchema,
                    {
                        key: subField.name,
                        type: rowFieldSchema,
                    },
                ];
            }
        }
        return rowSchema;
    }, []),
    collapsible: (field) => field.fields.reduce((rowSchema, subField) => {
        const getFieldSchema = fieldToSchemaMap(parentName)[subField.type];
        if (getFieldSchema) {
            const rowFieldSchema = getFieldSchema(subField);
            if ((0, types_1.fieldHasSubFields)(subField)) {
                return [
                    ...rowSchema,
                    ...rowFieldSchema,
                ];
            }
            if ((0, types_1.fieldAffectsData)(subField)) {
                return [
                    ...rowSchema,
                    {
                        key: subField.name,
                        type: rowFieldSchema,
                    },
                ];
            }
        }
        return rowSchema;
    }, []),
    tabs: (field) => field.tabs.reduce((tabSchema, tab) => {
        return [
            ...tabSchema,
            ...tab.fields.reduce((rowSchema, subField) => {
                const getFieldSchema = fieldToSchemaMap(parentName)[subField.type];
                if (getFieldSchema) {
                    const rowFieldSchema = getFieldSchema(subField);
                    if ((0, types_1.fieldHasSubFields)(subField)) {
                        return [
                            ...rowSchema,
                            ...rowFieldSchema,
                        ];
                    }
                    if ((0, types_1.fieldAffectsData)(subField)) {
                        return [
                            ...rowSchema,
                            {
                                key: subField.name,
                                type: rowFieldSchema,
                            },
                        ];
                    }
                }
                return rowSchema;
            }, []),
        ];
    }, []),
});
exports.default = fieldToSchemaMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRUb1doZXJlSW5wdXRTY2hlbWFNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9zY2hlbWEvZmllbGRUb1doZXJlSW5wdXRTY2hlbWFNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FPaUI7QUFDakIscURBQXlFO0FBQ3pFLHlEQUFnRDtBQUNoRCxxREFXbUM7QUFDbkMsb0VBQTRDO0FBQzVDLDREQUFvQztBQUNwQyx1RkFBK0Q7QUFDL0QseUVBQWlEO0FBQ2pELGdHQUF3RTtBQUV4RSxNQUFNLGdCQUFnQixHQUFnQyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0UsTUFBTSxFQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1FBQzdCLE1BQU0sSUFBSSxHQUFHLHNCQUFZLENBQUM7UUFDMUIsT0FBTztZQUNMLElBQUksRUFBRSxJQUFBLHVCQUFhLEVBQ2pCLEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLENBQUMsR0FBRyxtQkFBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLG1CQUFTLENBQUMsVUFBVSxDQUFDLENBQ2pEO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDekIsTUFBTSxJQUFJLEdBQUcsdUJBQWEsQ0FBQztRQUMzQixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUEsdUJBQWEsRUFDakIsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsQ0FBQyxHQUFHLG1CQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUNyRTtTQUNGLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQUMsS0FBaUIsRUFBRSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLHNDQUFvQixDQUFDO1FBQ2xDLE9BQU87WUFDTCxJ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