"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../login"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function localLogin(payload, options) {
    const { collection: collectionSlug, req = {}, res, depth, locale, fallbackLocale, data, overrideAccess = true, showHiddenFields, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.payload = payload;
    req.i18n = (0, init_1.default)(payload.config.i18n);
    req.locale = undefined;
    req.fallbackLocale = undefined;
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    const args = {
        depth,
        collection,
        overrideAccess,
        showHiddenFields,
        data,
        req,
        res,
    };
    if (locale)
        args.req.locale = locale;
    if (fallbackLocale)
        args.req.fallbackLocale = fallbackLocale;
    return (0, login_1.default)(args);
}
exports.default = localLogin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2xvY2FsL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EscURBQXlDO0FBSXpDLGdFQUFnRTtBQUNoRSxzRUFBOEM7QUFpQjlDLEtBQUssVUFBVSxVQUFVLENBQTZCLE9BQWdCLEVBQUUsT0FBZ0I7SUFDdEYsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLEdBQUcsR0FBRyxFQUFvQixFQUMxQixHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixjQUFjLEVBQ2QsSUFBSSxFQUNKLGNBQWMsR0FBRyxJQUFJLEVBQ3JCLGdCQUFnQixHQUNqQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFBLGNBQUksRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sSUFBSSxHQUFHO1FBQ1gsS0FBSztRQUNMLFVBQVU7UUFDVixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLElBQUk7UUFDSixHQUFHO1FBQ0gsR0FBRztLQUNKLENBQUM7SUFFRixJQUFJLE1BQU07UUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDckMsSUFBSSxjQUFjO1FBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBRTdELE9BQU8sSUFBQSxlQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9