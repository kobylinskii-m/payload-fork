"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCollectionDraft = void 0;
const enforceMaxVersions_1 = require("../enforceMaxVersions");
const saveCollectionDraft = async ({ payload, config, id, data, autosave, }) => {
    const VersionsModel = payload.versions[config.slug];
    const dataAsDraft = { ...data, _status: 'draft' };
    let existingAutosaveVersion;
    if (autosave) {
        existingAutosaveVersion = await VersionsModel.findOne({
            parent: id,
        }, {}, { sort: { updatedAt: 'desc' } });
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
                parent: id,
                version: dataAsDraft,
                autosave: Boolean(autosave),
            });
        }
    }
    catch (err) {
        payload.logger.error(`There was an error while creating a draft ${config.labels.singular} with ID ${id}.`);
        payload.logger.error(err);
    }
    if (config.versions.maxPerDoc) {
        (0, enforceMaxVersions_1.enforceMaxVersions)({
            id,
            payload,
            Model: VersionsModel,
            slug: config.slug,
            entityType: 'collection',
            max: config.versions.maxPerDoc,
        });
    }
    result = result.version;
    result = JSON.stringify(result);
    result = JSON.parse(result);
    result.id = id;
    return result;
};
exports.saveCollectionDraft = saveCollectionDraft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZUNvbGxlY3Rpb25EcmFmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92ZXJzaW9ucy9kcmFmdHMvc2F2ZUNvbGxlY3Rpb25EcmFmdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4REFBMkQ7QUFZcEQsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFDeEMsT0FBTyxFQUNQLE1BQU0sRUFDTixFQUFFLEVBQ0YsSUFBSSxFQUNKLFFBQVEsR0FDSCxFQUFvQyxFQUFFO0lBQzNDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBELE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBRWxELElBQUksdUJBQXVCLENBQUM7SUFFNUIsSUFBSSxRQUFRLEVBQUU7UUFDWix1QkFBdUIsR0FBRyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDcEQsTUFBTSxFQUFFLEVBQUU7U0FDWCxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekM7SUFFRCxJQUFJLE1BQU0sQ0FBQztJQUVYLElBQUk7UUFDRiw2Q0FBNkM7UUFDN0MsWUFBWTtRQUNaLElBQUksUUFBUSxJQUFJLENBQUEsdUJBQXVCLGFBQXZCLHVCQUF1Qix1QkFBdkIsdUJBQXVCLENBQUUsUUFBUSxNQUFLLElBQUksRUFBRTtZQUMxRCxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsaUJBQWlCLENBQzVDO2dCQUNFLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHO2FBQ2pDLEVBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFdBQVc7YUFDckIsRUFDRCxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUMxQixDQUFDO1lBQ0osOEJBQThCO1NBQzdCO2FBQU07WUFDTCxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsTUFBTSxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsRUFBRTtnQkFDVixPQUFPLEVBQUUsV0FBVztnQkFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7SUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQzdCLElBQUEsdUNBQWtCLEVBQUM7WUFDakIsRUFBRTtZQUNGLE9BQU87WUFDUCxLQUFLLEVBQUUsYUFBYTtZQUNwQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsVUFBVSxFQUFFLFlBQVk7WUFDeEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUztTQUMvQixDQUFDLENBQUM7S0FDSjtJQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBRWYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBaEVXLFFBQUEsbUJBQW1CLHVCQWdFOUIifQ==