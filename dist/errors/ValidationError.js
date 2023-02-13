"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class ValidationError extends APIError_1.default {
    constructor(results, t) {
        const message = t ? t('error:followingFieldsInvalid', { count: results.length }) : `The following field${results.length === 1 ? ' is' : 's are'} invalid:`;
        super(`${message} ${results.map((f) => f.field).join(', ')}`, http_status_1.default.BAD_REQUEST, results);
    }
}
exports.default = ValidationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGlvbkVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9WYWxpZGF0aW9uRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFFckMsMERBQWtDO0FBRWxDLE1BQU0sZUFBZ0IsU0FBUSxrQkFBUTtJQUNwQyxZQUFZLE9BQTJDLEVBQUUsQ0FBYTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sV0FBVyxDQUFDO1FBQzNKLEtBQUssQ0FDSCxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ3RELHFCQUFVLENBQUMsV0FBVyxFQUN0QixPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGtCQUFlLGVBQWUsQ0FBQyJ9