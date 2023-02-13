"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestGlobalVersion = void 0;
const getLatestGlobalVersion = async ({ payload, config, query, }) => {
    var _a;
    let version;
    if ((_a = config.versions) === null || _a === void 0 ? void 0 : _a.drafts) {
        version = payload.versions[config.slug].findOne({}, {}, {
            sort: {
                updatedAt: 'desc',
            },
            lean: true,
        });
    }
    const global = await payload.globals.Model.findOne(query).lean();
    version = await version;
    if (!version || version.updatedAt < global.updatedAt) {
        return global;
    }
    return {
        ...version.version,
        updatedAt: version.updatedAt,
        createdAt: version.createdAt,
    };
};
exports.getLatestGlobalVersion = getLatestGlobalVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TGF0ZXN0R2xvYmFsVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJzaW9ucy9nZXRMYXRlc3RHbG9iYWxWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdPLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUE4QixFQUN2RSxPQUFPLEVBQ1AsTUFBTSxFQUNOLEtBQUssR0FDQSxFQUFjLEVBQUU7O0lBQ3JCLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxNQUFBLE1BQU0sQ0FBQyxRQUFRLDBDQUFFLE1BQU0sRUFBRTtRQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7S0FDSjtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBYyxDQUFDO0lBQzdFLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztJQUN4QixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUNwRCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsT0FBTztRQUNMLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDbEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQzVCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztLQUM3QixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBeEJXLFFBQUEsc0JBQXNCLDBCQXdCakMifQ==