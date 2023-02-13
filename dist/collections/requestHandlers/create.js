"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const formatSuccess_1 = __importDefault(require("../../express/responses/formatSuccess"));
const create_1 = __importDefault(require("../operations/create"));
const getTranslation_1 = require("../../utilities/getTranslation");
async function createHandler(req, res, next) {
    try {
        const doc = await (0, create_1.default)({
            req,
            collection: req.collection,
            data: req.body,
            depth: Number(req.query.depth),
            draft: req.query.draft === 'true',
        });
        return res.status(http_status_1.default.CREATED).json({
            ...(0, formatSuccess_1.default)(req.t('general:successfullyCreated', { label: (0, getTranslation_1.getTranslation)(req.collection.config.labels.singular, req.i18n) }), 'message'),
            doc,
        });
    }
    catch (error) {
        return next(error);
    }
}
exports.default = createHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL3JlcXVlc3RIYW5kbGVycy9jcmVhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFHckMsMEZBQTBFO0FBRTFFLGtFQUEwQztBQUMxQyxtRUFBZ0U7QUFPakQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFtQixFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUNoRyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLGdCQUFNLEVBQUM7WUFDdkIsR0FBRztZQUNILFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTtZQUMxQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzlCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNO1NBQ2xDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6QyxHQUFHLElBQUEsdUJBQXFCLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFBLCtCQUFjLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQztZQUNySixHQUFHO1NBQ0osQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQztBQWpCRCxnQ0FpQkMifQ==