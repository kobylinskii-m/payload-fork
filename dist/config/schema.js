"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const component = joi_1.default.alternatives().try(joi_1.default.object().unknown(), joi_1.default.func());
exports.endpointsSchema = joi_1.default.array().items(joi_1.default.object({
    path: joi_1.default.string(),
    method: joi_1.default.string().valid('get', 'head', 'post', 'put', 'patch', 'delete', 'connect', 'options'),
    root: joi_1.default.bool(),
    handler: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.func()), joi_1.default.func()),
}));
exports.default = joi_1.default.object({
    serverURL: joi_1.default.string()
        .uri()
        .allow('')
        .custom((value, helper) => {
        const urlWithoutProtocol = value.split('//')[1];
        if (!urlWithoutProtocol) {
            return helper.message({ custom: 'You need to include either "https://" or "http://" in your serverURL.' });
        }
        if (urlWithoutProtocol.indexOf('/') > -1) {
            return helper.message({ custom: 'Your serverURL cannot have a path. It can only contain a protocol, a domain, and an optional port.' });
        }
        return value;
    }),
    cookiePrefix: joi_1.default.string(),
    routes: joi_1.default.object({
        admin: joi_1.default.string(),
        api: joi_1.default.string().allow(''),
        graphQL: joi_1.default.string(),
        graphQLPlayground: joi_1.default.string(),
    }),
    typescript: joi_1.default.object({
        outputFile: joi_1.default.string(),
    }),
    collections: joi_1.default.array(),
    endpoints: exports.endpointsSchema,
    globals: joi_1.default.array(),
    admin: joi_1.default.object({
        user: joi_1.default.string(),
        meta: joi_1.default.object()
            .keys({
            titleSuffix: joi_1.default.string(),
            ogImage: joi_1.default.string(),
            favicon: joi_1.default.string(),
        }),
        disable: joi_1.default.bool(),
        indexHTML: joi_1.default.string(),
        css: joi_1.default.string(),
        dateFormat: joi_1.default.string(),
        avatar: joi_1.default.alternatives()
            .try(joi_1.default.string(), component),
        logoutRoute: joi_1.default.string(),
        inactivityRoute: joi_1.default.string(),
        components: joi_1.default.object()
            .keys({
            routes: joi_1.default.array()
                .items(joi_1.default.object().keys({
                Component: component.required(),
                path: joi_1.default.string().required(),
                exact: joi_1.default.bool(),
                strict: joi_1.default.bool(),
                sensitive: joi_1.default.bool(),
            })),
            providers: joi_1.default.array().items(component),
            beforeDashboard: joi_1.default.array().items(component),
            afterDashboard: joi_1.default.array().items(component),
            beforeLogin: joi_1.default.array().items(component),
            afterLogin: joi_1.default.array().items(component),
            beforeNavLinks: joi_1.default.array().items(component),
            afterNavLinks: joi_1.default.array().items(component),
            Nav: component,
            logout: joi_1.default.object({
                Button: component,
            }),
            views: joi_1.default.object({
                Dashboard: component,
                Account: component,
            }),
            graphics: joi_1.default.object({
                Icon: component,
                Logo: component,
            }),
        }),
        webpack: joi_1.default.func(),
    }),
    i18n: joi_1.default.object(),
    defaultDepth: joi_1.default.number()
        .min(0)
        .max(30),
    maxDepth: joi_1.default.number()
        .min(0)
        .max(100),
    defaultMaxTextLength: joi_1.default.number(),
    csrf: joi_1.default.array()
        .items(joi_1.default.string().allow(''))
        .sparse(),
    cors: [
        joi_1.default.string()
            .valid('*'),
        joi_1.default.array()
            .items(joi_1.default.string()),
    ],
    express: joi_1.default.object()
        .keys({
        json: joi_1.default.object(),
        compression: joi_1.default.object(),
        middleware: joi_1.default.array().items(joi_1.default.func()),
        preMiddleware: joi_1.default.array().items(joi_1.default.func()),
        postMiddleware: joi_1.default.array().items(joi_1.default.func()),
    }),
    local: joi_1.default.boolean(),
    upload: joi_1.default.object(),
    indexSortableFields: joi_1.default.boolean(),
    rateLimit: joi_1.default.object()
        .keys({
        window: joi_1.default.number(),
        max: joi_1.default.number(),
        trustProxy: joi_1.default.boolean(),
        skip: joi_1.default.func(),
    }),
    graphQL: joi_1.default.object()
        .keys({
        mutations: joi_1.default.function(),
        queries: joi_1.default.function(),
        maxComplexity: joi_1.default.number(),
        disablePlaygroundInProduction: joi_1.default.boolean(),
        disable: joi_1.default.boolean(),
        schemaOutputFile: joi_1.default.string(),
    }),
    localization: joi_1.default.alternatives()
        .try(joi_1.default.object().keys({
        locales: joi_1.default.array().items(joi_1.default.string()),
        defaultLocale: joi_1.default.string(),
        fallback: joi_1.default.boolean(),
    }), joi_1.default.boolean()),
    hooks: joi_1.default.object().keys({
        afterError: joi_1.default.func(),
    }),
    telemetry: joi_1.default.boolean(),
    plugins: joi_1.default.array().items(joi_1.default.func()),
    onInit: joi_1.default.func(),
    debug: joi_1.default.boolean(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsOENBQXNCO0FBRXRCLE1BQU0sU0FBUyxHQUFHLGFBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQ3RDLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFDdEIsYUFBRyxDQUFDLElBQUksRUFBRSxDQUNYLENBQUM7QUFFVyxRQUFBLGVBQWUsR0FBRyxhQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxNQUFNLENBQUM7SUFDMUQsSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDbEIsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztJQUNqRyxJQUFJLEVBQUUsYUFBRyxDQUFDLElBQUksRUFBRTtJQUNoQixPQUFPLEVBQUUsYUFBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FDN0IsYUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDN0IsYUFBRyxDQUFDLElBQUksRUFBRSxDQUNYO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSixrQkFBZSxhQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3hCLFNBQVMsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO1NBQ3BCLEdBQUcsRUFBRTtTQUNMLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDVCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUks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