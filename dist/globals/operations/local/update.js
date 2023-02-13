"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = __importDefault(require("../update"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function updateLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, data, user, overrideAccess = true, showHiddenFields, draft, } = options;
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
    return (0, update_1.default)({
        slug: globalSlug,
        data,
        depth,
        globalConfig,
        overrideAccess,
        showHiddenFields,
        draft,
        req,
    });
}
exports.default = updateLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC91cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSx1REFBK0I7QUFDL0IsZ0VBQWdFO0FBQ2hFLHNFQUFrRDtBQWNuQyxLQUFLLFVBQVUsV0FBVyxDQUE2QixPQUFnQixFQUFFLE9BQWdCOztJQUN0RyxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEVBQ2hCLEtBQUssR0FDTixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztJQUN6RixNQUFNLElBQUksR0FBRyxJQUFBLGNBQVEsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLE1BQU0sR0FBRyxHQUFHO1FBQ1YsSUFBSTtRQUNKLFVBQVUsRUFBRSxPQUFPO1FBQ25CLE1BQU07UUFDTixjQUFjO1FBQ2QsT0FBTztRQUNQLElBQUk7UUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDUSxDQUFDO0lBRXBCLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUEsZ0JBQU0sRUFBQztRQUNaLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUk7UUFDSixLQUFLO1FBQ0wsWUFBWTtRQUNaLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsS0FBSztRQUNMLEdBQUc7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBdENELDhCQXNDQyJ9