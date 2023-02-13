"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ui = exports.date = exports.richText = exports.blocks = exports.relationship = exports.point = exports.checkbox = exports.upload = exports.array = exports.group = exports.tabs = exports.collapsible = exports.row = exports.radio = exports.select = exports.code = exports.email = exports.textarea = exports.number = exports.text = exports.idField = exports.baseField = exports.baseAdminFields = exports.baseAdminComponentFields = void 0;
const joi_1 = __importDefault(require("joi"));
const componentSchema_1 = require("../../utilities/componentSchema");
exports.baseAdminComponentFields = joi_1.default
    .object()
    .keys({
    Cell: componentSchema_1.componentSchema,
    Field: componentSchema_1.componentSchema,
    Filter: componentSchema_1.componentSchema,
})
    .default({});
exports.baseAdminFields = joi_1.default.object().keys({
    description: joi_1.default
        .alternatives()
        .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), componentSchema_1.componentSchema),
    position: joi_1.default.string().valid("sidebar"),
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
exports.baseField = joi_1.default
    .object()
    .keys({
    label: joi_1.default
        .alternatives()
        .try(joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), joi_1.default.string(), joi_1.default.valid(false)),
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
    hooks: joi_1.default
        .object()
        .keys({
        beforeValidate: joi_1.default.array().items(joi_1.default.func()).default([]),
        beforeChange: joi_1.default.array().items(joi_1.default.func()).default([]),
        afterChange: joi_1.default.array().items(joi_1.default.func()).default([]),
        afterRead: joi_1.default.array().items(joi_1.default.func()).default([]),
    })
        .default(),
    admin: exports.baseAdminFields.default(),
})
    .default();
