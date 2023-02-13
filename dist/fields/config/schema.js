"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ui = exports.date = exports.richText = exports.blocks = exports.relationship = exports.point = exports.checkbox = exports.upload = exports.array = exports.group = exports.tabs = exports.collapsible = exports.row = exports.radio = exports.select = exports.code = exports.email = exports.textarea = exports.number = exports.text = exports.idField = exports.baseField = exports.baseAdminFields = exports.baseAdminComponentFields = void 0;
const joi_1 = __importDefault(require("joi"));
const componentSchema_1 = require("../../utilities/componentSchema");
exports.baseAdminComponentFields = joi_1.default.object().keys({
    Cell: componentSchema_1.componentSchema,
    Field: componentSchema_1.componentSchema,
    Filter: componentSchema_1.componentSchema,
}).default({});
exports.baseAdminFields = joi_1.default.object().keys({
    description: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), componentSchema_1.componentSchema),
    position: joi_1.default.string().valid('sidebar'),
    width: joi_1.default.string(),
    style: joi_1.default.object().unknown(),
    className: joi_1.default.string(),
    readOnly: joi_1.default.boolean().default(false),
    initCollapsed: joi_1.default.boolean().default(false),
    hidden: joi_1.default.boolean().default(false),
    disabled: joi_1.default.boolean().default(false),
    condition: joi_1.default.func(),
    components: exports.baseAdminComponentFields,
});
exports.baseField = joi_1.default.object().keys({
    label: joi_1.default.alternatives().try(joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), joi_1.default.string(), joi_1.default.valid(false)),
    required: joi_1.default.boolean().default(false),
    saveToJWT: joi_1.default.boolean().default(false),
    unique: joi_1.default.boolean().default(false),
    localized: joi_1.default.boolean().default(false),
    index: joi_1.default.boolean().default(false),
    hidden: joi_1.default.boolean().default(false),
    validate: joi_1.default.func(),
    access: joi_1.default.object().keys({
        create: joi_1.default.func(),
        read: joi_1.default.func(),
        update: joi_1.default.func(),
    }),
    hooks: joi_1.default.object()
        .keys({
        beforeValidate: joi_1.default.array().items(joi_1.default.func()).default([]),
        beforeChange: joi_1.default.array().items(joi_1.default.func()).default([]),
        afterChange: joi_1.default.array().items(joi_1.default.func()).default([]),
        afterRead: joi_1.default.array().items(joi_1.default.func()).default([]),
    }).default(),
    admin: exports.baseAdminFields.default(),
}).default();
exports.idField = exports.baseField.keys({
    name: joi_1.default.string().valid('id'),
    type: joi_1.default.string().valid('text', 'number'),
    required: joi_1.default.not(false, 0).default(true),
    localized: joi_1.default.invalid(true),
});
exports.text = exports.baseField.keys({
    type: joi_1.default.string().valid('text').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    minLength: joi_1.default.number(),
    maxLength: joi_1.default.number(),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.alternatives().try(joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), joi_1.default.string()),
        autoComplete: joi_1.default.string(),
    }),
});
exports.number = exports.baseField.keys({
    type: joi_1.default.string().valid('number').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.number(), joi_1.default.func()),
    min: joi_1.default.number(),
    max: joi_1.default.number(),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.string(),
        autoComplete: joi_1.default.string(),
        step: joi_1.default.number(),
    }),
});
exports.textarea = exports.baseField.keys({
    type: joi_1.default.string().valid('textarea').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    minLength: joi_1.default.number(),
    maxLength: joi_1.default.number(),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.string(),
        rows: joi_1.default.number(),
    }),
});
exports.email = exports.baseField.keys({
    type: joi_1.default.string().valid('email').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    minLength: joi_1.default.number(),
    maxLength: joi_1.default.number(),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.string(),
        autoComplete: joi_1.default.string(),
    }),
});
exports.code = exports.baseField.keys({
    type: joi_1.default.string().valid('code').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        language: joi_1.default.string(),
    }),
});
exports.select = exports.baseField.keys({
    type: joi_1.default.string().valid('select').required(),
    name: joi_1.default.string().required(),
    options: joi_1.default.array().min(1).items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
        value: joi_1.default.string().required().allow(''),
        label: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    }))).required(),
    hasMany: joi_1.default.boolean().default(false),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string().allow(''), joi_1.default.array().items(joi_1.default.string().allow('')), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        isClearable: joi_1.default.boolean().default(false),
        isSortable: joi_1.default.boolean().default(false),
    }),
});
exports.radio = exports.baseField.keys({
    type: joi_1.default.string().valid('radio').required(),
    name: joi_1.default.string().required(),
    options: joi_1.default.array().min(1).items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
        value: joi_1.default.string().required().allow(''),
        label: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])).required(),
    }))).required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string().allow(''), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        layout: joi_1.default.string().valid('vertical', 'horizontal'),
    }),
});
exports.row = exports.baseField.keys({
    type: joi_1.default.string().valid('row').required(),
    fields: joi_1.default.array().items(joi_1.default.link('#field')),
    admin: exports.baseAdminFields.default(),
});
exports.collapsible = exports.baseField.keys({
    label: joi_1.default.alternatives().try(joi_1.default.string(), componentSchema_1.componentSchema),
    type: joi_1.default.string().valid('collapsible').required(),
    fields: joi_1.default.array().items(joi_1.default.link('#field')),
    admin: exports.baseAdminFields.default(),
});
const tab = exports.baseField.keys({
    name: joi_1.default.string().when('localized', { is: joi_1.default.exist(), then: joi_1.default.required() }),
    localized: joi_1.default.boolean(),
    label: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])).required(),
    fields: joi_1.default.array().items(joi_1.default.link('#field')).required(),
    description: joi_1.default.alternatives().try(joi_1.default.string(), componentSchema_1.componentSchema),
});
exports.tabs = exports.baseField.keys({
    type: joi_1.default.string().valid('tabs').required(),
    fields: joi_1.default.forbidden(),
    localized: joi_1.default.forbidden(),
    tabs: joi_1.default.array().items(tab).required(),
    admin: exports.baseAdminFields.keys({
        description: joi_1.default.forbidden(),
    }),
});
exports.group = exports.baseField.keys({
    type: joi_1.default.string().valid('group').required(),
    name: joi_1.default.string().required(),
    fields: joi_1.default.array().items(joi_1.default.link('#field')),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        hideGutter: joi_1.default.boolean().default(true),
        description: joi_1.default.string(),
    }),
});
exports.array = exports.baseField.keys({
    type: joi_1.default.string().valid('array').required(),
    name: joi_1.default.string().required(),
    minRows: joi_1.default.number(),
    maxRows: joi_1.default.number(),
    fields: joi_1.default.array().items(joi_1.default.link('#field')).required(),
    labels: joi_1.default.object({
        singular: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        plural: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    }),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        components: exports.baseAdminComponentFields.keys({
            RowLabel: componentSchema_1.componentSchema,
        }).default({}),
    }).default({}),
});
exports.upload = exports.baseField.keys({
    type: joi_1.default.string().valid('upload').required(),
    relationTo: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    maxDepth: joi_1.default.number(),
    filterOptions: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
});
exports.checkbox = exports.baseField.keys({
    type: joi_1.default.string().valid('checkbox').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.boolean(), joi_1.default.func()),
});
exports.point = exports.baseField.keys({
    type: joi_1.default.string().valid('point').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.number()).max(2).min(2), joi_1.default.func()),
});
exports.relationship = exports.baseField.keys({
    type: joi_1.default.string().valid('relationship').required(),
    hasMany: joi_1.default.boolean().default(false),
    relationTo: joi_1.default.alternatives().try(joi_1.default.string().required(), joi_1.default.array().items(joi_1.default.string())),
    name: joi_1.default.string().required(),
    maxDepth: joi_1.default.number(),
    filterOptions: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        isSortable: joi_1.default.boolean().default(false),
    }),
});
exports.blocks = exports.baseField.keys({
    type: joi_1.default.string().valid('blocks').required(),
    minRows: joi_1.default.number(),
    maxRows: joi_1.default.number(),
    name: joi_1.default.string().required(),
    labels: joi_1.default.object({
        singular: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        plural: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    }),
    blocks: joi_1.default.array().items(joi_1.default.object({
        slug: joi_1.default.string().required(),
        imageURL: joi_1.default.string(),
        imageAltText: joi_1.default.string(),
        graphQL: joi_1.default.object().keys({
            singularName: joi_1.default.string(),
        }),
        labels: joi_1.default.object({
            singular: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
            plural: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        }),
        fields: joi_1.default.array().items(joi_1.default.link('#field')),
    })).required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
});
exports.richText = exports.baseField.keys({
    type: joi_1.default.string().valid('richText').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.string(),
        hideGutter: joi_1.default.boolean().default(true),
        elements: joi_1.default.array().items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
            name: joi_1.default.string().required(),
            Button: componentSchema_1.componentSchema,
            Element: componentSchema_1.componentSchema,
            plugins: joi_1.default.array().items(componentSchema_1.componentSchema),
        }))),
        leaves: joi_1.default.array().items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
            name: joi_1.default.string().required(),
            Button: componentSchema_1.componentSchema,
            Leaf: componentSchema_1.componentSchema,
            plugins: joi_1.default.array().items(componentSchema_1.componentSchema),
        }))),
        upload: joi_1.default.object({
            collections: joi_1.default.object().pattern(joi_1.default.string(), joi_1.default.object().keys({
                fields: joi_1.default.array().items(joi_1.default.link('#field')),
            })),
        }),
        link: joi_1.default.object({
            fields: joi_1.default.array().items(joi_1.default.link('#field')),
        }),
    }),
});
exports.date = exports.baseField.keys({
    type: joi_1.default.string().valid('date').required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default.string(),
        date: joi_1.default.object({
            displayFormat: joi_1.default.string(),
            pickerAppearance: joi_1.default.string(),
            minDate: joi_1.default.date(),
            maxDate: joi_1.default.date(),
            minTime: joi_1.default.date(),
            maxTime: joi_1.default.date(),
            timeIntervals: joi_1.default.number(),
            timeFormat: joi_1.default.string(),
            monthsToShow: joi_1.default.number(),
        }),
    }),
});
exports.ui = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    label: joi_1.default.string(),
    type: joi_1.default.string().valid('ui').required(),
    admin: joi_1.default.object().keys({
        position: joi_1.default.string().valid('sidebar'),
        width: joi_1.default.string(),
        condition: joi_1.default.func(),
        components: joi_1.default.object().keys({
            Cell: componentSchema_1.componentSchema,
            Field: componentSchema_1.componentSchema,
        }).default({}),
    }).default(),
});
const fieldSchema = joi_1.default.alternatives()
    .try(exports.text, exports.number, exports.textarea, exports.email, exports.code, exports.select, exports.group, exports.array, exports.row, exports.collapsible, exports.tabs, exports.radio, exports.relationship, exports.checkbox, exports.upload, exports.richText, exports.blocks, exports.date, exports.point, exports.ui)
    .id('field');
exports.default = fieldSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZpZWxkcy9jb25maWcvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUFzQjtBQUN0QixxRUFBa0U7QUFFckQsUUFBQSx3QkFBd0IsR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3hELElBQUksRUFBRSxpQ0FBZTtJQUNyQixLQUFLLEVBQUUsaUNBQWU7SUFDdEIsTUFBTSxFQUFFLGlDQUFlO0NBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFRixRQUFBLGVBQWUsR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQy9DLFdBQVcsRUFBRSxhQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUNqQyxhQUFHLENBQUMsTUFBTSxFQUFFLEVBQ1osYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUNsRCxpQ0FBZSxDQUNoQjtJQUNELFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtJQUNuQixLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUM3QixTQUFTLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtJQUN2QixRQUFRLEVBQUUsYUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDdEMsYUFBYSxFQUFFLGFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzNDLE1BQU0sRUFBRSxhQUFHLENBQUMsT0FBTyxF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