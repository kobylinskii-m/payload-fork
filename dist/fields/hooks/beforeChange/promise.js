"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
/* eslint-disable no-param-reassign */
const deepmerge_1 = __importDefault(require("deepmerge"));
const types_1 = require("../../config/types");
const getDefaultValue_1 = __importDefault(require("../../getDefaultValue"));
const traverseFields_1 = require("./traverseFields");
const getExistingRowDoc_1 = require("./getExistingRowDoc");
// This function is responsible for the following actions, in order:
// - Run condition
// - Merge original document data into incoming data
// - Compute default values for undefined fields
// - Execute field hooks
// - Validate data
// - Transform data for storage
// - Unflatten locales
const promise = async ({ data, doc, docWithLocales, errors, field, id, mergeLocaleActions, operation, path, req, siblingData, siblingDoc, siblingDocWithLocales, skipValidation, }) => {
    var _a, _b;
    const passesCondition = ((_a = field.admin) === null || _a === void 0 ? void 0 : _a.condition) ? field.admin.condition(data, siblingData) : true;
    const skipValidationFromHere = skipValidation || !passesCondition;
    if ((0, types_1.fieldAffectsData)(field)) {
        if (typeof siblingData[field.name] === 'undefined') {
            // If no incoming data, but existing document data is found, merge it in
            if (typeof siblingDoc[field.name] !== 'undefined') {
                if (field.localized && typeof siblingDocWithLocales[field.name] === 'object' && siblingDocWithLocales[field.name] !== null) {
                    siblingData[field.name] = siblingDocWithLocales[field.name][req.locale];
                }
                else {
                    siblingData[field.name] = siblingDoc[field.name];
                }
                // Otherwise compute default value
            }
            else if (typeof field.defaultValue !== 'undefined') {
                siblingData[field.name] = await (0, getDefaultValue_1.default)({
                    value: siblingData[field.name],
                    defaultValue: field.defaultValue,
                    locale: req.locale,
                    user: req.user,
                });
            }
        }
        // Execute hooks
        if ((_b = field.hooks) === null || _b === void 0 ? void 0 : _b.beforeChange) {
            await field.hooks.beforeChange.reduce(async (priorHook, currentHook) => {
                await priorHook;
                const hookedValue = await currentHook({
                    value: siblingData[field.name],
                    originalDoc: doc,
                    data,
                    siblingData,
                    operation,
                    req,
                });
                if (hookedValue !== undefined) {
                    siblingData[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
        // Validate
        if (!skipValidationFromHere && field.validate) {
            let valueToValidate;
            if (['array', 'blocks'].includes(field.type)) {
                const rows = siblingData[field.name];
                valueToValidate = Array.isArray(rows) ? rows.length : 0;
            }
            else {
                valueToValidate = siblingData[field.name];
            }
            const validationResult = await field.validate(valueToValidate, {
                ...field,
                data: (0, deepmerge_1.default)(doc, data, { arrayMerge: (_, source) => source }),
                siblingData: (0, deepmerge_1.default)(siblingDoc, siblingData, { arrayMerge: (_, source) => source }),
                id,
                operation,
                user: req.user,
                payload: req.payload,
                t: req.t,
            });
            if (typeof validationResult === 'string') {
                errors.push({
                    message: validationResult,
                    field: `${path}${field.name}`,
                });
            }
        }
        // Push merge locale action if applicable
        if (field.localized) {
            mergeLocaleActions.push(() => {
                if (req.payload.config.localization) {
                    const localeData = req.payload.config.localization.locales.reduce((locales, localeID) => {
                        var _a;
                        let valueToSet = siblingData[field.name];
                        if (localeID !== req.locale) {
                            valueToSet = (_a = siblingDocWithLocales === null || siblingDocWithLocales === void 0 ? void 0 : siblingDocWithLocales[field.name]) === null || _a === void 0 ? void 0 : _a[localeID];
                        }
                        if (typeof valueToSet !== 'undefined') {
                            return {
                                ...locales,
                                [localeID]: valueToSet,
                            };
                        }
                        return locales;
                    }, {});
                    // If there are locales with data, set the data
                    if (Object.keys(localeData).length > 0) {
                        siblingData[field.name] = localeData;
                    }
                }
            });
        }
    }
    switch (field.type) {
        case 'select': {
            if (siblingData[field.name] === null) {
                siblingData[field.name] = undefined;
            }
            break;
        }
        case 'point': {
            // Transform point data for storage
            if (Array.isArray(siblingData[field.name]) && siblingData[field.name][0] !== null && siblingData[field.name][1] !== null) {
                siblingData[field.name] = {
                    type: 'Point',
                    coordinates: [
                        parseFloat(siblingData[field.name][0]),
                        parseFloat(siblingData[field.name][1]),
                    ],
                };
            }
            break;
        }
        case 'group': {
            if (typeof siblingData[field.name] !== 'object')
                siblingData[field.name] = {};
            if (typeof siblingDoc[field.name] !== 'object')
                siblingDoc[field.name] = {};
            if (typeof siblingDocWithLocales[field.name] !== 'object')
                siblingDocWithLocales[field.name] = {};
            await (0, traverseFields_1.traverseFields)({
                data,
                doc,
                docWithLocales,
                errors,
                fields: field.fields,
                id,
                mergeLocaleActions,
                operation,
                path: `${path}${field.name}.`,
                req,
                siblingData: siblingData[field.name],
                siblingDoc: siblingDoc[field.name],
                siblingDocWithLocales: siblingDocWithLocales[field.name],
                skipValidation: skipValidationFromHere,
            });
            break;
        }
        case 'array': {
            const rows = siblingData[field.name];
            if (Array.isArray(rows)) {
                const promises = [];
                rows.forEach((row, i) => {
                    var _a, _b;
                    promises.push((0, traverseFields_1.traverseFields)({
                        data,
                        doc,
                        docWithLocales,
                        errors,
                        fields: field.fields,
                        id,
                        mergeLocaleActions,
                        operation,
                        path: `${path}${field.name}.${i}.`,
                        req,
                        siblingData: row,
                        siblingDoc: (0, getExistingRowDoc_1.getExistingRowDoc)(row, (_a = siblingDoc[field.name]) === null || _a === void 0 ? void 0 : _a[i]),
                        siblingDocWithLocales: (0, getExistingRowDoc_1.getExistingRowDoc)(row, (_b = siblingDocWithLocales[field.name]) === null || _b === void 0 ? void 0 : _b[i]),
                        skipValidation: skipValidationFromHere,
                    }));
                });
                await Promise.all(promises);
            }
            break;
        }
        case 'blocks': {
            const rows = siblingData[field.name];
            if (Array.isArray(rows)) {
                const promises = [];
                rows.forEach((row, i) => {
                    var _a, _b;
                    const block = field.blocks.find((blockType) => blockType.slug === row.blockType);
                    if (block) {
                        promises.push((0, traverseFields_1.traverseFields)({
                            data,
                            doc,
                            docWithLocales,
                            errors,
                            fields: block.fields,
                            id,
                            mergeLocaleActions,
                            operation,
                            path: `${path}${field.name}.${i}.`,
                            req,
                            siblingData: row,
                            siblingDoc: (0, getExistingRowDoc_1.getExistingRowDoc)(row, (_a = siblingDoc[field.name]) === null || _a === void 0 ? void 0 : _a[i]),
                            siblingDocWithLocales: (0, getExistingRowDoc_1.getExistingRowDoc)(row, (_b = siblingDocWithLocales[field.name]) === null || _b === void 0 ? void 0 : _b[i]),
                            skipValidation: skipValidationFromHere,
                        }));
                    }
                });
                await Promise.all(promises);
            }
            break;
        }
        case 'row':
        case 'collapsible': {
            await (0, traverseFields_1.traverseFields)({
                data,
                doc,
                docWithLocales,
                errors,
                fields: field.fields,
                id,
                mergeLocaleActions,
                operation,
                path,
                req,
                siblingData,
                siblingDoc,
                siblingDocWithLocales,
                skipValidation: skipValidationFromHere,
            });
            break;
        }
        case 'tab': {
            let tabPath = path;
            let tabSiblingData = siblingData;
            let tabSiblingDoc = siblingDoc;
            let tabSiblingDocWithLocales = siblingDocWithLocales;
            if ((0, types_1.tabHasName)(field)) {
                tabPath = `${path}${field.name}.`;
                if (typeof siblingData[field.name] !== 'object')
                    siblingData[field.name] = {};
                if (typeof siblingDoc[field.name] !== 'object')
                    siblingDoc[field.name] = {};
                if (typeof siblingDocWithLocales[field.name] !== 'object')
                    siblingDocWithLocales[field.name] = {};
                tabSiblingData = siblingData[field.name];
                tabSiblingDoc = siblingDoc[field.name];
                tabSiblingDocWithLocales = siblingDocWithLocales[field.name];
            }
            await (0, traverseFields_1.traverseFields)({
                data,
                doc,
                docWithLocales,
                errors,
                fields: field.fields,
                id,
                mergeLocaleActions,
                operation,
                path: tabPath,
                req,
                siblingData: tabSiblingData,
                siblingDoc: tabSiblingDoc,
                siblingDocWithLocales: tabSiblingDocWithLocales,
                skipValidation: skipValidationFromHere,
            });
            break;
        }
        case 'tabs': {
            await (0, traverseFields_1.traverseFields)({
                data,
                doc,
                docWithLocales,
                errors,
                fields: field.tabs.map((tab) => ({ ...tab, type: 'tab' })),
                id,
                mergeLocaleActions,
                operation,
                path,
                req,
                siblingData,
                siblingDoc,
                siblingDocWithLocales,
                skipValidation: skipValidationFromHere,
            });
            break;
        }
        default: {
            break;
        }
    }
};
exports.promise = promise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9maWVsZHMvaG9va3MvYmVmb3JlQ2hhbmdlL3Byb21pc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDBEQUE4QjtBQUM5Qiw4Q0FBcUY7QUFHckYsNEVBQXdEO0FBQ3hELHFEQUFrRDtBQUNsRCwyREFBd0Q7QUFtQnhELG9FQUFvRTtBQUNwRSxrQkFBa0I7QUFDbEIsb0RBQW9EO0FBQ3BELGdEQUFnRDtBQUNoRCx3QkFBd0I7QUFDeEIsa0JBQWtCO0FBQ2xCLCtCQUErQjtBQUMvQixzQkFBc0I7QUFFZixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsRUFDNUIsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEVBQ2QsTUFBTSxFQUNOLEtBQUssRUFDTCxFQUFFLEVBQ0Ysa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxJQUFJLEVBQ0osR0FBRyxFQUNILFdBQVcsRUFDWCxVQUFVLEVBQ1YscUJBQXFCLEVBQ3JCLGNBQWMsR0FDVCxFQUFpQixFQUFFOztJQUN4QixNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQUEsS0FBSyxDQUFDLEtBQUssMENBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25HLE1BQU0sc0JBQXNCLEdBQUcsY0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBRWxFLElBQUksSUFBQSx3QkFBZ0IsRUFBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDbEQsd0VBQXdFO1lBQ3hFLElBQUksT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtn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