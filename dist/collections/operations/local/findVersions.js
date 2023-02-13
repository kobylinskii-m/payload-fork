"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findVersions_1 = __importDefault(require("../findVersions"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function findVersionsLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, page, limit, where, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, user, overrideAccess = true, showHiddenFields, sort, } = options;
    const collection = payload.collections[collectionSlug];
    const i18n = (0, init_1.default)(payload.config.i18n);
    const req = {
        user,
        payloadAPI: 'local',
        locale,
        fallbackLocale,
        payload,
        i18n,
    };
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, findVersions_1.default)({
        where,
        page,
        limit,
        depth,
        collection,
        sort,
        overrideAccess,
        showHiddenFields,
        req,
    });
}
exports.default = findVersionsLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvZmluZFZlcnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0EsbUVBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCxzRUFBa0Q7QUFnQm5DLEtBQUssVUFBVSxpQkFBaUIsQ0FBcUMsT0FBZ0IsRUFBRSxPQUFnQjs7SUFDcEgsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEtBQUssRUFDTCxJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLDBDQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUN4RixjQUFjLEdBQUcsSUFBSSxFQUNyQixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEVBQ2hCLElBQUksR0FDTCxHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsTUFBTSxJQUFJLEdBQUcsSUFBQSxjQUFRLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxNQUFNLEdBQUcsR0FBRztRQUNWLElBQUk7UUFDSixVQUFVLEVBQUUsT0FBTztRQUNuQixNQUFNO1FBQ04sY0FBYztRQUNkLE9BQU87UUFDUCxJQUFJO0tBQ2EsQ0FBQztJQUVwQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUEsc0JBQVksRUFBQztRQUNsQixLQUFLO1FBQ0wsSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsVUFBVTtRQUNWLElBQUk7UUFDSixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLEdBQUc7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBekNELG9DQXlDQyJ9