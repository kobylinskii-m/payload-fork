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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerAsTitle = exports.toWords = exports.formatLabels = exports.formatNames = void 0;
const pluralize_1 = __importStar(require("pluralize"));
const isNumber_1 = require("./isNumber");
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const toWords = (inputString, joinWords = false) => {
    const notNullString = inputString || '';
    const trimmedString = notNullString.trim();
    const arrayOfStrings = trimmedString.split(/[\s-]/);
    const splitStringsArray = [];
    arrayOfStrings.forEach((tempString) => {
        if (tempString !== '') {
            const splitWords = tempString.split(/(?=[A-Z])/).join(' ');
            splitStringsArray.push(capitalizeFirstLetter(splitWords));
        }
    });
    return joinWords
        ? splitStringsArray.join('').replace(/\s/gi, '')
        : splitStringsArray.join(' ');
};
exports.toWords = toWords;
const handlerAsTitle = ((docs, useAsTitle) => {
    console.log({ docs, useAsTitle });
    if (!docs)
        return undefined;
    const chars = useAsTitle.split('.');
    return chars.reduce((a, b) => ((0, isNumber_1.isNumber)(b) ? a === null || a === void 0 ? void 0 : a[+b] : a === null || a === void 0 ? void 0 : a[b]), docs);
});
exports.handlerAsTitle = handlerAsTitle;
const formatLabels = ((slug) => {
    const words = toWords(slug);
    return ((0, pluralize_1.isPlural)(slug))
        ? {
            singular: (0, pluralize_1.singular)(words),
            plural: words,
        }
        : {
            singular: words,
            plural: (0, pluralize_1.default)(words),
        };
});
exports.formatLabels = formatLabels;
const formatNames = ((slug) => {
    const words = toWords(slug, true);
    return ((0, pluralize_1.isPlural)(slug))
        ? {
            singular: (0, pluralize_1.singular)(words),
            plural: words,
        }
        : {
            singular: words,
            plural: (0, pluralize_1.default)(words),
        };
});
exports.formatNames = formatNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0TGFiZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxpdGllcy9mb3JtYXRMYWJlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBMEQ7QUFDMUQseUNBQXNDO0FBRXRDLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFjLEVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRyxNQUFNLE9BQU8sR0FBRyxDQUFDLFdBQW1CLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBVSxFQUFFO0lBQ2pFLE1BQU0sYUFBYSxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUM7SUFDeEMsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNDLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFcEQsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDN0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ3BDLElBQUksVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNyQixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxTQUFTO1FBQ2QsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQztBQXVDQSwwQkFBTztBQXJDVCxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBZ0QsRUFBRSxVQUFrQixFQUFzQixFQUFFO0lBQ25ILE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUVsQyxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQzVCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFBLG1CQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQXVCLENBQUM7QUFDOUYsQ0FBQyxDQUFDLENBQUM7QUFnQ0Qsd0NBQWM7QUE5QmhCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFZLEVBQXdDLEVBQUU7SUFDM0UsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxJQUFBLG9CQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1lBQ0EsUUFBUSxFQUFFLElBQUEsb0JBQVEsRUFBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxFQUFFLEtBQUs7U0FDZDtRQUNELENBQUMsQ0FBQztZQUNBLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLElBQUEsbUJBQVMsRUFBQyxLQUFLLENBQUM7U0FDekIsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDO0FBaUJELG9DQUFZO0FBZmQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQVksRUFBd0MsRUFBRTtJQUMxRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxJQUFBLG9CQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1lBQ0EsUUFBUSxFQUFFLElBQUEsb0JBQVEsRUFBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxFQUFFLEtBQUs7U0FDZDtRQUNELENBQUMsQ0FBQztZQUNBLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLElBQUEsbUJBQVMsRUFBQyxLQUFLLENBQUM7U0FDekIsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDO0FBR0Qsa0NBQVcifQ==