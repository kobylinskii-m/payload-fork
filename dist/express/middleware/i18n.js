"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nMiddleware = void 0;
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const defaultOptions_1 = require("../../translations/defaultOptions");
const i18nMiddleware = (options) => {
    i18next_1.default.use(i18next_http_middleware_1.default.LanguageDetector)
        .init({
        preload: defaultOptions_1.defaultOptions.supportedLngs,
        ...(0, deepmerge_1.default)(defaultOptions_1.defaultOptions, options || {}),
    });
    return i18next_http_middleware_1.default.handle(i18next_1.default);
};
exports.i18nMiddleware = i18nMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leHByZXNzL21pZGRsZXdhcmUvaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFFOUIsc0ZBQXlEO0FBQ3pELDBEQUFrQztBQUVsQyxzRUFBbUU7QUFFbkUsTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFvQixFQUFXLEVBQUU7SUFDdkQsaUJBQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWtCLENBQUMsZ0JBQWdCLENBQUM7U0FDN0MsSUFBSSxDQUFDO1FBQ0osT0FBTyxFQUFFLCtCQUFjLENBQUMsYUFBYTtRQUNyQyxHQUFHLElBQUEsbUJBQVMsRUFBQywrQkFBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0lBRUwsT0FBTyxpQ0FBa0IsQ0FBQyxNQUFNLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUVPLHdDQUFjIn0=