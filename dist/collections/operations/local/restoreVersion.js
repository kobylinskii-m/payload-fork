"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = require("../../dataloader");
const restoreVersion_1 = __importDefault(require("../restoreVersion"));
const init_1 = __importDefault(require("../../../translations/init"));
async function restoreVersionLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, id, user, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    const i18n = (0, init_1.default)(payload.config.i18n);
    const req = {
        user,
        payloadAPI: 'local',
        locale,
        fallbackLocale,
        payload,
        i18n,
        t: i18n.t,
    };
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    const args = {
        payload,
        depth,
        collection,
        overrideAccess,
        id,
        showHiddenFields,
        req,
    };
    return (0, restoreVersion_1.default)(args);
}
exports.default = restoreVersionLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29sbGVjdGlvbnMvb3BlcmF0aW9ucy9sb2NhbC9yZXN0b3JlVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLGlEQUFpRDtBQUNqRCx1RUFBK0M7QUFDL0Msc0VBQWtEO0FBYW5DLEtBQUssVUFBVSxtQkFBbUIsQ0FBcUMsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDdEgsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEtBQUssRUFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixFQUFFLEVBQ0YsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixHQUNqQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkQsTUFBTSxJQUFJLEdBQUcsSUFBQSxjQUFRLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxNQUFNLEdBQUcsR0FBRztRQUNWLElBQUk7UUFDSixVQUFVLEVBQUUsT0FBTztRQUNuQixNQUFNO1FBQ04sY0FBYztRQUNkLE9BQU87UUFDUCxJQUFJO1FBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1EsQ0FBQztJQUVwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUFFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFBLDBCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsTUFBTSxJQUFJLEdBQUc7UUFDWCxPQUFPO1FBQ1AsS0FBSztRQUNMLFVBQVU7UUFDVixjQUFjO1FBQ2QsRUFBRTtRQUNGLGdCQUFnQjtRQUNoQixHQUFHO0tBQ0osQ0FBQztJQUVGLE9BQU8sSUFBQSx3QkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFyQ0Qsc0NBcUNDIn0=