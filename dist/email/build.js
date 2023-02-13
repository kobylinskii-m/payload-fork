"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const types_1 = require("../config/types");
const errors_1 = require("../errors");
const mockHandler_1 = __importDefault(require("./mockHandler"));
async function handleTransport(transport, email, logger) {
    try {
        await transport.verify();
    }
    catch (err) {
        logger.error(`There is an error with the email configuration you have provided. ${err.message}`);
    }
    return { ...email, transport };
}
const ensureConfigHasFrom = (emailConfig) => {
    if (!emailConfig.fromName || !emailConfig.fromAddress) {
        throw new errors_1.InvalidConfiguration('Email fromName and fromAddress must be configured when transport is configured');
    }
};
const handleMockAccount = async (emailConfig, logger) => {
    let mockAccount;
    try {
        mockAccount = await (0, mockHandler_1.default)(emailConfig);
        const { account: { web, user, pass } } = mockAccount;
        if (emailConfig.logMockCredentials) {
            logger.info('E-mail configured with mock configuration');
            logger.info(`Log into mock email provider at ${web}`);
            logger.info(`Mock email account username: ${user}`);
            logger.info(`Mock email account password: ${pass}`);
        }
    }
    catch (err) {
        logger.error('There was a problem setting up the mock email handler', err);
    }
    return mockAccount;
};
async function buildEmail(emailConfig, logger) {
    if ((0, types_1.hasTransport)(emailConfig) && emailConfig.transport) {
        ensureConfigHasFrom(emailConfig);
        const email = { ...emailConfig };
        const { transport } = emailConfig;
        return handleTransport(transport, email, logger);
    }
    if ((0, types_1.hasTransportOptions)(emailConfig) && emailConfig.transportOptions) {
        ensureConfigHasFrom(emailConfig);
        const email = { ...emailConfig };
        const transport = nodemailer_1.default.createTransport(emailConfig.transportOptions);
        return handleTransport(transport, email, logger);
    }
    return handleMockAccount(emailConfig, logger);
}
exports.default = buildEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW1haWwvYnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBcUQ7QUFFckQsMkNBQWtHO0FBQ2xHLHNDQUFpRDtBQUNqRCxnRUFBd0M7QUFHeEMsS0FBSyxVQUFVLGVBQWUsQ0FBQyxTQUFzQixFQUFFLEtBQXFCLEVBQUUsTUFBYztJQUMxRixJQUFJO1FBQ0YsTUFBTSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDMUI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxLQUFLLENBQ1YscUVBQXFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FDbkYsQ0FBQztLQUNIO0lBRUQsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxNQUFNLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1FBQ3JELE1BQU0sSUFBSSw2QkFBb0IsQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO0tBQ2xIO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsV0FBeUIsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUM1RSxJQUFJLFdBQTZCLENBQUM7SUFDbEMsSUFBSTtRQUNGLFdBQVcsR0FBRyxNQUFNLElBQUEscUJBQVcsRUFBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUNyRCxJQUFJLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRTtZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDckQ7S0FDRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyx1REFBdUQsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM1RTtJQUNELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQUVhLEtBQUssVUFBVSxVQUFVLENBQUMsV0FBeUIsRUFBRSxNQUFjO0lBQ2hGLElBQUksSUFBQSxvQkFBWSxFQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7UUFDdEQsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBOEIsV0FBVyxDQUFDO1FBQzdELE9BQU8sZUFBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7SUFFRCxJQUFJLElBQUEsMkJBQW1CLEVBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFO1FBQ3BFLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsR0FBRyxXQUFXLEVBQW9CLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsT0FBTyxlQUFlLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsRDtJQUVELE9BQU8saUJBQWlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFoQkQsNkJBZ0JDIn0=