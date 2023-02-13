"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unlock_1 = __importDefault(require("../unlock"));
const dataloader_1 = require("../../../collections/dataloader");
const init_1 = __importDefault(require("../../../translations/init"));
async function localUnlock(payload, options) {
    const { collection: collectionSlug, data, overrideAccess = true, req = {}, } = options;
    const collection = payload.collections[collectionSlug];
    req.payload = payload;
    req.payloadAPI = 'local';
    req.i18n = (0, init_1.default)(payload.config.i18n);
    if (!req.t)
        req.t = req.i18n.t;
    if (!req.payloadDataLoader)
        req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
    return (0, unlock_1.default)({
        data,
        collection,
        overrideAccess,
        req,
    });
}
exports.default = localUnlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2F1dGgvb3BlcmF0aW9ucy9sb2NhbC91bmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx1REFBK0I7QUFDL0IsZ0VBQWdFO0FBQ2hFLHNFQUE4QztBQVc5QyxLQUFLLFVBQVUsV0FBVyxDQUFDLE9BQWdCLEVBQUUsT0FBZ0I7SUFDM0QsTUFBTSxFQUNKLFVBQVUsRUFBRSxjQUFjLEVBQzFCLElBQUksRUFDSixjQUFjLEdBQUcsSUFBSSxFQUNyQixHQUFHLEdBQUcsRUFBb0IsR0FDM0IsR0FBRyxPQUFPLENBQUM7SUFFWixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXZELEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCO1FBQUUsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUEsMEJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUEsZ0JBQU0sRUFBQztRQUNaLElBQUk7UUFDSixVQUFVO1FBQ1YsY0FBYztRQUNkLEdBQUc7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsa0JBQWUsV0FBVyxDQUFDIn0=