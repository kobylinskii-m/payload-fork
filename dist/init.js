"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSync = exports.initAsync = exports.init = void 0;
/* eslint-disable no-param-reassign */
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const authenticate_1 = __importDefault(require("./express/middleware/authenticate"));
const connect_1 = __importDefault(require("./mongoose/connect"));
const middleware_1 = __importDefault(require("./express/middleware"));
const admin_1 = __importDefault(require("./express/admin"));
const init_1 = __importDefault(require("./auth/init"));
const access_1 = __importDefault(require("./auth/requestHandlers/access"));
const init_2 = __importDefault(require("./collections/init"));
const init_3 = __importDefault(require("./preferences/init"));
const init_4 = __importDefault(require("./globals/init"));
const initPlayground_1 = __importDefault(require("./graphql/initPlayground"));
const static_1 = __importDefault(require("./express/static"));
const registerSchema_1 = __importDefault(require("./graphql/registerSchema"));
const graphQLHandler_1 = __importDefault(require("./graphql/graphQLHandler"));
const build_1 = __importDefault(require("./email/build"));
const identifyAPI_1 = __importDefault(require("./express/middleware/identifyAPI"));
const errorHandler_1 = __importDefault(require("./express/middleware/errorHandler"));
const sendEmail_1 = __importDefault(require("./email/sendEmail"));
const serverInit_1 = require("./utilities/telemetry/events/serverInit");
const load_1 = __importDefault(require("./config/load"));
const logger_1 = __importDefault(require("./utilities/logger"));
const dataloader_1 = require("./collections/dataloader");
const mountEndpoints_1 = __importDefault(require("./express/mountEndpoints"));
const init = (payload, options) => {
    payload.logger.info('Starting Payload...');
    if (!options.secret) {
        throw new Error('Error: missing secret key. A secret key is needed to secure Payload.');
    }
    if (options.mongoURL !== false && typeof options.mongoURL !== 'string') {
        throw new Error('Error: missing MongoDB connection URL.');
    }
    payload.emailOptions = { ...(options.email) };
    payload.secret = crypto_1.default
        .createHash('sha256')
        .update(options.secret)
        .digest('hex')
        .slice(0, 32);
    payload.local = options.local;
    payload.config = (0, load_1.default)(payload.logger);
    // If not initializing locally, scaffold router
    if (!payload.local) {
        payload.router = express_1.default.Router();
        payload.router.use(...(0, middleware_1.default)(payload));
        (0, init_1.default)(payload);
    }
    // Configure email service
    payload.email = (0, build_1.default)(payload.emailOptions, payload.logger);
    payload.sendEmail = sendEmail_1.default.bind(payload);
    // Initialize collections & globals
    (0, init_2.default)(payload);
    (0, init_4.default)(payload);
    if (!payload.config.graphQL.disable) {
        (0, registerSchema_1.default)(payload);
    }
    // If not initializing locally, set up HTTP routing
    if (!payload.local) {
        options.express.use((req, res, next) => {
            req.payload = payload;
            next();
        });
        options.express.use((req, res, next) => {
            req.payloadDataLoader = (0, dataloader_1.getDataLoader)(req);
            return next();
        });
        payload.express = options.express;
        if (payload.config.rateLimit.trustProxy) {
            payload.express.set('trust proxy', 1);
        }
        (0, admin_1.default)(payload);
        (0, init_3.default)(payload);
        payload.router.get('/access', access_1.default);
        if (!payload.config.graphQL.disable) {
            payload.router.use(payload.config.routes.graphQL, (req, res, next) => {
                if (req.method === 'OPTIONS') {
                    res.sendStatus(204);
                }
                else {
                    next();
                }
            }, (0, identifyAPI_1.default)('GraphQL'), (req, res) => (0, graphQLHandler_1.default)(req, res)(req, res));
            (0, initPlayground_1.default)(payload);
        }
        (0, mountEndpoints_1.default)(options.express, payload.router, payload.config.endpoints);
        // Bind router to API
        payload.express.use(payload.config.routes.api, payload.router);
        // Enable static routes for all collections permitting upload
        (0, static_1.default)(payload);
        payload.errorHandler = (0, errorHandler_1.default)(payload.config, payload.logger);
        payload.router.use(payload.errorHandler);
        payload.authenticate = (0, authenticate_1.default)(payload.config);
    }
    (0, serverInit_1.serverInit)(payload);
};
exports.init = init;
const initAsync = async (payload, options) => {
    payload.logger = (0, logger_1.default)('payload', options.loggerOptions);
    payload.mongoURL = options.mongoURL;
    if (payload.mongoURL) {
        mongoose_1.default.set('strictQuery', false);
        payload.mongoMemoryServer = await (0, connect_1.default)(payload.mongoURL, options.mongoOptions, payload.logger);
    }
    (0, exports.init)(payload, options);
    if (typeof options.onInit === 'function')
        await options.onInit(payload);
    if (typeof payload.config.onInit === 'function')
        await payload.config.onInit(payload);
};
exports.initAsync = initAsync;
const initSync = (payload, options) => {
    payload.logger = (0, logger_1.default)('payload', options.loggerOptions);
    payload.mongoURL = options.mongoURL;
    if (payload.mongoURL) {
        mongoose_1.default.set('strictQuery', false);
        (0, connect_1.default)(payload.mongoURL, options.mongoOptions, payload.logger);
    }
    (0, exports.init)(payload, options);
    if (typeof options.onInit === 'function')
        options.onInit(payload);
    if (typeof payload.config.onInit === 'function')
        payload.config.onInit(payload);
};
exports.initSync = initSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNDQUFzQztBQUN0QyxzREFBMEQ7QUFDMUQsb0RBQTRCO0FBQzVCLHdEQUFnQztBQUdoQyxxRkFBNkQ7QUFDN0QsaUVBQWlEO0FBQ2pELHNFQUFxRDtBQUNyRCw0REFBd0M7QUFDeEMsdURBQW1DO0FBQ25DLDJFQUFtRDtBQUNuRCw4REFBaUQ7QUFDakQsOERBQWlEO0FBQ2pELDBEQUF5QztBQUN6Qyw4RUFBNkQ7QUFDN0QsOERBQTBDO0FBQzFDLDhFQUFzRDtBQUN0RCw4RUFBc0Q7QUFDdEQsMERBQXVDO0FBQ3ZDLG1GQUEyRDtBQUMzRCxxRkFBNkQ7QUFFN0Qsa0VBQTBDO0FBRTFDLHdFQUE0RjtBQUU1Rix5REFBdUM7QUFDdkMsZ0VBQXdDO0FBQ3hDLHlEQUF5RDtBQUN6RCw4RUFBc0Q7QUFFL0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFnQixFQUFFLE9BQW9CLEVBQVEsRUFBRTtJQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0VBQXNFLENBQ3ZFLENBQUM7S0FDSDtJQUVELElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUN0RSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxPQUFPLENBQUMsWUFBWSxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsZ0JBQU07U0FDcEIsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQixNQUFNLENBQUMs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