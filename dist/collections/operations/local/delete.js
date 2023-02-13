"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = __importDefault(require("../delete"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function deleteLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    const req = {
        user,
        payloadAPI: 'local',
        locale,
        fallbackLocale,
        payload,
        i18n: (0, init_1.default)(payload.config.i18n),
    };
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, delete_1.default)({
        depth,
        id,
        collection,
        overrideAccess,
        showHiddenFields,
        req,
    });
}
exports.default = deleteLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsdURBQXdDO0FBQ3hDLGlEQUFpRDtBQUNqRCxzRUFBOEM7QUFhL0IsS0FBSyxVQUFVLFdBQVcsQ0FBNkIsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDdEcsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEtBQUssRUFDTCxFQUFFLEVBQ0YsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixHQUNqQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsTUFBTSxHQUFHLEdBQUc7UUFDVixJQUFJO1FBQ0osVUFBVSxFQUFFLE9BQU87UUFDbkIsTUFBTTtRQUNOLGNBQWM7UUFDZCxPQUFPO1FBQ1AsSUFBSSxFQUFFLElBQUEsY0FBSSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2QsQ0FBQztJQUVwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUEsZ0JBQWUsRUFBQztRQUNyQixLQUFLO1FBQ0wsRUFBRTtRQUNGLFVBQVU7UUFDVixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEdBQUc7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbENELDhCQWtDQyJ9