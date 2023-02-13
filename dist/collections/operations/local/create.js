"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileByPath_1 = __importDefault(require("../../../uploads/getFileByPath"));
const create_1 = __importDefault(require("../create"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function createLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, locale, fallbackLocale, data, user, overrideAccess = true, disableVerificationEmail, showHiddenFields, filePath, file, overwriteExistingFiles = false, req = {}, draft, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.locale = locale || (req === null || req === void 0 ? void 0 : req.locale) || (((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.localization) ? (_c = (_b = payload === null || payload === void 0 ? void 0 : payload.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale : null);
    req.fallbackLocale = fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null;
    req.payload = payload;
    req.i18n = (0, init_1.default)(payload.config.i18n);
    req.files = {
        file: (file !== null && file !== void 0 ? file : (await (0, getFileByPath_1.default)(filePath))),
    };
    if (typeof user !== 'undefined')
        req.user = user;
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, create_1.default)({
        depth,
        data,
        collection,
        overrideAccess,
        disableVerificationEmail,
        showHiddenFields,
        overwriteExistingFiles,
        draft,
        req,
    });
}
exports.default = createLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsbUZBQTJEO0FBQzNELHVEQUErQjtBQUMvQixpREFBaUQ7QUFFakQsc0VBQThDO0FBbUIvQixLQUFLLFVBQVUsV0FBVyxDQUFVLE9BQWdCLEVBQUUsT0FBbUI7O0lBQ3RGLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsTUFBTSxFQUNOLGNBQWMsRUFDZCxJQUFJLEVBQ0osSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLElBQUksRUFDSixzQkFBc0IsR0FBRyxLQUFLLEVBQzlCLEdBQUcsR0FBRyxFQUFvQixFQUMxQixLQUFLLEdBQ04sR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELEdBQUcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNLENBQUEsSUFBSSxDQUFDLENBQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSwwQ0FBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLE1BQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSwwQ0FBRSxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUgsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLGNBQWMsQ0FBQSxJQUFJLElBQUksQ0FBQztJQUNuRSxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUEsY0FBSSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLEtBQUssR0FBRztRQUNWLElBQUksRUFBRSxDQUFDLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLENBQUMsTUFBTSxJQUFBLHVCQUFhLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBaUI7S0FDaEUsQ0FBQztJQUVGLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVztRQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBRWpELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSxnQkFBTSxFQUFDO1FBQ1osS0FBSztRQUNMLElBQUk7UUFDSixVQUFVO1FBQ1YsY0FBYztRQUNkLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLEtBQUs7UUFDTCxHQUFHO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdDRCw4QkE2Q0MifQ==