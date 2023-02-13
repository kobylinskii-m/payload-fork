"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileData = void 0;
const file_type_1 = require("file-type");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const sharp_1 = __importDefault(require("sharp"));
const errors_1 = require("../errors");
const getImageSize_1 = __importDefault(require("./getImageSize"));
const getSafeFilename_1 = __importDefault(require("./getSafeFilename"));
const imageResizer_1 = __importDefault(require("./imageResizer"));
const canResizeImage_1 = __importDefault(require("./canResizeImage"));
const generateFileData = async ({ config, collection: { config: collectionConfig, Model, }, req, data, throwOnMissingFile, overwriteExistingFiles, }) => {
    var _a;
    let newData = data;
    const filesToSave = [];
    if (collectionConfig.upload) {
        const fileData = {};
        const { staticDir, imageSizes, disableLocalStorage, resizeOptions, formatOptions } = collectionConfig.upload;
        const { file } = req.files || {};
        if (throwOnMissingFile && !file) {
            throw new errors_1.MissingFile(req.t);
        }
        let staticPath = staticDir;
        if (staticDir.indexOf('/') !== 0) {
            staticPath = path_1.default.resolve(config.paths.configDir, staticDir);
        }
        if (!disableLocalStorage) {
            mkdirp_1.default.sync(staticPath);
        }
        if (file) {
            try {
                const shouldResize = (0, canResizeImage_1.default)(file.mimetype);
                let fsSafeName;
                let resized;
                let dimensions;
                if (shouldResize) {
                    if (resizeOptions) {
                        resized = (0, sharp_1.default)(file.data)
                            .resize(resizeOptions);
                    }
                    if (formatOptions) {
                        resized = (resized !== null && resized !== void 0 ? resized : (0, sharp_1.default)(file.data)).toFormat(formatOptions.format, formatOptions.options);
                    }
                    dimensions = await (0, getImageSize_1.default)(file);
                    fileData.width = dimensions.width;
                    fileData.height = dimensions.height;
                }
                const fileBuffer = resized ? (await resized.toBuffer()) : file.data;
                const bufferInfo = await (0, file_type_1.fromBuffer)(fileBuffer);
                let mime = (_a = bufferInfo === null || bufferInfo === void 0 ? void 0 : bufferInfo.mime) !== null && _a !== void 0 ? _a : file.mimetype;
                const ext = resized ? bufferInfo.ext : file.name.split('.').pop();
                const fileSize = fileBuffer.length;
                const baseFilename = (0, sanitize_filename_1.default)(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
                fsSafeName = `${baseFilename}.${ext}`;
                if (mime === 'application/xml' && ext === 'svg')
                    mime = 'image/svg+xml';
                if (!overwriteExistingFiles) {
                    fsSafeName = await (0, getSafeFilename_1.default)(Model, staticPath, fsSafeName);
                }
                filesToSave.push({
                    path: `${staticPath}/${fsSafeName}`,
                    buffer: fileBuffer,
                });
                fileData.filename = fsSafeName || (!overwriteExistingFiles ? await (0, getSafeFilename_1.default)(Model, staticPath, file.name) : file.name);
                fileData.filesize = fileSize || file.size;
                fileData.mimeType = mime || (await (0, file_type_1.fromBuffer)(file.data)).mime;
                if (Array.isArray(imageSizes) && shouldResize) {
                    req.payloadUploadSizes = {};
                    const { sizeData, sizesToSave } = await (0, imageResizer_1.default)({
                        req,
                        file: file.data,
                        dimensions,
                        staticPath,
                        config: collectionConfig,
                        savedFilename: fsSafeName || file.name,
                        mimeType: fileData.mimeType,
                    });
                    fileData.sizes = sizeData;
                    filesToSave.push(...sizesToSave);
                }
            }
            catch (err) {
                console.error(err);
                throw new errors_1.FileUploadError(req.t);
            }
            newData = {
                ...newData,
                ...fileData,
            };
        }
    }
    return {
        data: newData,
        files: filesToSave,
    };
};
exports.generateFileData = generateFileData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVGaWxlRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91cGxvYWRzL2dlbmVyYXRlRmlsZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLG9EQUE0QjtBQUM1QixnREFBd0I7QUFDeEIsMEVBQXlDO0FBQ3pDLGtEQUFxQztBQUdyQyxzQ0FBeUQ7QUFFekQsa0VBQStEO0FBQy9ELHdFQUFnRDtBQUNoRCxrRUFBMkM7QUFFM0Msc0VBQThDO0FBZ0J2QyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUNyQyxNQUFNLEVBQ04sVUFBVSxFQUFFLEVBQ1YsTUFBTSxFQUFFLGdCQUFnQixFQUN4QixLQUFLLEdBQ04sRUFDRCxHQUFHLEVBQ0gsSUFBSSxFQUNKLGtCQUFrQixFQUNsQixzQkFBc0IsR0FDakIsRUFBVSxFQUFFOztJQUNqQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsTUFBTSxXQUFXLEdBQWlCLEVBQUUsQ0FBQztJQUVyQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBc0IsRUFBRSxDQUFDO1FBRXZDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFFN0csTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBRWpDLElBQUksa0JBQWtCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDL0IsTUFBTSxJQUFJLG9CQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRTNCLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMs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