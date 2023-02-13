"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatLabels_1 = require("../../utilities/formatLabels");
const errors_1 = require("../../errors");
const baseBlockFields_1 = require("../baseFields/baseBlockFields");
const validations_1 = __importDefault(require("../validations"));
const baseIDField_1 = require("../baseFields/baseIDField");
const types_1 = require("./types");
const withCondition_1 = __importDefault(require("../../admin/components/forms/withCondition"));
const sanitizeFields = (fields, validRelationships) => {
    if (!fields)
        return [];
    return fields.map((unsanitizedField) => {
        var _a, _b;
        const field = { ...unsanitizedField };
        if (!field.type)
            throw new errors_1.MissingFieldType(field);
        // assert that field names do not contain forbidden characters
        if ('name' in field && field.name && field.name.includes('.')) {
            throw new errors_1.InvalidFieldName(field, field.name);
        }
        // Auto-label
        if ('name' in field && field.name && typeof field.label !== 'object' && typeof field.label !== 'string' && field.label !== false) {
            field.label = (0, formatLabels_1.toWords)(field.name);
        }
        if (field.type === 'checkbox' && typeof field.defaultValue === 'undefined' && field.required === true) {
            field.defaultValue = false;
        }
        if (field.type === 'relationship' || field.type === 'upload') {
            const relationships = Array.isArray(field.relationTo) ? field.relationTo : [field.relationTo];
            relationships.forEach((relationship) => {
                if (!validRelationships.includes(relationship)) {
                    throw new errors_1.InvalidFieldRelationship(field, relationship);
                }
            });
        }
        if (field.type === 'blocks' && field.blocks) {
            field.blocks = field.blocks.map((block) => ({ ...block, fields: block.fields.concat(baseBlockFields_1.baseBlockFields) }));
        }
        if (field.type === 'array' && field.fields) {
            field.fields.push(baseIDField_1.baseIDField);
        }
        if ((field.type === 'blocks' || field.type === 'array') && field.label) {
            field.labels = field.labels || (0, formatLabels_1.formatLabels)(field.name);
        }
        if ((0, types_1.fieldAffectsData)(field)) {
            if (typeof field.validate === 'undefined') {
                const defaultValidate = validations_1.default[field.type];
                if (defaultValidate) {
                    field.validate = (val, options) => defaultValidate(val, { ...field, ...options });
                }
                else {
                    field.validate = () => true;
                }
            }
            if (!field.hooks)
                field.hooks = {};
            if (!field.access)
                field.access = {};
        }
        if (field.admin) {
            if (field.admin.condition && ((_a = field.admin.components) === null || _a === void 0 ? void 0 : _a.Field)) {
                field.admin.components.Field = (0, withCondition_1.default)((_b = field.admin.components) === null || _b === void 0 ? void 0 : _b.Field);
            }
        }
        else {
            field.admin = {};
        }
        if ('fields' in field && field.fields)
            field.fields = sanitizeFields(field.fields, validRelationships);
        if (field.type === 'tabs') {
            field.tabs = field.tabs.map((tab) => {
                const unsanitizedTab = { ...tab };
                unsanitizedTab.fields = sanitizeFields(tab.fields, validRelationships);
                return unsanitizedTab;
            });
        }
        if ('blocks' in field && field.blocks) {
            field.blocks = field.blocks.map((block) => {
                const unsanitizedBlock = { ...block };
                unsanitizedBlock.labels = !unsanitizedBlock.labels ? (0, formatLabels_1.formatLabels)(unsanitizedBlock.slug) : unsanitizedBlock.labels;
                unsanitizedBlock.fields = sanitizeFields(block.fields, validRelationships);
                return unsanitizedBlock;
            });
        }
        return field;
    });
};
exports.default = sanitizeFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmllbGRzL2NvbmZpZy9zYW5pdGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUFxRTtBQUNyRSx5Q0FBNEY7QUFDNUYsbUVBQWdFO0FBQ2hFLGlFQUF5QztBQUN6QywyREFBd0Q7QUFDeEQsbUNBQWtEO0FBQ2xELCtGQUF1RTtBQUV2RSxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQWUsRUFBRSxrQkFBNEIsRUFBVyxFQUFFO0lBQ2hGLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFdkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTs7UUFDckMsTUFBTSxLQUFLLEdBQVUsRUFBRSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQUUsTUFBTSxJQUFJLHlCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5ELDhEQUE4RDtRQUM5RCxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3RCxNQUFNLElBQUkseUJBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQztRQUVELGFBQWE7UUFDYixJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDaEksS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFBLHNCQUFPLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3JHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDOUMsTUFBTSxJQUFJLGlDQUF3QixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDekQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzNDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFHO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUFXLENBQUMsQ0FBQztTQUNoQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDdEUsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUEsMkJBQVksRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekQ7UUFFRCxJQUFJLElBQUEsd0JBQWdCLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssV0FBVyxFQUFFO2dCQUN6QyxNQUFNLGVBQWUsR0FBRyxxQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRjtxQkFBTTtvQkFDTCxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztpQkFDN0I7YUFDRjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFJLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLEtBQUssQ0FBQSxFQUFFO2dCQUMxRCxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBQSx1QkFBYSxFQUFDLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdFO1NBQ0Y7YUFBTTtZQUNMLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNO1lBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXZHLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDekIsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNsQyxNQUFNLGNBQWMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2xDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFDdkUsT0FBTyxjQUFjLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksUUFBUSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7Z0JBQ3RDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBQSwyQkFBWSxFQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ILGdCQUFnQixDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUMzRSxPQUFPLGdCQUFnQixDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsY0FBYyxDQUFDIn0=