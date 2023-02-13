"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class NotFound extends APIError_1.default {
    constructor(t) {
        super(t ? t('error:notFound') : 'The requested resource was not found.', http_status_1.default.NOT_FOUND);
    }
}
exports.default = NotFound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90Rm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL05vdEZvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBRXJDLDBEQUFrQztBQUVsQyxNQUFNLFFBQVMsU0FBUSxrQkFBUTtJQUM3QixZQUFZLENBQWE7UUFDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLHVDQUF1QyxFQUFFLHFCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakcsQ0FBQztDQUNGO0FBRUQsa0JBQWUsUUFBUSxDQUFDIn0=