"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
const path_1 = __importDefault(require("path"));
exports.defaults = {
    serverURL: '',
    defaultDepth: 2,
    maxDepth: 10,
    defaultMaxTextLength: 40000,
    collections: [],
    globals: [],
    endpoints: [],
    cookiePrefix: 'payload',
    csrf: [],
    cors: [],
    admin: {
        meta: {
            titleSuffix: '- Payload',
        },
        disable: false,
        indexHTML: path_1.default.resolve(__dirname, '../admin/index.html'),
        avatar: 'default',
        components: {},
        logoutRoute: '/logout',
        inactivityRoute: '/logout-inactivity',
        css: path_1.default.resolve(__dirname, '../admin/scss/custom.css'),
        dateFormat: 'MMMM do yyyy, h:mm a',
    },
    typescript: {
        outputFile: `${typeof (process === null || process === void 0 ? void 0 : process.cwd) === 'function' ? process.cwd() : ''}/payload-types.ts`,
    },
    upload: {},
    graphQL: {
        maxComplexity: 1000,
        disablePlaygroundInProduction: true,
        schemaOutputFile: `${typeof (process === null || process === void 0 ? void 0 : process.cwd) === 'function' ? process.cwd() : ''}/schema.graphql`,
    },
    routes: {
        admin: '/admin',
        api: '/api',
        graphQL: '/graphql',
        graphQLPlayground: '/graphql-playground',
    },
    rateLimit: {
        window: 15 * 60 * 100,
        max: 500,
    },
    express: {
        json: {},
        compression: {},
        middleware: [],
        preMiddleware: [],
        postMiddleware: [],
    },
    hooks: {},
    localization: false,
    telemetry: true,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RlZmF1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUdYLFFBQUEsUUFBUSxHQUFXO0lBQzlCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsWUFBWSxFQUFFLENBQUM7SUFDZixRQUFRLEVBQUUsRUFBRTtJQUNaLG9CQUFvQixFQUFFLEtBQUs7SUFDM0IsV0FBVyxFQUFFLEVBQUU7SUFDZixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxFQUFFO0lBQ2IsWUFBWSxFQUFFLFNBQVM7SUFDdkIsSUFBSSxFQUFFLEVBQUU7SUFDUixJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRTtZQUNKLFdBQVcsRUFBRSxXQUFXO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUM7UUFDekQsTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxXQUFXLEVBQUUsU0FBUztRQUN0QixlQUFlLEVBQUUsb0JBQW9CO1FBQ3JDLEdBQUcsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztRQUN4RCxVQUFVLEVBQUUsc0JBQXNCO0tBQ25DO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLENBQUEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUI7S0FDMUY7SUFDRCxNQUFNLEVBQUUsRUFBRTtJQUNWLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxJQUFJO1FBQ25CLDZCQUE2QixFQUFFLElBQUk7UUFDbkMsZ0JBQWdCLEVBQUUsR0FBRyxPQUFPLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQjtLQUM5RjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxRQUFRO1FBQ2YsR0FBRyxFQUFFLE1BQU07UUFDWCxPQUFPLEVBQUUsVUFBVTtRQUNuQixpQkFBaUIsRUFBRSxxQkFBcUI7S0FDekM7SUFDRCxTQUFTLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHO1FBQ3JCLEdBQUcsRUFBRSxHQUFHO0tBQ1Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsRUFBRTtRQUNSLFdBQVcsRUFBRSxFQUFFO1FBQ2YsVUFBVSxFQUFFLEVBQUU7UUFDZCxhQUFhLEVBQUUsRUFBRTtRQUNqQixjQUFjLEVBQUUsRUFBRTtLQUNuQjtJQUNELEtBQUssRUFBRSxFQUFFO0lBQ1QsWUFBWSxFQUFFLEtBQUs7SUFDbkIsU0FBUyxFQUFFLElBQUk7Q0FDaEIsQ0FBQyJ9