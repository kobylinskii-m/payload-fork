"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldIsLocalized = exports.tabHasName = exports.fieldAffectsData = exports.fieldIsPresentationalOnly = exports.fieldHasMaxDepth = exports.fieldSupportsMany = exports.optionIsValue = exports.optionsAreObjects = exports.optionIsObject = exports.fieldIsBlockType = exports.fieldIsArrayType = exports.fieldHasSubFields = exports.valueIsValueWithRelation = void 0;
function valueIsValueWithRelation(value) {
    return typeof value === "object" && "relationTo" in value && "value" in value;
}
exports.valueIsValueWithRelation = valueIsValueWithRelation;
function fieldHasSubFields(field) {
    return (field.type === "group" ||
        field.type === "array" ||
        field.type === "row" ||
        field.type === "collapsible");
}
exports.fieldHasSubFields = fieldHasSubFields;
function fieldIsArrayType(field) {
    return field.type === "array";
}
exports.fieldIsArrayType = fieldIsArrayType;
function fieldIsBlockType(field) {
    return field.type === "blocks";
}
exports.fieldIsBlockType = fieldIsBlockType;
function optionIsObject(option) {
    return typeof option === "object";
}
exports.optionIsObject = optionIsObject;
function optionsAreObjects(options) {
    return Array.isArray(options) && typeof (options === null || options === void 0 ? void 0 : options[0]) === "object";
}
exports.optionsAreObjects = optionsAreObjects;
function optionIsValue(option) {
    return typeof option === "string";
}
exports.optionIsValue = optionIsValue;
function fieldSupportsMany(field) {
    return field.type === "select" || field.type === "relationship";
}
exports.fieldSupportsMany = fieldSupportsMany;
function fieldHasMaxDepth(field) {
    return ((field.type === "upload" || field.type === "relationship") &&
        typeof field.maxDepth === "number");
}
exports.fieldHasMaxDepth = fieldHasMaxDepth;
function fieldIsPresentationalOnly(field) {
    return field.type === "ui";
}
exports.fieldIsPresentationalOnly = fieldIsPresentationalOnly;
function fieldAffectsData(field) {
    return "name" in field && !fieldIsPresentationalOnly(field);
}
exports.fieldAffectsData = fieldAffectsData;
function tabHasName(tab) {
    return "name" in tab;
}
exports.tabHasName = tabHasName;
function fieldIsLocalized(field) {
    return "localized" in field && field.localized;
}
exports.fieldIsLocalized = fieldIsLocalized;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmllbGRzL2NvbmZpZy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUE2U0EsU0FBZ0Isd0JBQXdCLENBQ3RDLEtBQWM7SUFFZCxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxZQUFZLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFDaEYsQ0FBQztBQUpELDREQUlDO0FBd05ELFNBQWdCLGlCQUFpQixDQUFDLEtBQVk7SUFDNUMsT0FBTyxDQUNMLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTztRQUN0QixLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU87UUFDdEIsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUM3QixDQUFDO0FBQ0osQ0FBQztBQVBELDhDQU9DO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBWTtJQUMzQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0Q0FFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEtBQVk7SUFDM0MsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUNqQyxDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBYztJQUMzQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUNwQyxDQUFDO0FBRkQsd0NBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FDL0IsT0FBaUI7SUFFakIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUcsQ0FBQyxDQUFDLENBQUEsS0FBSyxRQUFRLENBQUM7QUFDcEUsQ0FBQztBQUpELDhDQUlDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQWM7SUFDMUMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsS0FBWTtJQUM1QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDO0FBQ2xFLENBQUM7QUFGRCw4Q0FFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEtBQVk7SUFDM0MsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLENBQUM7UUFDMUQsT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FDbkMsQ0FBQztBQUNKLENBQUM7QUFMRCw0Q0FLQztBQUVELFNBQWdCLHlCQUF5QixDQUN2QyxLQUF5QjtJQUV6QixPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO0FBQzdCLENBQUM7QUFKRCw4REFJQztBQUVELFNBQWdCLGdCQUFnQixDQUM5QixLQUF5QjtJQUV6QixPQUFPLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBSkQsNENBSUM7QUFFRCxTQUFnQixVQUFVLENBQUMsR0FBUTtJQUNqQyxPQUFPLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDdkIsQ0FBQztBQUZELGdDQUVDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBa0I7SUFDakQsT0FBTyxXQUFXLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDakQsQ0FBQztBQUZELDRDQUVDIn0=