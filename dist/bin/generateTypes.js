"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypes = void 0;
/* eslint-disable no-nested-ternary */
const fs_1 = __importDefault(require("fs"));
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const pluralize_1 = require("pluralize");
const logger_1 = __importDefault(require("../utilities/logger"));
const types_1 = require("../fields/config/types");
const load_1 = __importDefault(require("../config/load"));
const deepCopyObject_1 = __importDefault(require("../utilities/deepCopyObject"));
const groupOrTabHasRequiredSubfield_1 = require("../utilities/groupOrTabHasRequiredSubfield");
const formatLabels_1 = require("../utilities/formatLabels");
const nonOptionalFieldTypes = ['group', 'array', 'blocks'];
const propertyIsOptional = (field) => {
    return (0, types_1.fieldAffectsData)(field) && (field.required === true || nonOptionalFieldTypes.includes(field.type));
};
function getCollectionIDType(collections, slug) {
    const matchedCollection = collections.find((collection) => collection.slug === slug);
    const customIdField = matchedCollection.fields.find((field) => 'name' in field && field.name === 'id');
    if (customIdField && customIdField.type === 'number') {
        return 'number';
    }
    return 'string';
}
function returnOptionEnums(options) {
    return options.map((option) => {
        if (typeof option === 'object' && 'value' in option) {
            return option.value;
        }
        return option;
    });
}
function generateFieldTypes(config, fields) {
    let topLevelProps = [];
    let requiredTopLevelProps = [];
    return {
        properties: Object.fromEntries(fields.reduce((properties, field) => {
            let fieldSchema;
            switch (field.type) {
                case 'text':
                case 'textarea':
                case 'code':
                case 'email':
                case 'date': {
                    fieldSchema = { type: 'string' };
                    break;
                }
                case 'number': {
                    fieldSchema = { type: 'number' };
                    break;
                }
                case 'checkbox': {
                    fieldSchema = { type: 'boolean' };
                    break;
                }
                case 'richText': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    };
                    break;
                }
                case 'radio': {
                    fieldSchema = {
                        type: 'string',
                        enum: returnOptionEnums(field.options),
                    };
                    break;
                }
                case 'select': {
                    const selectType = {
                        type: 'string',
                        enum: returnOptionEnums(field.options),
                    };
                    if (field.hasMany) {
                        fieldSchema = {
                            type: 'array',
                            items: selectType,
                        };
                    }
                    else {
                        fieldSchema = selectType;
                    }
                    break;
                }
                case 'point': {
                    fieldSchema = {
                        type: 'array',
                        minItems: 2,
                        maxItems: 2,
                        items: [
                            {
                                type: 'number',
                            },
                            {
                                type: 'number',
                            },
                        ],
                    };
                    break;
                }
                case 'relationship': {
                    if (Array.isArray(field.relationTo)) {
                        if (field.hasMany) {
                            fieldSchema = {
                                oneOf: [
                                    {
                                        type: 'array',
                                        items: {
                                            oneOf: field.relationTo.map((relation) => {
                                                const idFieldType = getCollectionIDType(config.collections, relation);
                                                return {
                                                    type: 'object',
                                                    additionalProperties: false,
                                                    properties: {
                                                        value: {
                                                            type: idFieldType,
                                                        },
                                                        relationTo: {
                                                            const: relation,
                                                        },
                                                    },
                                                    required: ['value', 'relationTo'],
                                                };
                                            }),
                                        },
                                    },
                                    {
                                        type: 'array',
                                        items: {
                                            oneOf: field.relationTo.map((relation) => {
                                                return {
                                                    type: 'object',
                                                    additionalProperties: false,
                                                    properties: {
                                                        value: {
                                                            $ref: `#/definitions/${relation}`,
                                                        },
                                                        relationTo: {
                                                            const: relation,
                                                        },
                                                    },
                                                    required: ['value', 'relationTo'],
                                                };
                                            }),
                                        },
                                    },
                                ],
                            };
                        }
                        else {
                            fieldSchema = {
                                oneOf: field.relationTo.map((relation) => {
                                    const idFieldType = getCollectionIDType(config.collections, relation);
                                    return {
                                        type: 'object',
                                        additionalProperties: false,
                                        properties: {
                                            value: {
                                                oneOf: [
                                                    {
                                                        type: idFieldType,
                                                    },
                                                    {
                                                        $ref: `#/definitions/${relation}`,
                                                    },
                                                ],
                                            },
                                            relationTo: {
                                                const: relation,
                                            },
                                        },
                                        required: ['value', 'relationTo'],
                                    };
                                }),
                            };
                        }
                    }
                    else {
                        const idFieldType = getCollectionIDType(config.collections, field.relationTo);
                        if (field.hasMany) {
                            fieldSchema = {
                                oneOf: [
                                    {
                                        type: 'array',
                                        items: {
                                            type: idFieldType,
                                        },
                                    },
                                    {
                                        type: 'array',
                                        items: {
                                            $ref: `#/definitions/${field.relationTo}`,
                                        },
                                    },
                                ],
                            };
                        }
                        else {
                            fieldSchema = {
                                oneOf: [
                                    {
                                        type: idFieldType,
                                    },
                                    {
                                        $ref: `#/definitions/${field.relationTo}`,
                                    },
                                ],
                            };
                        }
                    }
                    break;
                }
                case 'upload': {
                    const idFieldType = getCollectionIDType(config.collections, field.relationTo);
                    fieldSchema = {
                        oneOf: [
                            {
                                type: idFieldType,
                            },
                            {
                                $ref: `#/definitions/${field.relationTo}`,
                            },
                        ],
                    };
                    break;
                }
                case 'blocks': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            oneOf: field.blocks.map((block) => {
                                const blockSchema = generateFieldTypes(config, block.fields);
                                return {
                                    type: 'object',
                                    additionalProperties: false,
                                    properties: {
                                        ...blockSchema.properties,
                                        blockType: {
                                            const: block.slug,
                                        },
                                    },
                                    required: [
                                        'blockType',
                                        ...blockSchema.required,
                                    ],
                                };
                            }),
                        },
                    };
                    break;
                }
                case 'array': {
                    fieldSchema = {
                        type: 'array',
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            ...generateFieldTypes(config, field.fields),
                        },
                    };
                    break;
                }
                case 'row':
                case 'collapsible': {
                    const topLevelFields = generateFieldTypes(config, field.fields);
                    requiredTopLevelProps = requiredTopLevelProps.concat(topLevelFields.required);
                    topLevelProps = topLevelProps.concat(Object.entries(topLevelFields.properties).map((prop) => prop));
                    break;
                }
                case 'tabs': {
                    field.tabs.forEach((tab) => {
                        if ((0, types_1.tabHasName)(tab)) {
                            const hasRequiredSubfields = (0, groupOrTabHasRequiredSubfield_1.groupOrTabHasRequiredSubfield)(tab);
                            if (hasRequiredSubfields)
                                requiredTopLevelProps.push(tab.name);
                            topLevelProps.push([
                                tab.name,
                                {
                                    type: 'object',
                                    additionalProperties: false,
                                    ...generateFieldTypes(config, tab.fields),
                                },
                            ]);
                        }
                        else {
                            const topLevelFields = generateFieldTypes(config, tab.fields);
                            requiredTopLevelProps = requiredTopLevelProps.concat(topLevelFields.required);
                            topLevelProps = topLevelProps.concat(Object.entries(topLevelFields.properties).map((prop) => prop));
                        }
                    });
                    break;
                }
                case 'group': {
                    fieldSchema = {
                        type: 'object',
                        additionalProperties: false,
                        ...generateFieldTypes(config, field.fields),
                    };
                    break;
                }
                default: {
                    break;
                }
            }
            if (fieldSchema && (0, types_1.fieldAffectsData)(field)) {
                return [
                    ...properties,
                    [
                        field.name,
                        {
                            ...fieldSchema,
                        },
                    ],
                ];
            }
            return [
                ...properties,
                ...topLevelProps,
            ];
        }, [])),
        required: [
            ...fields
                .filter(propertyIsOptional)
                .map((field) => ((0, types_1.fieldAffectsData)(field) ? field.name : '')),
            ...requiredTopLevelProps,
        ],
    };
}
function entityToJsonSchema(config, incomingEntity) {
    var _a;
    const entity = (0, deepCopyObject_1.default)(incomingEntity);
    const title = ((_a = entity.typescript) === null || _a === void 0 ? void 0 : _a.interface) ? entity.typescript.interface : (0, pluralize_1.singular)((0, formatLabels_1.toWords)(entity.slug, true));
    const idField = { type: 'text', name: 'id', required: true };
    const customIdField = entity.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
    if (customIdField) {
        customIdField.required = true;
    }
    else {
        entity.fields.unshift(idField);
    }
    if ('timestamps' in entity && entity.timestamps !== false) {
        entity.fields.push({
            type: 'text',
            name: 'createdAt',
            required: true,
        }, {
            type: 'text',
            name: 'updatedAt',
            required: true,
        });
    }
    return {
        title,
        type: 'object',
        additionalProperties: false,
        ...generateFieldTypes(config, entity.fields),
    };
}
function configToJsonSchema(config) {
    return {
        definitions: Object.fromEntries([
            ...config.globals.map((global) => [
                global.slug,
                entityToJsonSchema(config, global),
            ]),
            ...config.collections.map((collection) => [
                collection.slug,
                entityToJsonSchema(config, collection),
            ]),
        ]),
        additionalProperties: false,
    };
}
function generateTypes() {
    const logger = (0, logger_1.default)();
    const config = (0, load_1.default)();
    const outputFile = process.env.PAYLOAD_TS_OUTPUT_PATH || config.typescript.outputFile;
    logger.info('Compiling TS types for Collections and Globals...');
    const jsonSchema = configToJsonSchema(config);
    (0, json_schema_to_typescript_1.compile)(jsonSchema, 'Config', {
        unreachableDefinitions: true,
        bannerComment: '/* tslint:disable */\n/**\n* This file was automatically generated by Payload CMS.\n* DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,\n* and re-run `payload generate:types` to regenerate this file.\n*/',
        style: {
            singleQuote: true,
        },
    }).then((compiled) => {
        fs_1.default.writeFileSync(outputFile, compiled);
        logger.info(`Types written to ${outputFile}`);
    });
}
exports.generateTypes = generateTypes;
// when generateTypes.js is launched directly
if (module.id === require.main.id) {
    generateTypes();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2VuZXJhdGVUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNENBQW9CO0FBRXBCLHlFQUFvRDtBQUNwRCx5Q0FBcUM7QUFDckMsaUVBQXlDO0FBQ3pDLGtEQUF5RztBQUd6RywwREFBd0M7QUFFeEMsaUZBQXlEO0FBQ3pELDhGQUEyRjtBQUMzRiw0REFBb0Q7QUFFcEQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFM0QsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO0lBQzFDLE9BQU8sSUFBQSx3QkFBZ0IsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RyxDQUFDLENBQUM7QUFFRixTQUFTLG1CQUFtQixDQUFDLFdBQXdDLEVBQUUsSUFBWTtJQUNqRixNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDckYsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBRXZHLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3BELE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELFNB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