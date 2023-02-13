"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const formatSuccess_1 = __importDefault(require("../../express/responses/formatSuccess"));
const update_1 = __importDefault(require("../operations/update"));
async function updateHandler(req, res, next) {
    try {
        const doc = await (0, update_1.default)({
            req,
            user: req.user,
            key: req.params.key,
            value: req.body.value || req.body,
        });
        return res.status(http_status_1.default.OK).json({
            ...(0, formatSuccess_1.default)(req.t('general:updatedSuccessfully'), 'message'),
            doc,
        });
    }
    catch (error) {
        return next(error);
    }
}
exports.default = updateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZWZlcmVuY2VzL3JlcXVlc3RIYW5kbGVycy91cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4REFBcUM7QUFFckMsMEZBQTBFO0FBQzFFLGtFQUEwQztBQUszQixLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQW1CLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ2hHLElBQUk7UUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsZ0JBQU0sRUFBQztZQUN2QixHQUFHO1lBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNuQixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLElBQUk7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3BDLEdBQUcsSUFBQSx1QkFBcUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLEVBQUUsU0FBUyxDQUFDO1lBQ3pFLEdBQUc7U0FDSixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7QUFDSCxDQUFDO0FBaEJELGdDQWdCQyJ9