"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.point = exports.blocks = exports.radio = exports.select = exports.array = exports.relationship = exports.upload = exports.date = exports.checkbox = exports.richText = exports.code = exports.textarea = exports.email = exports.password = exports.text = exports.number = void 0;
const defaultValue_1 = __importDefault(require("./richText/defaultValue"));
const types_1 = require("./config/types");
const canUseDOM_1 = __importDefault(require("../utilities/canUseDOM"));
const isValidID_1 = require("../utilities/isValidID");
const getIDType_1 = require("../utilities/getIDType");
const number = (value, { t, required, min, max }) => {
    const parsedValue = parseFloat(value);
    if ((value && typeof parsedValue !== 'number') || (required && Number.isNaN(parsedValue)) || (value && Number.isNaN(parsedValue))) {
        return t('validation:enterNumber');
    }
    if (typeof max === 'number' && parsedValue > max) {
        return t('validation:greaterThanMax', { value, max });
    }
    if (typeof min === 'number' && parsedValue < min) {
        return t('validation:lessThanMin', { value, min });
    }
    if (required && typeof parsedValue !== 'number') {
        return t('validation:required');
    }
    return true;
};
exports.number = number;
const text = (value, { t, minLength, maxLength: fieldMaxLength, required, payload }) => {
    var _a;
    let maxLength;
    if (typeof ((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.defaultMaxTextLength) === 'number')
        maxLength = payload.config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number')
        maxLength = fieldMaxLength;
    if (value && maxLength && value.length > maxLength) {
        return t('validation:shorterThanMax', { maxLength });
    }
    if (value && minLength && (value === null || value === void 0 ? void 0 : value.length) < minLength) {
        return t('validation:longerThanMin', { minLength });
    }
    if (required) {
        if (typeof value !== 'string' || (value === null || value === void 0 ? void 0 : value.length) === 0) {
            return t('validation:required');
        }
    }
    return true;
};
exports.text = text;
const password = (value, { t, required, maxLength: fieldMaxLength, minLength, payload }) => {
    var _a;
    let maxLength;
    if (typeof ((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.defaultMaxTextLength) === 'number')
        maxLength = payload.config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number')
        maxLength = fieldMaxLength;
    if (value && maxLength && value.length > maxLength) {
        return t('validation:shorterThanMax', { maxLength });
    }
    if (value && minLength && value.length < minLength) {
        return t('validation:longerThanMin', { minLength });
    }
    if (required && !value) {
        return t('validation:required');
    }
    return true;
};
exports.password = password;
const email = (value, { t, required }) => {
    if ((value && !/\S+@\S+\.\S+/.test(value))
        || (!value && required)) {
        return t('validation:emailAddress');
    }
    return true;
};
exports.email = email;
const textarea = (value, { t, required, maxLength: fieldMaxLength, minLength, payload, }) => {
    var _a;
    let maxLength;
    if (typeof ((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.defaultMaxTextLength) === 'number')
        maxLength = payload.config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number')
        maxLength = fieldMaxLength;
    if (value && maxLength && value.length > maxLength) {
        return t('validation:shorterThanMax', { maxLength });
    }
    if (value && minLength && value.length < minLength) {
        return t('validation:longerThanMin', { minLength });
    }
    if (required && !value) {
        return t('validation:required');
    }
    return true;
};
exports.textarea = textarea;
const code = (value, { t, required }) => {
    if (required && value === undefined) {
        return t('validation:required');
    }
    return true;
};
exports.code = code;
const richText = (value, { t, required }) => {
    if (required) {
        const stringifiedDefaultValue = JSON.stringify(defaultValue_1.default);
        if (value && JSON.stringify(value) !== stringifiedDefaultValue)
            return true;
        return t('validation:required');
    }
    return true;
};
exports.richText = richText;
const checkbox = (value, { t, required }) => {
    if ((value && typeof value !== 'boolean')
        || (required && typeof value !== 'boolean')) {
        return t('validation:trueOrFalse');
    }
    return true;
};
exports.checkbox = checkbox;
const date = (value, { t, required }) => {
    if (value && !isNaN(Date.parse(value.toString()))) { /* eslint-disable-line */
        return true;
    }
    if (value) {
        return t('validation:notValidDate', { value });
    }
    if (required) {
        return t('validation:required');
    }
    return true;
};
exports.date = date;
const validateFilterOptions = async (value, { t, filterOptions, id, user, data, siblingData, relationTo, payload }) => {
    if (!canUseDOM_1.default && typeof filterOptions !== 'undefined' && value) {
        const options = {};
        const collections = typeof relationTo === 'string' ? [relationTo] : relationTo;
        const values = Array.isArray(value) ? value : [value];
        await Promise.all(collections.map(async (collection) => {
            const optionFilter = typeof filterOptions === 'function' ? filterOptions({
                id,
                data,
                siblingData,
                user,
                relationTo: collection,
            }) : filterOptions;
            const valueIDs = [];
            values.forEach((val) => {
                if (typeof val === 'object' && (val === null || val === void 0 ? void 0 : val.value)) {
                    valueIDs.push(val.value);
                }
                if (typeof val === 'string' || typeof val === 'number') {
                    valueIDs.push(val);
                }
            });
            const result = await payload.find({
                collection,
                depth: 0,
                where: {
                    and: [
                        { id: { in: valueIDs } },
                        optionFilter,
                    ],
                },
            });
            options[collection] = result.docs.map((doc) => doc.id);
        }));
        const invalidRelationships = values.filter((val) => {
            let collection;
            let requestedID;
            if (typeof relationTo === 'string') {
                collection = relationTo;
                if (typeof val === 'string' || typeof val === 'number') {
                    requestedID = val;
                }
            }
            if (Array.isArray(relationTo) && typeof val === 'object' && (val === null || val === void 0 ? void 0 : val.relationTo)) {
                collection = val.relationTo;
                requestedID = val.value;
            }
            return options[collection].indexOf(requestedID) === -1;
        });
        if (invalidRelationships.length > 0) {
            return invalidRelationships.reduce((err, invalid, i) => {
                return `${err} ${JSON.stringify(invalid)}${invalidRelationships.length === i + 1 ? ',' : ''} `;
            }, t('validation:invalidSelections'));
        }
        return true;
    }
    return true;
};
const upload = (value, options) => {
    if (!value && options.required) {
        return options.t('validation:required');
    }
    if (!canUseDOM_1.default && typeof value !== 'undefined' && value !== null) {
        const idField = options.payload.collections[options.relationTo].config.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
        const type = (0, getIDType_1.getIDType)(idField);
        if (!(0, isValidID_1.isValidID)(value, type)) {
            return options.t('validation:validUploadID');
        }
    }
    return validateFilterOptions(value, options);
};
exports.upload = upload;
const relationship = async (value, options) => {
    if ((!value || (Array.isArray(value) && value.length === 0)) && options.required) {
        return options.t('validation:required');
    }
    if (!canUseDOM_1.default && typeof value !== 'undefined' && value !== null) {
        const values = Array.isArray(value) ? value : [value];
        const invalidRelationships = values.filter((val) => {
            let collection;
            let requestedID;
            if (typeof options.relationTo === 'string') {
                collection = options.relationTo;
                // custom id
                if (typeof val === 'string' || typeof val === 'number') {
                    requestedID = val;
                }
            }
            if (Array.isArray(options.relationTo) && typeof val === 'object' && (val === null || val === void 0 ? void 0 : val.relationTo)) {
                collection = val.relationTo;
                requestedID = val.value;
            }
            const idField = options.payload.collections[collection].config.fields.find((field) => (0, types_1.fieldAffectsData)(field) && field.name === 'id');
            let type;
            if (idField) {
                type = idField.type === 'number' ? 'number' : 'text';
            }
            else {
                type = 'ObjectID';
            }
            return !(0, isValidID_1.isValidID)(requestedID, type);
        });
        if (invalidRelationships.length > 0) {
            return `This field has the following invalid selections: ${invalidRelationships.map((err, invalid) => {
                return `${err} ${JSON.stringify(invalid)}`;
            }).join(', ')}`;
        }
    }
    return validateFilterOptions(value, options);
};
exports.relationship = relationship;
const array = (value, { t, minRows, maxRows, required }) => {
    if (minRows && value < minRows) {
        return t('validation:requiresAtLeast', { count: minRows, label: t('rows') });
    }
    if (maxRows && value > maxRows) {
        return t('validation:requiresNoMoreThan', { count: maxRows, label: t('rows') });
    }
    if (!value && required) {
        return t('validation:requiresAtLeast', { count: 1, label: t('row') });
    }
    return true;
};
exports.array = array;
const select = (value, { t, options, hasMany, required }) => {
    if (Array.isArray(value) && value.some((input) => !options.some((option) => (option === input || (typeof option !== 'string' && (option === null || option === void 0 ? void 0 : option.value) === input))))) {
        return t('validation:invalidSelection');
    }
    if (typeof value === 'string' && !options.some((option) => (option === value || (typeof option !== 'string' && option.value === value)))) {
        return t('validation:invalidSelection');
    }
    if (required && ((typeof value === 'undefined' || value === null) || (hasMany && Array.isArray(value) && (value === null || value === void 0 ? void 0 : value.length) === 0))) {
        return t('validation:required');
    }
    return true;
};
exports.select = select;
const radio = (value, { t, options, required }) => {
    const stringValue = String(value);
    if ((typeof value !== 'undefined' || !required) && (options.find((option) => String(typeof option !== 'string' && (option === null || option === void 0 ? void 0 : option.value)) === stringValue)))
        return true;
    return t('validation:required');
};
exports.radio = radio;
const blocks = (value, { t, maxRows, minRows, required }) => {
    if (minRows && value < minRows) {
        return t('validation:requiresAtLeast', { count: minRows, label: t('rows') });
    }
    if (maxRows && value > maxRows) {
        return t('validation:requiresNoMoreThan', { count: maxRows, label: t('rows') });
    }
    if (!value && required) {
        return t('validation:requiresAtLeast', { count: 1, label: t('row') });
    }
    return true;
};
exports.blocks = blocks;
const point = (value = ['', ''], { t, required }) => {
    const lng = parseFloat(String(value[0]));
    const lat = parseFloat(String(value[1]));
    if (required && ((value[0] && value[1] && typeof lng !== 'number' && typeof lat !== 'number')
        || (Number.isNaN(lng) || Number.isNaN(lat))
        || (Array.isArray(value) && value.length !== 2))) {
        return t('validation:requiresTwoNumbers');
    }
    if ((value[1] && Number.isNaN(lng)) || (value[0] && Number.isNaN(lat))) {
        return t('validation:invalidInput');
    }
    return true;
};
exports.point = point;
exports.default = {
    number: exports.number,
    text: exports.text,
    password: exports.password,
    email: exports.email,
    textarea: exports.textarea,
    code: exports.code,
    richText: exports.richText,
    checkbox: exports.checkbox,
    date: exports.date,
    upload: exports.upload,
    relationship: exports.relationship,
    array: exports.array,
    select: exports.select,
    radio: exports.radio,
    blocks: exports.blocks,
    point: exports.point,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmllbGRzL3ZhbGlkYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJFQUEyRDtBQUMzRCwwQ0FtQndCO0FBRXhCLHVFQUErQztBQUMvQyxzREFBbUQ7QUFDbkQsc0RBQW1EO0FBRTVDLE1BQU0sTUFBTSxHQUE0QyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDMUcsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXRDLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtRQUNqSSxPQUFPLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNoRCxPQUFPLENBQUMsQ0FBQywyQkFBMkIsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNoRCxPQUFPLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsSUFBSSxRQUFRLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1FBQy9DLE9BQU8sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLElB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