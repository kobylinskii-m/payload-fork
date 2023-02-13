"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatName_1 = __importDefault(require("../../../graphql/utilities/formatName"));
const access_1 = __importDefault(require("../../operations/access"));
const formatConfigNames = (results, configs) => {
    const formattedResults = { ...results };
    configs.forEach(({ slug }) => {
        const result = { ...(formattedResults[slug] || {}) };
        delete formattedResults[slug];
        formattedResults[(0, formatName_1.default)(slug)] = result;
    });
    return formattedResults;
};
function accessResolver(payload) {
    async function resolver(_, args, context) {
        const options = {
            req: context.req,
        };
        const accessResults = await (0, access_1.default)(options);
        return {
            ...accessResults,
            ...formatConfigNames(accessResults.collections, payload.config.collections),
            ...formatConfigNames(accessResults.globals, payload.config.globals),
        };
    }
    return resolver;
}
exports.default = accessResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2F1dGgvZ3JhcGhxbC9yZXNvbHZlcnMvYWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUZBQStEO0FBQy9ELHFFQUE2QztBQUc3QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDM0IsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyRCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLGdCQUFnQixDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsU0FBUyxjQUFjLENBQUMsT0FBZ0I7SUFDdEMsS0FBSyxVQUFVLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU87UUFDdEMsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDakIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBQSxnQkFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU87WUFDTCxHQUFHLGFBQWE7WUFDaEIsR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNFLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNwRSxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==