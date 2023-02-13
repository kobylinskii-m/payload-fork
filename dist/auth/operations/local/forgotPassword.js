"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPassword_1 = __importDefault(require("../forgotPassword"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function localForgotPassword(payload, options) {
    const { collection: collectionSlug, data, expiration, disableEmail, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    req.payloadAPI = 'local';
    req.i18n = (0, init_1.default)(payload.config.i18n);
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, forgotPassword_1.default)({
        data,
        collection,
        disableEmail,
        expiration,
        req,
    });
}
exports.default = localForgotPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290UGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2xvY2FsL2ZvcmdvdFBhc3N3b3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsdUVBQTJEO0FBRTNELGdFQUFnRTtBQUNoRSxzRUFBOEM7QUFZOUMsS0FBSyxVQUFVLG1CQUFtQixDQUFDLE9BQWdCLEVBQUUsT0FBZ0I7SUFDbkUsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLElBQUksRUFDSixVQUFVLEVBQ1YsWUFBWSxFQUNaLEdBQUcsR0FBRyxFQUFvQixHQUMzQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFBLGNBQUksRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSx3QkFBYyxFQUFDO1FBQ3BCLElBQUk7UUFDSixVQUFVO1FBQ1YsWUFBWTtRQUNaLFVBQVU7UUFDVixHQUFHO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELGtCQUFlLG1CQUFtQixDQUFDIn0=