"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const qs_middleware_1 = __importDefault(require("qs-middleware"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const middleware_1 = __importDefault(require("../../localization/middleware"));
const authenticate_1 = __importDefault(require("./authenticate"));
const identifyAPI_1 = __importDefault(require("./identifyAPI"));
const corsHeaders_1 = __importDefault(require("./corsHeaders"));
const convertPayload_1 = __importDefault(require("./convertPayload"));
const i18n_1 = require("./i18n");
const middleware = (payload) => {
    var _a;
    const rateLimitOptions = {
        windowMs: payload.config.rateLimit.window,
        max: payload.config.rateLimit.max,
    };
    if (typeof payload.config.rateLimit.skip === 'function')
        rateLimitOptions.skip = payload.config.rateLimit.skip;
    if ((_a = payload.config.express.middleware) === null || _a === void 0 ? void 0 : _a.length) {
        payload.logger.warn('express.middleware is deprecated. Please migrate to express.postMiddleware.');
    }
    return [
        ...(payload.config.express.preMiddleware || []),
        (0, express_rate_limit_1.default)(rateLimitOptions),
        passport_1.default.initialize(),
        (0, i18n_1.i18nMiddleware)(payload.config.i18n),
        (0, identifyAPI_1.default)('REST'),
        (0, method_override_1.default)('X-HTTP-Method-Override'),
        (0, qs_middleware_1.default)({ depth: 10, arrayLimit: 1000 }),
        body_parser_1.default.urlencoded({ extended: true }),
        (0, compression_1.default)(payload.config.express.compression),
        (0, middleware_1.default)(payload.config.localization),
        express_1.default.json(payload.config.express.json),
        (0, express_fileupload_1.default)({
            parseNested: true,
            ...payload.config.upload,
        }),
        convertPayload_1.default,
        (0, corsHeaders_1.default)(payload.config),
        (0, authenticate_1.default)(payload.config),
        ...(payload.config.express.middleware || []),
        ...(payload.config.express.postMiddleware || []),
    ];
};
exports.default = middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhwcmVzcy9taWRkbGV3YXJlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdEQUFnQztBQUNoQyw4REFBc0M7QUFDdEMsOERBQXFDO0FBQ3JDLHNFQUE2QztBQUM3QyxrRUFBeUM7QUFDekMsNEVBQTRDO0FBQzVDLDRFQUEyQztBQUMzQywrRUFBbUU7QUFDbkUsa0VBQTBDO0FBQzFDLGdFQUF3QztBQUd4QyxnRUFBd0M7QUFDeEMsc0VBQThDO0FBQzlDLGlDQUF3QztBQUV4QyxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQWdCLEVBQU8sRUFBRTs7SUFDM0MsTUFBTSxnQkFBZ0IsR0FJbEI7UUFDRixRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTTtRQUN6QyxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRztLQUNsQyxDQUFDO0lBRUYsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxVQUFVO1FBQUUsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUUvRyxJQUFJLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSwwQ0FBRSxNQUFNLEVBQUU7UUFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkVBQTZFLENBQUMsQ0FBQztLQUNwRztJQUVELE9BQU87UUFDTCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUMvQyxJQUFBLDRCQUFTLEVBQUMsZ0JBQWdCLENBQUM7UUFDM0Isa0JBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDckIsSUFBQSxxQkFBYyxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ25DLElBQUEscUJBQVcsRUFBQyxNQUFNLENBQUM7UUFDbkIsSUFBQSx5QkFBYyxFQUFDLHdCQUF3QixDQUFDO1FBQ3hDLElBQUEsdUJBQVksRUFBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzdDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pDLElBQUEscUJBQVcsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDL0MsSUFBQSxvQkFBc0IsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUNuRCxpQkFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekMsSUFBQSw0QkFBVSxFQUFDO1lBQ1QsV0FBVyxFQUFFLElBQUk7WUFDakIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07U0FDekIsQ0FBQztRQUNGLHdCQUFjO1FBQ2QsSUFBQSxxQkFBVyxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBQSxzQkFBWSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDNUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDNUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUM7S0FDakQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9