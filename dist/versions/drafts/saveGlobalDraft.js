"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGlobalDraft = void 0;
const enforceMaxVersions_1 = require("../enforceMaxVersions");
const saveGlobalDraft = async ({ payload, config, data, autosave, }) => {
    const VersionsModel = payload.versions[config.slug];
    const dataAsDraft = { ...data, _status: 'draft' };
    let existingAutosaveVersion;
    if (autosave) {
        existingAutosaveVersion = await VersionsModel.findOne();
    }
    let result;
    try {
        // If there is an existing autosave document,
        // Update it
        if (autosave && (existingAutosaveVersion === null || existingAutosaveVersion === void 0 ? void 0 : existingAutosaveVersion.autosave) === true) {
            result = await VersionsModel.findByIdAndUpdate({
                _id: existingAutosaveVersion._id,
            }, {
                version: dataAsDraft,
            }, { new: true, lean: true });
            // Otherwise, create a new one
        }
        else {
            result = await VersionsModel.create({
                version: dataAsDraft,
                autosave: Boolean(autosave),
            });
        }
    }
    catch (err) {
        payload.logger.error(`There was an error while saving a draft for the Global ${config.slug}.`);
        payload.logger.error(err);
    }
    if (config.versions.max) {
        (0, enforceMaxVersions_1.enforceMaxVersions)({
            payload: this,
            Model: VersionsModel,
            slug: config.slug,
            entityType: 'global',
            max: config.versions.max,
        });
    }
    result = result.version;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    return result;
};
exports.saveGlobalDraft = saveGlobalDraft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUdsb2JhbERyYWZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZlcnNpb25zL2RyYWZ0cy9zYXZlR2xvYmFsRHJhZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOERBQTJEO0FBVXBELE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxFQUNwQyxPQUFPLEVBQ1AsTUFBTSxFQUNOLElBQUksRUFDSixRQUFRLEdBQ0gsRUFBaUIsRUFBRTtJQUN4QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRCxNQUFNLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUVsRCxJQUFJLHVCQUF1QixDQUFDO0lBRTVCLElBQUksUUFBUSxFQUFFO1FBQ1osdUJBQXVCLEdBQUcsTUFBTSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekQ7SUFFRCxJQUFJLE1BQU0sQ0FBQztJQUVYLElBQUk7UUFDRiw2Q0FBNkM7UUFDN0MsWUFBWTtRQUNaLElBQUksUUFBUSxJQUFJLENBQUEsdUJBQXVCLGFBQXZCLHVCQUF1Qix1QkFBdkIsdUJBQXVCLENBQUUsUUFBUSxNQUFLLElBQUksRUFBRTtZQUMxRCxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsaUJBQWlCLENBQzVDO2dCQUNFLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHO2FBQ2pDLEVBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFdBQVc7YUFDckIsRUFDRCxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUMxQixDQUFDO1lBQ0osOEJBQThCO1NBQzdCO2FBQU07WUFDTCxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsV0FBVztnQkFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMERBQTBELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQy9GLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUN2QixJQUFBLHVDQUFrQixFQUFDO1lBQ2pCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLGFBQWE7WUFDcEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUc7U0FDekIsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1QixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUExRFcsUUFBQSxlQUFlLG1CQTBEMUIifQ==