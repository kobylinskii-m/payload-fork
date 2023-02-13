"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractTranslations_1 = require("../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['general:user', 'general:users']);
const defaultUser = {
    slug: 'users',
    labels: {
        singular: labels['general:user'],
        plural: labels['general:users'],
    },
    admin: {
        useAsTitle: 'email',
    },
    auth: {
        tokenExpiration: 7200,
    },
    fields: [],
};
exports.default = defaultUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdFVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC9kZWZhdWx0VXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZFQUEwRTtBQUUxRSxNQUFNLE1BQU0sR0FBRyxJQUFBLHlDQUFtQixFQUFDLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFFdEUsTUFBTSxXQUFXLEdBQXFCO0lBQ3BDLElBQUksRUFBRSxPQUFPO0lBQ2IsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7S0FDaEM7SUFDRCxLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUUsT0FBTztLQUNwQjtJQUNELElBQUksRUFBRTtRQUNKLGVBQWUsRUFBRSxJQUFJO0tBQ3RCO0lBQ0QsTUFBTSxFQUFFLEVBQUU7Q0FDWCxDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIn0=