"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statuses = void 0;
const extractTranslations_1 = require("../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['version:draft', 'version:published', 'version:status']);
exports.statuses = [
    {
        label: labels['version:draft'],
        value: 'draft',
    },
    {
        label: labels['version:published'],
        value: 'published',
    },
];
const baseVersionFields = [
    {
        name: '_status',
        label: labels['version:status'],
        type: 'select',
        options: exports.statuses,
        defaultValue: 'draft',
        admin: {
            components: {
                Field: () => null,
            },
        },
    },
];
exports.default = baseVersionFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92ZXJzaW9ucy9iYXNlRmllbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZFQUEwRTtBQUUxRSxNQUFNLE1BQU0sR0FBRyxJQUFBLHlDQUFtQixFQUFDLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUVoRixRQUFBLFFBQVEsR0FBRztJQUN0QjtRQUNFLEtBQUssRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzlCLEtBQUssRUFBRSxPQUFPO0tBQ2Y7SUFDRDtRQUNFLEtBQUssRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDbEMsS0FBSyxFQUFFLFdBQVc7S0FDbkI7Q0FDRixDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBWTtJQUNqQztRQUNFLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxnQkFBUTtRQUNqQixZQUFZLEVBQUUsT0FBTztRQUNyQixLQUFLLEVBQUU7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7YUFDbEI7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGlCQUFpQixDQUFDIn0=