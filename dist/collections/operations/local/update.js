"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileByPath_1 = __importDefault(require("../../../uploads/getFileByPath"));
const update_1 = __importDefault(require("../update"));
const dataloader_1 = require("../../dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function updateLocal(payload, options) {
    var _a;
    const { collection: collectionSlug, depth, locale = payload.config.localization ? (_a = payload.config.localization) === null || _a === void 0 ? void 0 : _a.defaultLocale : null, fallbackLocale = null, data, id, user, overrideAccess = true, showHiddenFields, filePath, file, overwriteExistingFiles = false, draft, autosave, } = options;
    const collection = payload.collections[collectionSlug];
    const i18n = (0, init_1.default)(payload.config.i18n);
    const req = {
        user,
        payloadAPI: 'local',
        locale,
        fallbackLocale,
        payload,
        i18n,
        files: {
            file: file !== null && file !== void 0 ? file : await (0, getFileByPath_1.default)(filePath),
        },
    };
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    const args = {
        depth,
        data,
        collection,
        overrideAccess,
        id,
        showHiddenFields,
        overwriteExistingFiles,
        draft,
        autosave,
        payload,
        req,
    };
    return (0, update_1.default)(args);
}
exports.default = updateLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL29wZXJhdGlvbnMvbG9jYWwvdXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsbUZBQTJEO0FBQzNELHVEQUErQjtBQUUvQixpREFBaUQ7QUFDakQsc0VBQWtEO0FBbUJuQyxLQUFLLFVBQVUsV0FBVyxDQUFVLE9BQWdCLEVBQUUsT0FBbUI7O0lBQ3RGLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixLQUFLLEVBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDeEYsY0FBYyxHQUFHLElBQUksRUFDckIsSUFBSSxFQUNKLEVBQUUsRUFDRixJQUFJLEVBQ0osY0FBYyxHQUFHLElBQUksRUFDckIsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixJQUFJLEVBQ0osc0JBQXNCLEdBQUcsS0FBSyxFQUM5QixLQUFLLEVBQ0wsUUFBUSxHQUNULEdBQUcsT0FBTyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RCxNQUFNLElBQUksR0FBRyxJQUFBLGNBQVEsRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLE1BQU0sR0FBRyxHQUFHO1FBQ1YsSUFBSTtRQUNKLFVBQVUsRUFBRSxPQUFPO1FBQ25CLE1BQU07UUFDTixjQUFjO1FBQ2QsT0FBTztRQUNQLElBQUk7UUFDSixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksTUFBTSxJQUFBLHVCQUFhLEVBQUMsUUFBUSxDQUFDO1NBQzVDO0tBQ2dCLENBQUM7SUFFcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtRQUFFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFBLDBCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkUsTUFBTSxJQUFJLEdBQUc7UUFDWCxLQUFLO1FBQ0wsSUFBSTtRQUNKLFVBQVU7UUFDVixjQUFjO1FBQ2QsRUFBRTtRQUNGLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsS0FBSztRQUNMLFFBQVE7UUFDUixPQUFPO1FBQ1AsR0FBRztLQUNKLENBQUM7SUFFRixPQUFPLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBbkRELDhCQW1EQyJ9