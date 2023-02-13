"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../../fields/validations");
const extractTranslations_1 = require("../../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['general:email']);
exports.default = [
    {
        name: 'email',
        label: labels['general:email'],
        type: 'email',
        validate: validations_1.email,
        unique: true,
        admin: {
            components: {
                Field: () => null,
            },
        },
    },
    {
        name: 'resetPasswordToken',
        type: 'text',
        hidden: true,
    },
    {
        name: 'resetPasswordExpiration',
        type: 'date',
        hidden: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2Jhc2VGaWVsZHMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUFpRDtBQUVqRCxnRkFBNkU7QUFFN0UsTUFBTSxNQUFNLEdBQUcsSUFBQSx5Q0FBbUIsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFFdEQsa0JBQWU7SUFDYjtRQUNFLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDOUIsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsbUJBQUs7UUFDZixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRTtZQUNMLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTthQUNsQjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsSUFBSTtLQUNiO0lBQ0Q7UUFDRSxJQUFJLEVBQUUseUJBQXlCO1FBQy9CLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDYjtDQUNTLENBQUMifQ==