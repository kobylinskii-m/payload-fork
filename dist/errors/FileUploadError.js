"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class FileUploadError extends APIError_1.default {
    constructor(t) {
        super(t ? t('problemUploadingFile') : 'There was a problem while uploading the file.', http_status_1.default.BAD_REQUEST);
    }
}
exports.default = FileUploadError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVVwbG9hZEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9GaWxlVXBsb2FkRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFFckMsMERBQWtDO0FBRWxDLE1BQU0sZUFBZ0IsU0FBUSxrQkFBUTtJQUNwQyxZQUFZLENBQWE7UUFDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLCtDQUErQyxFQUFFLHFCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakgsQ0FBQztDQUNGO0FBRUQsa0JBQWUsZUFBZSxDQUFDIn0=