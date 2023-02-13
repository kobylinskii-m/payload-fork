"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildObjectType_1 = __importDefault(require("./buildObjectType"));
const formatLabels_1 = require("../../utilities/formatLabels");
function buildBlockType({ payload, block, forceNullable, }) {
    const { slug, graphQL: { singularName, } = {}, } = block;
    if (!payload.types.blockTypes[slug]) {
        const formattedBlockName = singularName || (0, formatLabels_1.toWords)(slug, true);
        payload.types.blockTypes[slug] = (0, buildObjectType_1.default)({
            payload,
            name: formattedBlockName,
            parentName: formattedBlockName,
            fields: [
                ...block.fields,
                {
                    name: 'blockType',
                    type: 'text',
                },
            ],
            forceNullable,
        });
    }
}
exports.default = buildBlockType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRCbG9ja1R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ3JhcGhxbC9zY2hlbWEvYnVpbGRCbG9ja1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSx3RUFBZ0Q7QUFDaEQsK0RBQXVEO0FBUXZELFNBQVMsY0FBYyxDQUFDLEVBQ3RCLE9BQU8sRUFDUCxLQUFLLEVBQ0wsYUFBYSxHQUNSO0lBQ0wsTUFBTSxFQUNKLElBQUksRUFDSixPQUFPLEVBQUUsRUFDUCxZQUFZLEdBQ2IsR0FBRyxFQUFFLEdBQ1AsR0FBRyxLQUFLLENBQUM7SUFFVixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLElBQUksSUFBQSxzQkFBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFBLHlCQUFlLEVBQUM7WUFDL0MsT0FBTztZQUNQLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixNQUFNLEVBQUU7Z0JBQ04sR0FBRyxLQUFLLENBQUMsTUFBTTtnQkFDZjtvQkFDRSxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7YUFDRjtZQUNELGFBQWE7U0FDZCxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==