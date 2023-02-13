"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class LockedAuth extends APIError_1.default {
    constructor(t) {
        super(t ? t('error:userLocked') : 'This user is locked due to having too many failed login attempts.', http_status_1.default.UNAUTHORIZED);
    }
}
exports.default = LockedAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9ja2VkQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvTG9ja2VkQXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFxQztBQUVyQywwREFBa0M7QUFFbEMsTUFBTSxVQUFXLFNBQVEsa0JBQVE7SUFDL0IsWUFBWSxDQUFhO1FBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtRUFBbUUsRUFBRSxxQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xJLENBQUM7Q0FDRjtBQUVELGtCQUFlLFVBQVUsQ0FBQyJ9