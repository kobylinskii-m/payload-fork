"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = require("../../../collections/dataloader");
const findVersionByID_1 = __importDefault(require("../findVersionByID"));
const init_1 = __importDefault(require("../../../translations/init"));
async function findVersionByIDLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, id, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, disableErrors = false, showHiddenFields, } = options;
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
    return (0, findVersionByID_1.default)({
        depth,
        id,
        globalConfig,
        overrideAccess,
        disableErrors,
        showHiddenFields,
        req,
    });
}
exports.default = findVersionByIDLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25CeUlELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC9maW5kVmVyc2lvbkJ5SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxnRUFBZ0U7QUFJaEUseUVBQWlEO0FBQ2pELHNFQUFrRDtBQWNuQyxLQUFLLFVBQVUsb0JBQW9CLENBQXFDLE9BQWdCLEVBQUUsT0FBZ0I7O0lBQ3ZILE1BQU0sRUFDSixJQUFJLEVBQUUsVUFBVSxFQUNoQixLQUFLLEVBQ0wsRUFBRSxFQUNGLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixhQUFhLEdBQUcsS0FBSyxFQUNyQixnQkFBZ0IsR0FDakIsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUM7SUFDekYsTUFBTSxJQUFJLEdBQUcsSUFBQSxjQUFRLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUzQyxNQUFNLEdBQUcsR0FBRztRQUNWLElBQUk7UUFDSixVQUFVLEVBQUUsT0FBTztRQUNuQixNQUFNO1FBQ04sY0FBYztRQUNkLE9BQU87UUFDUCxJQUFJO1FBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1EsQ0FBQztJQUVwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUFFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFBLDBCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsT0FBTyxJQUFBLHlCQUFlLEVBQUM7UUFDckIsS0FBSztRQUNMLEVBQUU7UUFDRixZQUFZO1FBQ1osY0FBYztRQUNkLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsR0FBRztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQ0QsdUNBcUNDIn0=