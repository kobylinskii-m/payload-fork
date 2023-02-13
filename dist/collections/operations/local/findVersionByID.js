"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersionByID_1 = __importDefault(require("../findVersionByID"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function findVersionByIDLocal(payload, options) {
    var _a, _b, _c;
    const { collection: collectionSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, overrideAccess = true, disableErrors = false, showHiddenFields, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.locale = locale || (req === null || req === void 0 ? void 0 : req.locale) || ((_c = (_b = this === null || this === void 0 ? void 0 : this.config) === null || _b === void 0 ? void 0 : _b.localization) === null || _c === void 0 ? void 0 : _c.defaultLocale);
    req.fallbackLocale = fallbackLocale || (req === null || req === void 0 ? void 0 : req.fallbackLocale) || null;
    req.i18n = (0, init_1.default)(payload.config.i18n);
    req.payload = payload;
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, findVersionByID_1.default)({
        depth,
        id,
        collection,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        req,
    });
}
exports.default = findVersionByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZmluZFZlcnNpb25CeUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEseUVBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCxzRUFBOEM7QUFlL0IsS0FBSyxVQUFVLG9CQUFvQixDQUFxQyxPQUFnQixFQUFFLE9BQWdCOztJQUN2SCxNQUFNLEVBQ0osVUFBVSxFQUFFLGNBQWMsRUFDMUIsS0FBSyxFQUNMLEVBQUUsRUFDRixNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixjQUFjLEdBQUcsSUFBSSxFQUNyQixhQUFhLEdBQUcsS0FBSyxFQUNyQixnQkFBZ0IsRUFDaEIsR0FBRyxHQUFHLEVBQW9CLEdBQzNCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2RCxHQUFHLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUN6QixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsTUFBTSxDQUFBLEtBQUksTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLFlBQVksMENBQUUsYUFBYSxDQUFBLENBQUM7SUFDaEYsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLEtBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLGNBQWMsQ0FBQSxJQUFJLElBQUksQ0FBQztJQUNuRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUEsY0FBSSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUFFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFBLDBCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsT0FBTyxJQUFBLHlCQUFlLEVBQUM7UUFDckIsS0FBSztRQUNMLEVBQUU7UUFDRixVQUFVO1FBQ1YsY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsR0FBRztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUFqQ0QsdUNBaUNDIn0=