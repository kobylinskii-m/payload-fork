"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = require("../../../collections/dataloader");
const restoreVersion_1 = __importDefault(require("../restoreVersion"));
const init_1 = __importDefault(require("../../../translations/init"));
async function restoreVersionLocal(payload, options) {
    var _a;
    const { slug: globalSlug, depth, id, user, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, overrideAccess = true, showHiddenFields, } = options;
    const globalConfig = payload.globals.config.find((config) => config.slug === globalSlug);
    const i18n = (0, init_1.default)(payload.config.i18n);
    const req = {
        user,
        payloadAPI: 'local',
        payload,
        locale,
        fallbackLocale,
        i18n,
        t: i18n.t,
    };
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, restoreVersion_1.default)({
        depth,
        globalConfig,
        overrideAccess,
        id,
        showHiddenFields,
        req,
    });
}
exports.default = restoreVersionLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZVZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2xvYmFscy9vcGVyYXRpb25zL2xvY2FsL3Jlc3RvcmVWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0VBQWdFO0FBSWhFLHVFQUErQztBQUMvQyxzRUFBa0Q7QUFhbkMsS0FBSyxVQUFVLG1CQUFtQixDQUFxQyxPQUFnQixFQUFFLE9BQWdCOztJQUN0SCxNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUNMLEVBQUUsRUFDRixJQUFJLEVBQ0osTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sSUFBSSxHQUFHLElBQUEsY0FBUSxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsTUFBTSxHQUFHLEdBQUc7UUFDVixJQUFJO1FBQ0osVUFBVSxFQUFFLE9BQU87UUFDbkIsT0FBTztRQUNQLE1BQU07UUFDTixjQUFjO1FBQ2QsSUFBSTtRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNRLENBQUM7SUFFcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSx3QkFBYyxFQUFDO1FBQ3BCLEtBQUs7UUFDTCxZQUFZO1FBQ1osY0FBYztRQUNkLEVBQUU7UUFDRixnQkFBZ0I7UUFDaEIsR0FBRztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuQ0Qsc0NBbUNDIn0=