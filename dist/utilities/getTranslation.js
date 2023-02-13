"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslation = void 0;
const getTranslation = (label, i18n) => {
    var _a;
    if (typeof label === 'object') {
        if (label[i18n.language]) {
            return label[i18n.language];
        }
        let fallbacks = [];
        if (typeof i18n.options.fallbackLng === 'string') {
            fallbacks = [i18n.options.fallbackLng];
        }
        else if (Array.isArray(i18n.options.fallbackLng)) {
            fallbacks = i18n.options.fallbackLng;
        }
        else if (typeof i18n.options.fallbackLng === 'object') {
            fallbacks = Object.keys(i18n.options.fallbackLng);
        }
        else if (typeof i18n.options.fallbackLng === 'function') {
            console.warn('Use of i18next fallbackLng functions are not supported.');
        }
        return (_a = label[fallbacks.find((language) => (label[language]))]) !== null && _a !== void 0 ? _a : label[Object.keys(label)[0]];
    }
    return label;
};
exports.getTranslation = getTranslation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbGl0aWVzL2dldFRyYW5zbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBb0QsRUFBRSxJQUFXLEVBQVUsRUFBRTs7SUFDMUcsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ2hELFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDeEM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNsRCxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDdEM7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ3ZELFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMseURBQXlELENBQUMsQ0FBQztTQUN6RTtRQUNELE9BQU8sTUFBQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQWxCVyxRQUFBLGNBQWMsa0JBa0J6QiJ9