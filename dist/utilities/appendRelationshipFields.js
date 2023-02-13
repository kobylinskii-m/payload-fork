"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function appendFields(collections, fields) {
    return fields.map((field) => {
        if (field.type !== "relationship") {
            return field;
        }
        const relative_collection = collections.find((col) => col.slug === field.relationTo);
        if (!relative_collection) {
            return field;
        }
        return { ...field, fields: relative_collection.fields };
    });
}
exports.default = appendFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kUmVsYXRpb25zaGlwRmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9hcHBlbmRSZWxhdGlvbnNoaXBGaWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxTQUF3QixZQUFZLENBQ2xDLFdBQStCLEVBQy9CLE1BQWU7SUFFZixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMxQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQ2pDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQzFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQ3ZDLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJELCtCQWtCQyJ9