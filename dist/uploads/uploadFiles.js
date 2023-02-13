"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const errors_1 = require("../errors");
const saveBufferToFile_1 = __importDefault(require("./saveBufferToFile"));
const uploadFiles = async (payload, files, t) => {
    try {
        await Promise.all(files.map(async ({ buffer, path }) => {
            await (0, saveBufferToFile_1.default)(buffer, path);
        }));
    }
    catch (err) {
        payload.logger.error(err);
        throw new errors_1.FileUploadError(t);
    }
};
exports.uploadFiles = uploadFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkRmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBsb2Fkcy91cGxvYWRGaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxzQ0FBNEM7QUFDNUMsMEVBQWtEO0FBSTNDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLEtBQW1CLEVBQUUsQ0FBWSxFQUFpQixFQUFFO0lBQ3RHLElBQUk7UUFDRixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxNQUFNLElBQUEsMEJBQWdCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxJQUFJLHdCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7QUFDSCxDQUFDLENBQUM7QUFUVyxRQUFBLFdBQVcsZUFTdEIifQ==