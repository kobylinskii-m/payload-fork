"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetPassword_1 = __importDefault(require("../resetPassword"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function localResetPassword(payload, options) {
    const { collection: collectionSlug, data, overrideAccess, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    req.payload = payload;
    req.payloadAPI = 'local';
    req.i18n = (0, init_1.default)(payload.config.i18n);
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, resetPassword_1.default)({
        collection,
        data,
        overrideAccess,
        req,
    });
}
exports.default = localResetPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRQYXNzd29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoL29wZXJhdGlvbnMvbG9jYWwvcmVzZXRQYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFFQUF5RDtBQUV6RCxnRUFBZ0U7QUFDaEUsc0VBQThDO0FBWTlDLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxPQUFnQixFQUFFLE9BQWdCO0lBQ2xFLE1BQU0sRUFDSixVQUFVLEVBQUUsY0FBYyxFQUMxQixJQUFJLEVBQ0osY0FBYyxFQUNkLEdBQUcsR0FBRyxFQUFvQixHQUMzQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFBLGNBQUksRUFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRSxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sSUFBQSx1QkFBYSxFQUFDO1FBQ25CLFVBQVU7UUFDVixJQUFJO1FBQ0osY0FBYztRQUNkLEdBQUc7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsa0JBQWUsa0JBQWtCLENBQUMifQ==