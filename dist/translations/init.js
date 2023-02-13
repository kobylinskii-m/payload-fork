"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const defaultOptions_1 = require("./defaultOptions");
exports.default = (options) => {
    if (i18next_1.default.isInitialized) {
        return i18next_1.default;
    }
    i18next_1.default.init({
        ...(0, deepmerge_1.default)(defaultOptions_1.defaultOptions, options || {}),
    });
    return i18next_1.default;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2xhdGlvbnMvaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUU5QiwwREFBa0M7QUFDbEMscURBQWtEO0FBRWxELGtCQUFlLENBQUMsT0FBb0IsRUFBUSxFQUFFO0lBQzVDLElBQUksaUJBQU8sQ0FBQyxhQUFhLEVBQUU7UUFDekIsT0FBTyxpQkFBTyxDQUFDO0tBQ2hCO0lBQ0QsaUJBQU8sQ0FBQyxJQUFJLENBQUM7UUFDWCxHQUFHLElBQUEsbUJBQVMsRUFBQywrQkFBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxpQkFBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyJ9