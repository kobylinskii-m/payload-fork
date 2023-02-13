"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const defaultAccess_1 = __importDefault(require("../../auth/defaultAccess"));
const UnathorizedError_1 = __importDefault(require("../../errors/UnathorizedError"));
async function deleteOperation(args) {
    const { overrideAccess, req, req: { payload: { preferences: { Model, }, }, }, user, key, } = args;
    if (!user) {
        throw new UnathorizedError_1.default(req.t);
    }
    if (!overrideAccess) {
        await (0, executeAccess_1.default)({ req }, defaultAccess_1.default);
    }
    const filter = {
        key,
        user: user.id,
        userCollection: user.collection,
    };
    const result = await Model.findOneAndDelete(filter);
    return result;
}
exports.default = deleteOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZWZlcmVuY2VzL29wZXJhdGlvbnMvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkVBQXFEO0FBQ3JELDZFQUFxRDtBQUVyRCxxRkFBOEQ7QUFHOUQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxJQUF1QjtJQUNwRCxNQUFNLEVBQ0osY0FBYyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQUUsRUFDSCxPQUFPLEVBQUUsRUFDUCxXQUFXLEVBQUUsRUFDWCxLQUFLLEdBQ04sR0FDRixHQUNGLEVBQ0QsSUFBSSxFQUNKLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQztJQUVULElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksMEJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixNQUFNLElBQUEsdUJBQWEsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLHVCQUFhLENBQUMsQ0FBQztLQUM3QztJQUVELE1BQU0sTUFBTSxHQUFHO1FBQ2IsR0FBRztRQUNILElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNiLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtLQUNoQyxDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELGtCQUFlLGVBQWUsQ0FBQyJ9