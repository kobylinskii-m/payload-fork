"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../config/types");
const populate = async ({ depth, currentDepth, req, overrideAccess, dataReference, data, field, index, key, showHiddenFields, }) => {
    const dataToUpdate = dataReference;
    const relation = Array.isArray(field.relationTo) ? data.relationTo : field.relationTo;
    const relatedCollection = req.payload.collections[relation];
    if (relatedCollection) {
        let id = Array.isArray(field.relationTo) ? data.value : data;
        let relationshipValue;
        const shouldPopulate = depth && currentDepth <= depth;
        if (typeof id !== 'string' && typeof id !== 'number' && typeof (id === null || id === void 0 ? void 0 : id.toString) === 'function' && typeof id !== 'object') {
            id = id.toString();
        }
        if (shouldPopulate) {
            relationshipValue = await req.payloadDataLoader.load(JSON.stringify([
                relatedCollection.config.slug,
                id,
                depth,
                currentDepth + 1,
                req.locale,
                req.fallbackLocale,
                overrideAccess,
                showHiddenFields,
            ]));
        }
        if (!relationshipValue) {
            // ids are visible regardless of access controls
            relationshipValue = id;
        }
        if (typeof index === 'number' && typeof key === 'string') {
            if (Array.isArray(field.relationTo)) {
                dataToUpdate[field.name][key][index].value = relationshipValue;
            }
            else {
                dataToUpdate[field.name][key][index] = relationshipValue;
            }
        }
        else if (typeof index === 'number' || typeof key === 'string') {
            if (Array.isArray(field.relationTo)) {
                dataToUpdate[field.name][index !== null && index !== void 0 ? index : key].value = relationshipValue;
            }
            else {
                dataToUpdate[field.name][index !== null && index !== void 0 ? index : key] = relationshipValue;
            }
        }
        else if (Array.isArray(field.relationTo)) {
            dataToUpdate[field.name].value = relationshipValue;
        }
        else {
            dataToUpdate[field.name] = relationshipValue;
        }
    }
};
const relationshipPopulationPromise = async ({ siblingDoc, field, depth, currentDepth, req, overrideAccess, showHiddenFields, }) => {
    const resultingDoc = siblingDoc;
    const populateDepth = (0, types_1.fieldHasMaxDepth)(field) && field.maxDepth < depth ? field.maxDepth : depth;
    const rowPromises = [];
    if ((0, types_1.fieldSupportsMany)(field) && field.hasMany) {
        if (req.locale === 'all' && typeof siblingDoc[field.name] === 'object') {
            Object.keys(siblingDoc[field.name]).forEach((key) => {
                if (Array.isArray(siblingDoc[field.name][key])) {
                    siblingDoc[field.name][key].forEach((relatedDoc, index) => {
                        const rowPromise = async () => {
                            await populate({
                                depth: populateDepth,
                                currentDepth,
                                req,
                                overrideAccess,
                                data: siblingDoc[field.name][key][index],
                                dataReference: resultingDoc,
                                field,
                                index,
                                key,
                                showHiddenFields,
                            });
                        };
                        rowPromises.push(rowPromise());
                    });
                }
            });
        }
        else if (Array.isArray(siblingDoc[field.name])) {
            siblingDoc[field.name].forEach((relatedDoc, index) => {
                const rowPromise = async () => {
                    if (relatedDoc) {
                        await populate({
                            depth: populateDepth,
                            currentDepth,
                            req,
                            overrideAccess,
                            data: relatedDoc,
                            dataReference: resultingDoc,
                            field,
                            index,
                            showHiddenFields,
                        });
                    }
                };
                rowPromises.push(rowPromise());
            });
        }
    }
    else if (typeof siblingDoc[field.name] === 'object' && req.locale === 'all') {
        Object.keys(siblingDoc[field.name]).forEach((key) => {
            const rowPromise = async () => {
                await populate({
                    depth: populateDepth,
                    currentDepth,
                    req,
                    overrideAccess,
                    data: siblingDoc[field.name][key],
                    dataReference: resultingDoc,
                    field,
                    key,
                    showHiddenFields,
                });
            };
            rowPromises.push(rowPromise());
        });
        await Promise.all(rowPromises);
    }
    else if (siblingDoc[field.name]) {
        await populate({
            depth: populateDepth,
            currentDepth,
            req,
            overrideAccess,
            dataReference: resultingDoc,
            data: siblingDoc[field.name],
            field,
            showHiddenFields,
        });
    }
    await Promise.all(rowPromises);
};
exports.default = relationshipPopulationPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb25zaGlwUG9wdWxhdGlvblByb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmllbGRzL2hvb2tzL2FmdGVyUmVhZC9yZWxhdGlvbnNoaXBQb3B1bGF0aW9uUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUF5RztBQWV6RyxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsRUFDdEIsS0FBSyxFQUNMLFlBQVksRUFDWixHQUFHLEVBQ0gsY0FBYyxFQUNkLGFBQWEsRUFDYixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxHQUFHLEVBQ0gsZ0JBQWdCLEdBQ0gsRUFBRSxFQUFFO0lBQ2pCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFDLFVBQXFCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDbEcsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1RCxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDN0QsSUFBSSxpQkFBaUIsQ0FBQztRQUN0QixNQUFNLGNBQWMsR0FBRyxLQUFLLElBQUksWUFBWSxJQUFJLEtBQUssQ0FBQztRQUV0RCxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFBLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxRQUFRLENBQUEsS0FBSyxV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