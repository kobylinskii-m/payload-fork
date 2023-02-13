"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mimeTypeValidator_1 = require("./mimeTypeValidator");
const extractTranslations_1 = require("../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['upload:width', 'upload:height', 'upload:fileSize', 'upload:fileName', 'upload:sizes']);
const getBaseUploadFields = ({ config, collection }) => {
    const uploadOptions = typeof collection.upload === 'object' ? collection.upload : {};
    const mimeType = {
        name: 'mimeType',
        label: 'MIME Type',
        type: 'text',
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    const url = {
        name: 'url',
        label: 'URL',
        type: 'text',
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    const width = {
        name: 'width',
        label: labels['upload:width'],
        type: 'number',
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    const height = {
        name: 'height',
        label: labels['upload:height'],
        type: 'number',
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    const filesize = {
        name: 'filesize',
        label: labels['upload:fileSize'],
        type: 'number',
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    const filename = {
        name: 'filename',
        label: labels['upload:fileName'],
        type: 'text',
        index: true,
        unique: true,
        admin: {
            readOnly: true,
            disabled: true,
        },
    };
    let uploadFields = [
        {
            ...url,
            hooks: {
                afterRead: [
                    ({ data }) => {
                        if (data === null || data === void 0 ? void 0 : data.filename) {
                            return `${config.serverURL}${uploadOptions.staticURL}/${data.filename}`;
                        }
                        return undefined;
                    },
                ],
            },
        },
        filename,
        mimeType,
        filesize,
        width,
        height,
    ];
    if (uploadOptions.mimeTypes) {
        mimeType.validate = (0, mimeTypeValidator_1.mimeTypeValidator)(uploadOptions.mimeTypes);
    }
    if (uploadOptions.imageSizes) {
        uploadFields = uploadFields.concat([
            {
                name: 'sizes',
                label: labels['upload:Sizes'],
                type: 'group',
                admin: {
                    disabled: true,
                },
                fields: uploadOptions.imageSizes.map((size) => ({
                    label: size.name,
                    name: size.name,
                    type: 'group',
                    admin: {
                        disabled: true,
                    },
                    fields: [
                        {
                            ...url,
                            hooks: {
                                afterRead: [
                                    ({ data }) => {
                                        var _a, _b;
                                        const sizeFilename = (_b = (_a = data === null || data === void 0 ? void 0 : data.sizes) === null || _a === void 0 ? void 0 : _a[size.name]) === null || _b === void 0 ? void 0 : _b.filename;
                                        if (sizeFilename) {
                                            return `${config.serverURL}${uploadOptions.staticURL}/${sizeFilename}`;
                                        }
                                        return undefined;
                                    },
                                ],
                            },
                        },
                        width,
                        height,
                        mimeType,
                        filesize,
                        {
                            ...filename,
                            unique: false,
                        },
                    ],
                })),
            },
        ]);
    }
    return uploadFields;
};
exports.default = getBaseUploadFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QmFzZUZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91cGxvYWRzL2dldEJhc2VGaWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwyREFBd0Q7QUFFeEQsNkVBQTBFO0FBRTFFLE1BQU0sTUFBTSxHQUFHLElBQUEseUNBQW1CLEVBQUMsQ0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFPNUgsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVyxFQUFXLEVBQUU7SUFDdkUsTUFBTSxhQUFhLEdBQXVCLE9BQU8sVUFBVSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUV6RyxNQUFNLFFBQVEsR0FBVTtRQUN0QixJQUFJLEVBQUUsVUFBVTtRQUNoQixLQUFLLEVBQUUsV0FBVztRQUNsQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRTtZQUNMLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBVTtRQUNqQixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7S0FDRixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQVU7UUFDbkIsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUM3QixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRTtZQUNMLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGLENB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