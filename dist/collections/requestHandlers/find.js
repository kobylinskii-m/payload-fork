"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const find_1 = __importDefault(require("../operations/find"));
const isNumber_1 = require("../../utilities/isNumber");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findHandler(req, res, next) {
    try {
        let page;
        if (typeof req.query.page === 'string') {
            const parsedPage = parseInt(req.query.page, 10);
            if (!Number.isNaN(parsedPage)) {
                page = parsedPage;
            }
        }
        const result = await (0, find_1.default)({
            req,
            collection: req.collection,
            where: req.query.where,
            page,
            limit: (0, isNumber_1.isNumber)(req.query.limit) ? Number(req.query.limit) : undefined,
            sort: req.query.sort,
            depth: (0, isNumber_1.isNumber)(req.query.depth) ? Number(req.query.depth) : undefined,
            draft: req.query.draft === 'true',
        });
        return res.status(http_status_1.default.OK).json(result);
    }
    catch (error) {
        return next(error);
    }
}
exports.default = findHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb2xsZWN0aW9ucy9yZXF1ZXN0SGFuZGxlcnMvZmluZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDhEQUFxQztBQUlyQyw4REFBc0M7QUFFdEMsdURBQW9EO0FBRXBELDhEQUE4RDtBQUMvQyxLQUFLLFVBQVUsV0FBVyxDQUE2QixHQUFtQixFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUMxSCxJQUFJO1FBQ0YsSUFBSSxJQUF3QixDQUFDO1FBRTdCLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDdEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWhELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsVUFBVSxDQUFDO2FBQ25CO1NBQ0Y7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsY0FBSSxFQUFDO1lBQ3hCLEdBQUc7WUFDSCxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVU7WUFDMUIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBYztZQUMvQixJQUFJO1lBQ0osS0FBSyxFQUFFLElBQUEsbUJBQVEsRUFBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN0RSxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFjO1lBQzlCLEtBQUssRUFBRSxJQUFBLG1CQUFRLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDdEUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU07U0FDbEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9DO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjtBQUNILENBQUM7QUEzQkQsOEJBMkJDIn0=