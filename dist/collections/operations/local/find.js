"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = __importDefault(require("../find"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findLocal(payload, options) {
    var _a, _b, _c, _d;
    const { collection: collectionSlug, depth, currentDepth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, disableErrors, showHiddenFields, sort, draft = false, pagination = true, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.locale = locale || (req === null || req === void 0 ? void 0 : req.locale) || (((_b = payload === null || payload === void 0 ? void 0 : payload.config) === null || _b === void 0 ? void 0 : _b.localization) ? (_d = (_c = payload === null || payload === void 0 ? void 0 : payload.config) === null || _c === void 0 ? void 0 : _c.localization) === null || _d === void 0 ? void 0 : _d.defaultLocale : null);
    req.fallbackLocale = fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null;
    req.i18n = (0, init_1.default)(payload.config.i18n);
    req.payload = payload;
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    if (typeof user !== 'undefined')
        req.user = user;
    return (0, find_1.default)({
        depth,
        currentDepth,
        sort,
        page,
        limit,
        where,
        collection,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        draft,
        pagination,
        req,
    });
}
exports.default = findLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9vcGVyYXRpb25zL2xvY2FsL2ZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxtREFBMkI7QUFDM0IsaURBQWlEO0FBQ2pELHNFQUE4QztBQXFCOUMsOERBQThEO0FBQy9DLEtBQUssVUFBVSxTQUFTLENBQTZCLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3BHLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLElBQUksRUFDSixLQUFLLEdBQUcsS0FBSyxFQUNiLFVBQVUsR0FBRyxJQUFJLEVBQ2pCLEdBQUcsR0FBRyxFQUFvQixHQUMzQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FBQSxJQUFJLENBQUMsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksRUFBQyxDQUFDLENBQUMsTUFBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1SCxHQUFHLENBQUMsY0FBYyxHQUFHLGNBQWMsS0FBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsY0FBYyxDQUFBLElBQUksSUFBSSxDQUFDO0lBQ25FLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUV0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVc7UUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUVqRCxPQUFPLElBQUEsY0FBSSxFQUFDO1FBQ1YsS0FBSztRQUNMLFlBQVk7UUFDWixJQUFJO1FBQ0osSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsVUFBVTtRQUNWLGNBQWM7UUFDZCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDTCxVQUFVO1FBQ1YsR0FBRztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoREQsNEJBZ0RDIn0=