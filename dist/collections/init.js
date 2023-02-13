"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const passport_1 = __importDefault(require("passport"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const apiKey_1 = __importDefault(require("../auth/strategies/apiKey"));
const mountEndpoints_1 = __importDefault(require("../express/mountEndpoints"));
const buildQuery_1 = __importDefault(require("../mongoose/buildQuery"));
const buildSchema_1 = __importDefault(require("../mongoose/buildSchema"));
const buildCollectionFields_1 = require("../versions/buildCollectionFields");
const getVersionsModelName_1 = require("../versions/getVersionsModelName");
const bindCollection_1 = __importDefault(require("./bindCollection"));
const buildEndpoints_1 = __importDefault(require("./buildEndpoints"));
const buildSchema_2 = __importDefault(require("./buildSchema"));
function registerCollections(ctx) {
    ctx.config.collections = ctx.config.collections.map((collection) => {
        const formattedCollection = collection;
        const schema = (0, buildSchema_2.default)(formattedCollection, ctx.config);
        if (collection.auth && !collection.auth.disableLocalStrategy) {
            schema.plugin(passport_local_mongoose_1.default, {
                usernameField: 'email',
            });
            const { maxLoginAttempts, lockTime } = collection.auth;
            if (maxLoginAttempts > 0) {
                // eslint-disable-next-line func-names
                schema.methods.incLoginAttempts = function (cb) {
                    // Expired lock, restart count at 1
                    if (this.lockUntil && this.lockUntil < Date.now()) {
                        return this.updateOne({
                            $set: { loginAttempts: 1 },
                            $unset: { lockUntil: 1 },
                        }, cb);
                    }
                    const updates = { $inc: { loginAttempts: 1 } };
                    // Lock the account if at max attempts and not already locked
                    if (this.loginAttempts + 1 >= maxLoginAttempts && !this.isLocked) {
                        updates.$set = { lockUntil: Date.now() + lockTime };
                    }
                    return this.updateOne(updates, cb);
                };
                // eslint-disable-next-line func-names
                schema.methods.resetLoginAttempts = function (cb) {
                    return this.updateOne({
                        $set: { loginAttempts: 0 },
                        $unset: { lockUntil: 1 },
                    }, cb);
                };
            }
        }
        if (collection.versions) {
            const versionModelName = (0, getVersionsModelName_1.getVersionsModelName)(collection);
            const versionSchema = (0, buildSchema_1.default)(ctx.config, (0, buildCollectionFields_1.buildVersionCollectionFields)(collection), {
                disableUnique: true,
                options: {
                    timestamps: true,
                },
            });
            versionSchema.plugin(mongoose_paginate_v2_1.default, { useEstimatedCount: true })
                .plugin(buildQuery_1.default);
            ctx.versions[collection.slug] = mongoose_1.default.model(versionModelName, versionSchema);
        }
        ctx.collections[formattedCollection.slug] = {
            Model: mongoose_1.default.model(formattedCollection.slug, schema, formattedCollection === null || formattedCollection === void 0 ? void 0 : formattedCollection.collectionName),
            config: formattedCollection,
        };
        // If not local, open routes
        if (!ctx.local) {
            const router = express_1.default.Router();
            const { slug } = collection;
            router.all('*', (0, bindCollection_1.default)(ctx.collections[formattedCollection.slug]));
            if (collection.auth) {
                const AuthCollection = ctx.collections[formattedCollection.slug];
                if (collection.auth.useAPIKey) {
                    passport_1.default.use(`${AuthCollection.config.slug}-api-key`, (0, apiKey_1.default)(ctx, AuthCollection));
                }
                if (Array.isArray(collection.auth.strategies)) {
                    collection.auth.strategies.forEach(({ name, strategy }, index) => {
                        const passportStrategy = typeof strategy === 'object' ? strategy : strategy(ctx);
                        passport_1.default.use(`${AuthCollection.config.slug}-${name !== null && name !== void 0 ? name : index}`, passportStrategy);
                    });
                }
            }
            const endpoints = (0, buildEndpoints_1.default)(collection);
            (0, mountEndpoints_1.default)(ctx.express, router, endpoints);
            ctx.router.use(`/${slug}`, router);
        }
        return formattedCollection;
    });
}
exports.default = registerCollections;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xsZWN0aW9ucy9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHdEQUF5RTtBQUN6RSxnRkFBNEM7QUFDNUMsd0RBQWdDO0FBQ2hDLHNGQUE0RDtBQUM1RCx1RUFBdUQ7QUFDdkQsK0VBQXVEO0FBRXZELHdFQUFzRDtBQUN0RCwwRUFBa0Q7QUFDbEQsNkVBQWlGO0FBQ2pGLDJFQUF3RTtBQUN4RSxzRUFBd0Q7QUFDeEQsc0VBQThDO0FBQzlDLGdFQUFrRDtBQUdsRCxTQUF3QixtQkFBbUIsQ0FBQyxHQUFZO0lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQXFDLEVBQUUsRUFBRTtRQUM1RixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztRQUV2QyxNQUFNLE1BQU0sR0FBRyxJQUFBLHFCQUFxQixFQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RSxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzVELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUNBQXFCLEVBQUU7Z0JBQ25DLGFBQWEsRUFBRSxPQUFPO2FBQ3ZCLENBQUMsQ0FBQztZQUdILE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRXZELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO2dCQU94QixzQ0FBc0M7Z0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsVUFBaUQsRUFBRTtvQkFDbkYsbUNBQW1DO29CQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsR0FB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