"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const errors_1 = require("../../errors");
async function forgotPassword(incomingArgs) {
    if (!Object.prototype.hasOwnProperty.call(incomingArgs.data, 'email')) {
        throw new errors_1.APIError('Missing email.', 400);
    }
    let args = incomingArgs;
    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////
    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
        await priorHook;
        args = (await hook({
            args,
            operation: 'forgotPassword',
        })) || args;
    }, Promise.resolve());
    const { collection: { Model, config: collectionConfig, }, data, disableEmail, expiration, req: { t, payload: { config, sendEmail: email, emailOptions, }, }, req, } = args;
    // /////////////////////////////////////
    // Forget password
    // /////////////////////////////////////
    let token = crypto_1.default.randomBytes(20);
    token = token.toString('hex');
    const user = await Model.findOne({ email: data.email.toLowerCase() });
    if (!user)
        return null;
    user.resetPasswordToken = token;
    user.resetPasswordExpiration = expiration || Date.now() + 3600000; // 1 hour
    await user.save();
    const userJSON = user.toJSON({ virtuals: true });
    if (!disableEmail) {
        let html = `${t('authentication:youAreReceivingResetPassword')}
    <a href="${config.serverURL}${config.routes.admin}/reset/${token}">
     ${config.serverURL}${config.routes.admin}/reset/${token}
    </a>
    ${t('authentication:youDidNotRequestPassword')}`;
        if (typeof collectionConfig.auth.forgotPassword.generateEmailHTML === 'function') {
            html = await collectionConfig.auth.forgotPassword.generateEmailHTML({
                req,
                token,
                user: userJSON,
            });
        }
        let subject = t('authentication:resetYourPassword');
        if (typeof collectionConfig.auth.forgotPassword.generateEmailSubject === 'function') {
            subject = await collectionConfig.auth.forgotPassword.generateEmailSubject({
                req,
                token,
                user: userJSON,
            });
        }
        email({
            from: `"${emailOptions.fromName}" <${emailOptions.fromAddress}>`,
            to: data.email,
            subject,
            html,
        });
    }
    // /////////////////////////////////////
    // afterForgotPassword - Collection
    // /////////////////////////////////////
    await collectionConfig.hooks.afterForgotPassword.reduce(async (priorHook, hook) => {
        await priorHook;
        await hook({ args });
    }, Promise.resolve());
    return token;
}
exports.default = forgotPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290UGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL2ZvcmdvdFBhc3N3b3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLHlDQUF3QztBQWlCeEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxZQUF1QjtJQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUU7UUFDckUsTUFBTSxJQUFJLGlCQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDM0M7SUFFRCxJQUFJLElBQUksR0FBRyxZQUFZLENBQUM7SUFFeEIsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUMvQix3Q0FBd0M7SUFFeEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xGLE1BQU0sU0FBUyxDQUFDO1FBRWhCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ2pCLElBQUk7WUFDSixTQUFTLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNkLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV0QixNQUFNLEVBQ0osVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxnQkFBZ0IsR0FDekIsRUFDRCxJQUFJLEVBQ0osWUFBWSxFQUNaLFVBQVUsRUFDVixHQUFHLEVBQUUsRUFDSCxDQUFDLEVBQ0QsT0FBTyxFQUFFLEVBQ1AsTUFBTSxFQUNOLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLFlBQVksR0FDYixHQUNGLEVBQ0QsR0FBRyxHQUNKLEdBQUcs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