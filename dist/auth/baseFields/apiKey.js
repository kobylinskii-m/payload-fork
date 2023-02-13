"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const extractTranslations_1 = require("../../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['authentication:enableAPIKey', 'authentication:apiKey']);
const encryptKey = ({ req, value }) => (value ? req.payload.encrypt(value) : undefined);
const decryptKey = ({ req, value }) => (value ? req.payload.decrypt(value) : undefined);
exports.default = [
    {
        name: 'enableAPIKey',
        label: labels['authentication:enableAPIKey'],
        type: 'checkbox',
        defaultValue: false,
        admin: {
            components: {
                Field: () => null,
            },
        },
    },
    {
        name: 'apiKey',
        label: labels['authentication:apiKey'],
        type: 'text',
        admin: {
            components: {
                Field: () => null,
            },
        },
        hooks: {
            beforeChange: [
                encryptKey,
            ],
            afterRead: [
                decryptKey,
            ],
        },
    },
    {
        name: 'apiKeyIndex',
        type: 'text',
        hidden: true,
        admin: {
            disabled: true,
        },
        hooks: {
            beforeValidate: [
                async ({ data, req, value }) => {
                    if (data.apiKey) {
                        return crypto_1.default.createHmac('sha1', req.payload.secret)
                            .update(data.apiKey)
                            .digest('hex');
                    }
                    if (data.enableAPIKey === false) {
                        return null;
                    }
                    return value;
                },
            ],
        },
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvYmFzZUZpZWxkcy9hcGlLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFFNUIsZ0ZBQTZFO0FBRTdFLE1BQU0sTUFBTSxHQUFHLElBQUEseUNBQW1CLEVBQUMsQ0FBQyw2QkFBNkIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7QUFFN0YsTUFBTSxVQUFVLEdBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3RyxNQUFNLFVBQVUsR0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTdHLGtCQUFlO0lBQ2I7UUFDRSxJQUFJLEVBQUUsY0FBYztRQUNwQixLQUFLLEVBQUUsTUFBTSxDQUFDLDZCQUE2QixDQUFDO1FBQzVDLElBQUksRUFBRSxVQUFVO1FBQ2hCLFlBQVksRUFBRSxLQUFLO1FBQ25CLEtBQUssRUFBRTtZQUNMLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTthQUNsQjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztRQUN0QyxJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRTtZQUNMLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTthQUNsQjtTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsWUFBWSxFQUFFO2dCQUNaLFVBQVU7YUFDWDtZQUNELFNBQVMsRUFBRTtnQkFDVCxVQUFVO2FBQ1g7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFO1lBQ0wsUUFBUSxFQUFFLElBQUk7U0FDZjtRQUNELEtBQUssRUFBRTtZQUNMLGNBQWMsRUFBRTtnQkFDZCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7b0JBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDZixPQUFPLGdCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs2QkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFnQixDQUFDOzZCQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2xCO29CQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU8sSUFBSSxDQUFDO3FCQUNiO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUM7YUFDRjtTQUNGO0tBQ0Y7Q0FDUyxDQUFDIn0=