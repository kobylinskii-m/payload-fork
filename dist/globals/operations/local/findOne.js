"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = require("../../../collections/dataloader");
const findOne_1 = __importDefault(require("../findOne"));
const init_1 = __importDefault(require("../../../translations/init"));
async function findOneLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, draft = false, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
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
    return (0, findOne_1.default)({
        slug: globalSlug,
        depth,
        globalConfig,
        overrideAccess,
        showHiddenFields,
        draft,
        req,
    });
}
exports.default = findOneLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZE9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nbG9iYWxzL29wZXJhdGlvbnMvbG9jYWwvZmluZE9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGdFQUFnRTtBQUloRSx5REFBaUM7QUFDakMsc0VBQWtEO0FBYW5DLEtBQUssVUFBVSxZQUFZLENBQTZCLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3ZHLE1BQU0sRUFDSixJQUFJLEVBQUUsVUFBVSxFQUNoQixLQUFLLEVBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixFQUNoQixLQUFLLEdBQUcsS0FBSyxHQUNkLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sSUFBSSxHQUFHLElBQUEsY0FBUSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsTUFBTSxHQUFHLEdBQUc7UUFDVixJQUFJO1FBQ0osVUFBVSxFQUFFLE9BQU87UUFDbkIsTUFBTTtRQUNOLGNBQWM7UUFDZCxPQUFPO1FBQ1AsSUFBSTtRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNRLENBQUM7SUFFcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSxpQkFBTyxFQUFDO1FBQ2IsSUFBSSxFQUFFLFVBQVU7UUFDaEIsS0FBSztRQUNMLFlBQVk7UUFDWixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDTCxHQUFHO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBDRCwrQkFvQ0MifQ==