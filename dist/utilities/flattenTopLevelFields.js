"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../fields/config/types");
const flattenFields = (fields, keepPresentationalFields) => {
    return fields.reduce((fieldsToUse, field) => {
        if ((0, types_1.fieldAffectsData)(field) ||
            (keepPresentationalFields && (0, types_1.fieldIsPresentationalOnly)(field))) {
            return [...fieldsToUse, field];
        }
        if ((0, types_1.fieldHasSubFields)(field)) {
            return [
                ...fieldsToUse,
                ...flattenFields(field.fields, keepPresentationalFields),
            ];
        }
        if (field.type === "tabs") {
            return [
                ...fieldsToUse,
                ...field.tabs.reduce((tabFields, tab) => {
                    return [
                        ...tabFields,
                        ...((0, types_1.tabHasName)(tab)
                            ? [{ ...tab, type: "tab" }]
                            : flattenFields(tab.fields, keepPresentationalFields)),
                    ];
                }, []),
            ];
        }
        return fieldsToUse;
    }, []);
};
exports.default = flattenFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlblRvcExldmVsRmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9mbGF0dGVuVG9wTGV2ZWxGaWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFRZ0M7QUFFaEMsTUFBTSxhQUFhLEdBQUcsQ0FDcEIsTUFBZSxFQUNmLHdCQUFrQyxFQUNnQixFQUFFO0lBQ3BELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxJQUNFLElBQUEsd0JBQWdCLEVBQUMsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsd0JBQXdCLElBQUksSUFBQSxpQ0FBeUIsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUM5RDtZQUNBLE9BQU8sQ0FBQyxHQUFHLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELElBQUksSUFBQSx5QkFBaUIsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPO2dCQUNMLEdBQUcsV0FBVztnQkFDZCxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDO2FBQ3pELENBQUM7U0FDSDtRQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDekIsT0FBTztnQkFDTCxHQUFHLFdBQVc7Z0JBQ2QsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDdEMsT0FBTzt3QkFDTCxHQUFHLFNBQVM7d0JBQ1osR0FBRyxDQUFDLElBQUEsa0JBQVUsRUFBQyxHQUFHLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDOzRCQUMzQixDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztxQkFDekQsQ0FBQztnQkFDSixDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ1AsQ0FBQztTQUNIO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIn0=