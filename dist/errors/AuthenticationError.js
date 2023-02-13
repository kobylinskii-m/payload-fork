"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class AuthenticationError extends APIError_1.default {
    constructor(t) {
        super(t ? t('error:emailOrPasswordIncorrect') : 'The email or password provided is incorrect.', http_status_1.default.UNAUTHORIZED);
    }
}
exports.default = AuthenticationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25FcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvQXV0aGVudGljYXRpb25FcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFxQztBQUVyQywwREFBa0M7QUFFbEMsTUFBTSxtQkFBb0IsU0FBUSxrQkFBUTtJQUN4QyxZQUFZLENBQWE7UUFDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxFQUFFLHFCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsbUJBQW1CLENBQUMifQ==