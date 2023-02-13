"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../fields/config/types");
function fieldHasSubFields(field) {
    return (field.type === "group" ||
        field.type === "array" ||
        field.type === "row" ||
        field.type === "collapsible" ||
        (field.type === "relationship" && typeof field.fields !== "undefined"));
}
const flattenFields = (fields, path = [], keepPresentationalFields) => {
    return fields.reduce((fieldsToUse, field) => {
        if (fieldHasSubFields(field)) {
            const _path = [...path];
            if (field.type !== "row")
                _path.push(field.name);
            return [
                ...fieldsToUse,
                ...flattenFields(field.fields, _path, keepPresentationalFields),
            ];
        }
        if ((0, types_1.fieldAffectsData)(field) ||
            (keepPresentationalFields && (0, types_1.fieldIsPresentationalOnly)(field))) {
            return [
                ...fieldsToUse,
                { ...field, name: [...path, field.name].join(".") },
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
                            : flattenFields(tab.fields, path, keepPresentationalFields)),
                    ];
                }, []),
            ];
        }
        return fieldsToUse;
    }, []);
};
exports.default = flattenFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbkZpZWxkc0ZvclNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvZmxhdHRlbkZpZWxkc0ZvclNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQVVnQztBQUVoQyxTQUFTLGlCQUFpQixDQUN4QixLQUFzQjtJQUV0QixPQUFPLENBQ0wsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTztRQUN0QixLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7UUFDcEIsS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhO1FBQzVCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUN2RSxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLENBQ3BCLE1BQWUsRUFDZixPQUFpQixFQUFFLEVBQ25CLHdCQUFrQyxFQUNnQixFQUFFO0lBQ3BELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSztnQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFFLEtBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEUsT0FBTztnQkFDTCxHQUFHLFdBQVc7Z0JBQ2QsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsd0JBQXdCLENBQUM7YUFDaEUsQ0FBQztTQUNIO1FBRUQsSUFDRSxJQUFBLHdCQUFnQixFQUFDLEtBQUssQ0FBQztZQUN2QixDQUFDLHdCQUF3QixJQUFJLElBQUEsaUNBQXlCLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFDOUQ7WUFDQSxPQUFPO2dCQUNMLEdBQUcsV0FBVztnQkFDZCxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7YUFDcEQsQ0FBQztTQUNIO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN6QixPQUFPO2dCQUNMLEdBQUcsV0FBVztnQkFDZCxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUN0QyxPQUFPO3dCQUNMLEdBQUcsU0FBUzt3QkFDWixHQUFHLENBQUMsSUFBQSxrQkFBVSxFQUFDLEdBQUcsQ0FBQzs0QkFDakIsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7NEJBQzNCLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztxQkFDL0QsQ0FBQztnQkFDSixDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ1AsQ0FBQztTQUNIO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIn0=