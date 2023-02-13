"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sendVerificationEmail(args) {
    // Verify token from e-mail
    const { config, emailOptions, sendEmail, collection: { config: collectionConfig, }, user, disableEmail, req, token, } = args;
    if (!disableEmail) {
        const verificationURL = `${config.serverURL}${config.routes.admin}/${collectionConfig.slug}/verify/${token}`;
        let html = `${req.t('authentication:newAccountCreated', { interpolation: { escapeValue: false }, serverURL: config.serverURL, verificationURL })}`;
        const verify = collectionConfig.auth.verify;
        // Allow config to override email content
        if (typeof verify.generateEmailHTML === 'function') {
            html = await verify.generateEmailHTML({
                req,
                token,
                user,
            });
        }
        let subject = req.t('authentication:verifyYourEmail');
        // Allow config to override email subject
        if (typeof verify.generateEmailSubject === 'function') {
            subject = await verify.generateEmailSubject({
                req,
                token,
                user,
            });
        }
        sendEmail({
            from: `"${emailOptions.fromName}" <${emailOptions.fromAddress}>`,
            to: user.email,
            subject,
            html,
        });
    }
}
exports.default = sendVerificationEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZFZlcmlmaWNhdGlvbkVtYWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F1dGgvc2VuZFZlcmlmaWNhdGlvbkVtYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBa0JBLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxJQUFVO0lBQzdDLDJCQUEyQjtJQUMzQixNQUFNLEVBQ0osTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUFFLEVBQ1YsTUFBTSxFQUFFLGdCQUFnQixHQUN6QixFQUNELElBQUksRUFDSixZQUFZLEVBQ1osR0FBRyxFQUNILEtBQUssR0FDTixHQUFHLElBQUksQ0FBQztJQUVULElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsTUFBTSxlQUFlLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLGdCQUFnQixDQUFDLElBQUksV0FBVyxLQUFLLEVBQUUsQ0FBQztRQUU3RyxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0NBQWtDLEVBQUUsRUFBRSxhQUFhLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRW5KLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFzQixDQUFDO1FBRTVELHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixLQUFLLFVBQVUsRUFBRTtZQUNsRCxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3BDLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCxJQUFJO2FBQ0wsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFFdEQseUNBQXlDO1FBQ3pDLElBQUksT0FBTyxNQUFNLENBQUMsb0JBQW9CLEtBQUssVUFBVSxFQUFFO1lBQ3JELE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztnQkFDMUMsR0FBRztnQkFDSCxLQUFLO2dCQUNMLElBQUk7YUFDTCxDQUFDLENBQUM7U0FDSjtRQUVELFNBQVMsQ0FBQztZQUNSLElBQUksRUFBRSxJQUFJLFlBQVksQ0FBQyxRQUFRLE1BQU0sWUFBWSxDQUFDLFdBQVcsR0FBRztZQUNoRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDZCxPQUFPO1lBQ1AsSUFBSTtTQUNMLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQztBQUVELGtCQUFlLHFCQUFxQixDQUFDIn0=