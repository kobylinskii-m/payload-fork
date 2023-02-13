"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const GraphQL = __importStar(require("graphql"));
const graphql_1 = require("graphql");
const graphql_query_complexity_1 = __importStar(require("graphql-query-complexity"));
const buildLocaleInputType_1 = __importDefault(require("./schema/buildLocaleInputType"));
const buildFallbackLocaleInputType_1 = __importDefault(require("./schema/buildFallbackLocaleInputType"));
const init_1 = __importDefault(require("../collections/graphql/init"));
const init_2 = __importDefault(require("../globals/graphql/init"));
const init_3 = __importDefault(require("../preferences/graphql/init"));
const buildPoliciesType_1 = __importDefault(require("./schema/buildPoliciesType"));
const access_1 = __importDefault(require("../auth/graphql/resolvers/access"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
function registerSchema(payload) {
    payload.types = {
        blockTypes: {},
        blockInputTypes: {},
    };
    if (payload.config.localization) {
        payload.types.localeInputType = (0, buildLocaleInputType_1.default)(payload.config.localization);
        payload.types.fallbackLocaleInputType = (0, buildFallbackLocaleInputType_1.default)(payload.config.localization);
    }
    payload.Query = {
        name: 'Query',
        fields: {},
    };
    payload.Mutation = {
        name: 'Mutation',
        fields: {},
    };
    (0, init_1.default)(payload);
    (0, init_2.default)(payload);
    (0, init_3.default)(payload);
    payload.Query.fields.Access = {
        type: (0, buildPoliciesType_1.default)(payload),
        resolve: (0, access_1.default)(payload),
    };
    if (typeof payload.config.graphQL.queries === 'function') {
        const customQueries = payload.config.graphQL.queries(GraphQL, payload);
        payload.Query = {
            ...payload.Query,
            fields: {
                ...payload.Query.fields,
                ...(customQueries || {}),
            },
        };
    }
    if (typeof payload.config.graphQL.mutations === 'function') {
        const customMutations = payload.config.graphQL.mutations(GraphQL, payload);
        payload.Mutation = {
            ...payload.Mutation,
            fields: {
                ...payload.Mutation.fields,
                ...(customMutations || {}),
            },
        };
    }
    const query = new graphql_1.GraphQLObjectType(payload.Query);
    const mutation = new graphql_1.GraphQLObjectType(payload.Mutation);
    const schema = {
        query,
        mutation,
    };
    payload.schema = new graphql_1.GraphQLSchema(schema);
    payload.extensions = async (info) => {
        const { result } = info;
        if (result.errors) {
            payload.errorIndex = 0;
            const afterErrorHook = typeof payload.config.hooks.afterError === 'function' ? payload.config.hooks.afterError : null;
            payload.errorResponses = await (0, errorHandler_1.default)(info, payload.config.debug, afterErrorHook);
        }
        return null;
    };
    payload.customFormatErrorFn = (error) => {
        if (payload.errorResponses && payload.errorResponses[payload.errorIndex]) {
            const response = payload.errorResponses[payload.errorIndex];
            payload.errorIndex += 1;
            return response;
        }
        return error;
    };
    payload.validationRules = (variables) => ([
        (0, graphql_query_complexity_1.default)({
            estimators: [
                (0, graphql_query_complexity_1.fieldExtensionsEstimator)(),
                (0, graphql_query_complexity_1.simpleEstimator)({ defaultComplexity: 1 }), // Fallback if complexity not set
            ],
            maximumComplexity: payload.config.graphQL.maxComplexity,
            variables,
            // onComplete: (complexity) => { console.log('Query Complexity:', complexity); },
        }),
    ]);
}
exports.default = registerSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ3JhcGhxbC9yZWdpc3RlclNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLGlEQUFtQztBQUNuQyxxQ0FBMkQ7QUFDM0QscUZBQXNHO0FBRXRHLHlGQUFpRTtBQUNqRSx5R0FBaUY7QUFDakYsdUVBQTBEO0FBQzFELG1FQUFrRDtBQUNsRCx1RUFBMEQ7QUFDMUQsbUZBQTJEO0FBQzNELDhFQUE4RDtBQUM5RCxrRUFBMEM7QUFFMUMsU0FBd0IsY0FBYyxDQUFDLE9BQWdCO0lBQ3JELE9BQU8sQ0FBQyxLQUFLLEdBQUc7UUFDZCxVQUFVLEVBQUUsRUFBRTtRQUNkLGVBQWUsRUFBRSxFQUFFO0tBQ3BCLENBQUM7SUFFRixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUEsOEJBQW9CLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLElBQUEsc0NBQTRCLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuRztJQUVELE9BQU8sQ0FBQyxLQUFLLEdBQUc7UUFDZCxJQUFJLEVBQUUsT0FBTztRQUNiLE1BQU0sRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUVGLE9BQU8sQ0FBQyxRQUFRLEdBQUc7UUFDakIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLEVBQUU7S0FDWCxDQUFDO0lBRUYsSUFBQSxjQUFlLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsSUFBQSxjQUFXLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsSUFBQSxjQUFlLEVBQUMsT0FBTyxDQUFDLENBQUM7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