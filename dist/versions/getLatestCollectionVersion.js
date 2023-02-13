"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestCollectionVersion = void 0;
const getLatestCollectionVersion = async ({ payload, collection: { config, Model, }, query, id, lean = true, }) => {
    var _a;
    let version;
    if ((_a = config.versions) === null || _a === void 0 ? void 0 : _a.drafts) {
        version = payload.versions[config.slug].findOne({
            parent: id,
        }, {}, {
            sort: { updatedAt: 'desc' },
            lean,
        });
    }
    const collection = await Model.findOne(query, {}, { lean });
    version = await version;
    if (!version || version.updatedAt < collection.updatedAt) {
        return collection;
    }
    return {
        ...version.version,
        updatedAt: version.updatedAt,
        createdAt: version.createdAt,
    };
};
exports.getLatestCollectionVersion = getLatestCollectionVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TGF0ZXN0Q29sbGVjdGlvblZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmVyc2lvbnMvZ2V0TGF0ZXN0Q29sbGVjdGlvblZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBWU8sTUFBTSwwQkFBMEIsR0FBRyxLQUFLLEVBQThCLEVBQzNFLE9BQU8sRUFDUCxVQUFVLEVBQUUsRUFDVixNQUFNLEVBQ04sS0FBSyxHQUNOLEVBQ0QsS0FBSyxFQUNMLEVBQUUsRUFDRixJQUFJLEdBQUcsSUFBSSxHQUNOLEVBQWMsRUFBRTs7SUFDckIsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJLE1BQUEsTUFBTSxDQUFDLFFBQVEsMENBQUUsTUFBTSxFQUFFO1FBQzNCLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDOUMsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUFFLEVBQUUsRUFBRTtZQUNMLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDM0IsSUFBSTtTQUNMLENBQUMsQ0FBQztLQUNKO0lBQ0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBYSxDQUFDO0lBQ3hFLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztJQUN4QixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRTtRQUN4RCxPQUFPLFVBQVUsQ0FBQztLQUNuQjtJQUNELE9BQU87UUFDTCxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ2xCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztRQUM1QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7S0FDN0IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTdCVyxRQUFBLDBCQUEwQiw4QkE2QnJDIn0=