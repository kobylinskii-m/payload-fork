"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findByID_1 = __importDefault(require("../findByID"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findByIDLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, currentDepth, id, locale, fallbackLocale, user, overrideAccess = true, disableErrors = false, showHiddenFields, req = {}, draft = false, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.locale = locale || (req === null || req === void 0 ? void 0 : req.locale) || (((_a = payload === null || payload === void 0 ? void 0 : payload.config) === null || _a === void 0 ? void 0 : _a.localization) ? (_c = (_b = payload === null || payload === void 0 ? void 0 : payload.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale : null);
    req.fallbackLocale = fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null;
    req.i18n = (0, init_1.default)(payload.config.i18n);
    req.payload = payload;
    if (typeof user !== 'undefined')
        req.user = user;
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, findByID_1.default)({
        depth,
        currentDepth,
        id,
        collection,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        req,
        draft,
    });
}
exports.default = findByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEJ5SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9sb2NhbC9maW5kQnlJRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDJEQUFtQztBQUVuQyxpREFBaUQ7QUFDakQsc0VBQThDO0FBaUI5Qyw4REFBOEQ7QUFDL0MsS0FBSyxVQUFVLGFBQWEsQ0FBNkIsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDeEcsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEtBQUssRUFDTCxZQUFZLEVBQ1osRUFBRSxFQUNGLE1BQU0sRUFDTixjQUFjLEVBQ2QsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGFBQWEsR0FBRyxLQUFLLEVBQ3JCLGdCQUFnQixFQUNoQixHQUFHLEdBQUcsRUFBb0IsRUFDMUIsS0FBSyxHQUFHLEtBQUssR0FDZCxHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FBQSxJQUFJLENBQUMsQ0FBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksRUFBQyxDQUFDLENBQUMsTUFBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLDBDQUFFLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1SCxHQUFHLENBQUMsY0FBYyxHQUFHLGNBQWMsS0FBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsY0FBYyxDQUFBLElBQUksSUFBSSxDQUFDO0lBQ25FLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUV0QixJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVc7UUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUVqRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUEsa0JBQVEsRUFBQztRQUNkLEtBQUs7UUFDTCxZQUFZO1FBQ1osRUFBRTtRQUNGLFVBQVU7UUFDVixjQUFjO1FBQ2QsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixHQUFHO1FBQ0gsS0FBSztLQUNOLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4Q0QsZ0NBd0NDIn0=