exports.idField = exports.baseField.keys({
    name: joi_1.default.string().valid("id"),
    type: joi_1.default.string().valid("text", "number"),
    required: joi_1.default.not(false, 0).default(true),
    localized: joi_1.default.invalid(true),
});
exports.text = exports.baseField.keys({
    type: joi_1.default.string().valid("text").required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    minLength: joi_1.default.number(),
    maxLength: joi_1.default.number(),
    admin: exports.baseAdminFields.keys({
        placeholder: joi_1.default
            .alternatives()
            .try(joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]), joi_1.default.string()),
        autoComplete: joi_1.default.string(),
    }),
    searchable: joi_1.default.boolean(),
});
exports.number = exports.baseField.keys({
    type: joi_1.default.string().valid("number").required(),
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
    type: joi_1.default.string().valid("textarea").required(),
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
    type: joi_1.default.string().valid("email").required(),
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
    type: joi_1.default.string().valid("code").required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        language: joi_1.default.string(),
    }),
});
exports.select = exports.baseField.keys({
    type: joi_1.default.string().valid("select").required(),
    name: joi_1.default.string().required(),
    options: joi_1.default
        .array()
        .min(1)
        .items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
        value: joi_1.default.string().required().allow(""),
        label: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    })))
        .required(),
    hasMany: joi_1.default.boolean().default(false),
    defaultValue: joi_1.default
        .alternatives()
        .try(joi_1.default.string().allow(""), joi_1.default.array().items(joi_1.default.string().allow("")), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        isClearable: joi_1.default.boolean().default(false),
        isSortable: joi_1.default.boolean().default(false),
    }),
});
exports.radio = exports.baseField.keys({
    type: joi_1.default.string().valid("radio").required(),
    name: joi_1.default.string().required(),
    options: joi_1.default
        .array()
        .min(1)
        .items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object({
        value: joi_1.default.string().required().allow(""),
        label: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]))
            .required(),
    })))
        .required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.string().allow(""), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        layout: joi_1.default.string().valid("vertical", "horizontal"),
    }),
});
exports.row = exports.baseField.keys({
    type: joi_1.default.string().valid("row").required(),
    fields: joi_1.default.array().items(joi_1.default.link("#field")),
    admin: exports.baseAdminFields.default(),
});
exports.collapsible = exports.baseField.keys({
    label: joi_1.default.alternatives().try(joi_1.default.string(), componentSchema_1.componentSchema),
    type: joi_1.default.string().valid("collapsible").required(),
    fields: joi_1.default.array().items(joi_1.default.link("#field")),
    admin: exports.baseAdminFields.default(),
});
const tab = exports.baseField.keys({
    name: joi_1.default
        .string()
        .when("localized", { is: joi_1.default.exist(), then: joi_1.default.required() }),
    localized: joi_1.default.boolean(),
    label: joi_1.default
        .alternatives()
        .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()]))
        .required(),
    fields: joi_1.default.array().items(joi_1.default.link("#field")).required(),
    description: joi_1.default.alternatives().try(joi_1.default.string(), componentSchema_1.componentSchema),
});
exports.tabs = exports.baseField.keys({
    type: joi_1.default.string().valid("tabs").required(),
    fields: joi_1.default.forbidden(),
    localized: joi_1.default.forbidden(),
    tabs: joi_1.default.array().items(tab).required(),
    admin: exports.baseAdminFields.keys({
        description: joi_1.default.forbidden(),
    }),
});
exports.group = exports.baseField.keys({
    type: joi_1.default.string().valid("group").required(),
    name: joi_1.default.string().required(),
    fields: joi_1.default.array().items(joi_1.default.link("#field")),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        hideGutter: joi_1.default.boolean().default(true),
        description: joi_1.default.string(),
    }),
});
exports.array = exports.baseField.keys({
    type: joi_1.default.string().valid("array").required(),
    name: joi_1.default.string().required(),
    minRows: joi_1.default.number(),
    maxRows: joi_1.default.number(),
    fields: joi_1.default.array().items(joi_1.default.link("#field")).required(),
    labels: joi_1.default.object({
        singular: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        plural: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    }),
    defaultValue: joi_1.default
        .alternatives()
        .try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
    admin: exports.baseAdminFields
        .keys({
        components: exports.baseAdminComponentFields
            .keys({
            RowLabel: componentSchema_1.componentSchema,
        })
            .default({}),
    })
        .default({}),
});
exports.upload = exports.baseField.keys({
    type: joi_1.default.string().valid("upload").required(),
    relationTo: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    maxDepth: joi_1.default.number(),
    filterOptions: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
});
exports.checkbox = exports.baseField.keys({
    type: joi_1.default.string().valid("checkbox").required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.boolean(), joi_1.default.func()),
});
exports.point = exports.baseField.keys({
    type: joi_1.default.string().valid("point").required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default
        .alternatives()
        .try(joi_1.default.array().items(joi_1.default.number()).max(2).min(2), joi_1.default.func()),
});
exports.relationship = exports.baseField.keys({
    type: joi_1.default.string().valid("relationship").required(),
    hasMany: joi_1.default.boolean().default(false),
    relationTo: joi_1.default
        .alternatives()
        .try(joi_1.default.string().required(), joi_1.default.array().items(joi_1.default.string())),
    name: joi_1.default.string().required(),
    maxDepth: joi_1.default.number(),
    filterOptions: joi_1.default.alternatives().try(joi_1.default.object(), joi_1.default.func()),
    defaultValue: joi_1.default.alternatives().try(joi_1.default.func()),
    admin: exports.baseAdminFields.keys({
        isSortable: joi_1.default.boolean().default(false),
    }),
});
exports.blocks = exports.baseField.keys({
    type: joi_1.default.string().valid("blocks").required(),
    minRows: joi_1.default.number(),
    maxRows: joi_1.default.number(),
    name: joi_1.default.string().required(),
    labels: joi_1.default.object({
        singular: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        plural: joi_1.default
            .alternatives()
            .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
    }),
    blocks: joi_1.default
        .array()
        .items(joi_1.default.object({
        slug: joi_1.default.string().required(),
        imageURL: joi_1.default.string(),
        imageAltText: joi_1.default.string(),
        graphQL: joi_1.default.object().keys({
            singularName: joi_1.default.string(),
        }),
        labels: joi_1.default.object({
            singular: joi_1.default
                .alternatives()
                .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
            plural: joi_1.default
                .alternatives()
                .try(joi_1.default.string(), joi_1.default.object().pattern(joi_1.default.string(), [joi_1.default.string()])),
        }),
        fields: joi_1.default.array().items(joi_1.default.link("#field")),
    }))
        .required(),
    defaultValue: joi_1.default
        .alternatives()
        .try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
});
exports.richText = exports.baseField.keys({
    type: joi_1.default.string().valid("richText").required(),
    name: joi_1.default.string().required(),
    defaultValue: joi_1.default
        .alternatives()
        .try(joi_1.default.array().items(joi_1.default.object()), joi_1.default.func()),
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
                fields: joi_1.default.array().items(joi_1.default.link("#field")),
            })),
        }),
        link: joi_1.default.object({
            fields: joi_1.default.array().items(joi_1.default.link("#field")),
        }),
    }),
});
exports.date = exports.baseField.keys({
    type: joi_1.default.string().valid("date").required(),
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
    type: joi_1.default.string().valid("ui").required(),
    admin: joi_1.default
        .object()
        .keys({
        position: joi_1.default.string().valid("sidebar"),
        width: joi_1.default.string(),
        condition: joi_1.default.func(),
        components: joi_1.default
            .object()
            .keys({
            Cell: componentSchema_1.componentSchema,
            Field: componentSchema_1.componentSchema,
        })
            .default({}),
    })
        .default(),
});
const fieldSchema = joi_1.default
    .alternatives()
    .try(exports.text, exports.number, exports.textarea, exports.email, exports.code, exports.select, exports.group, exports.array, exports.row, exports.collapsible, exports.tabs, exports.radio, exports.relationship, exports.checkbox, exports.upload, exports.richText, exports.blocks, exports.date, exports.point, exports.ui)
    .id("field");
exports.default = fieldSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZpZWxkcy9jb25maWcvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUFzQjtBQUN0QixxRUFBa0U7QUFFckQsUUFBQSx3QkFBd0IsR0FBRyxhQUFHO0tBQ3hDLE1BQU0sRUFBRTtLQUNSLElBQUksQ0FBQztJQUNKLElBQUksRUFBRSxpQ0FBZTtJQUNyQixLQUFLLEVBQUUsaUNBQWU7SUFDdEIsTUFBTSxFQUFFLGlDQUFlO0NBQ3hCLENBQUM7S0FDRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFRixRQUFBLGVBQWUsR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQy9DLFdBQVcsRUFBRSxhQUFHO1NBQ2IsWUFBWSxFQUFFO1NBQ2QsR0FBRyxDQUNGLGFBQUcsQ0FBQyxNQUFNLEVBQUUsRUFDWixhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQ2xELGlDQUFlLENBQ2hCO0lBQ0gsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO0lBQ25CLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzdCLFNBQVMsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO0lBQ3ZCLFFBQVEsRUFBRSxhQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN0QyxhQUFhLEVBQUUsYUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDM0MsTUFBTSxFQUFFLGFBQUcsQ0FBQyxPQUFPLEVB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