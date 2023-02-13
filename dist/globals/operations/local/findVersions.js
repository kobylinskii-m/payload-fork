"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersions_1 = __importDefault(require("../findVersions"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function findVersionsLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, sort, } = options;
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
    return (0, findVersions_1.default)({
        where,
        page,
        limit,
        depth,
        globalConfig,
        sort,
        overrideAccess,
        showHiddenFields,
        req,
    });
}
exports.default = findVersionsLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dsb2JhbHMvb3BlcmF0aW9ucy9sb2NhbC9maW5kVmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxtRUFBMkM7QUFDM0MsZ0VBQWdFO0FBQ2hFLHNFQUFrRDtBQWdCbkMsS0FBSyxVQUFVLGlCQUFpQixDQUFxQyxPQUFnQixFQUFFLE9BQWdCOztJQUNwSCxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksMENBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hGLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixnQkFBZ0IsRUFDaEIsSUFBSSxHQUNMLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sSUFBSSxHQUFHLElBQUEsY0FBUSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsTUFBTSxHQUFHLEdBQUc7UUFDVixJQUFJO1FBQ0osVUFBVSxFQUFFLE9BQU87UUFDbkIsTUFBTTtRQUNOLGNBQWM7UUFDZCxPQUFPO1FBQ1AsSUFBSTtRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNRLENBQUM7SUFFcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSxzQkFBWSxFQUFDO1FBQ2xCLEtBQUs7UUFDTCxJQUFJO1FBQ0osS0FBSztRQUNMLEtBQUs7UUFDTCxZQUFZO1FBQ1osSUFBSTtRQUNKLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsR0FBRztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6Q0Qsb0NBeUNDIn0=