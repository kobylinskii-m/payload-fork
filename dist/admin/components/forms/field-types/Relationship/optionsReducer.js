import { handlerAsTitle } from '../../../../../utilities/formatLabels';
import { getTranslation } from '../../../../../utilities/getTranslation';
const reduceToIDs = (options) => options.reduce((ids, option) => {
    if (option.options) {
        return [
            ...ids,
            ...reduceToIDs(option.options),
        ];
    }
    return [
        ...ids,
        option.value,
    ];
}, []);
const sortOptions = (options) => options.sort((a, b) => {
    var _a, _b;
    if (typeof ((_a = a === null || a === void 0 ? void 0 : a.label) === null || _a === void 0 ? void 0 : _a.localeCompare) === 'function' && typeof ((_b = b === null || b === void 0 ? void 0 : b.label) === null || _b === void 0 ? void 0 : _b.localeCompare) === 'function') {
        return a.label.localeCompare(b.label);
    }
    return 0;
});
const optionsReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR': {
            return [];
        }
        case 'ADD': {
            const { collection, docs, sort, ids = [], i18n } = action;
            const relation = collection.slug;
            const labelKey = collection.admin.useAsTitle || 'id';
            const loadedIDs = reduceToIDs(state);
            const newOptions = [...state];
            const optionsToAddTo = newOptions.find((optionGroup) => optionGroup.label === collection.labels.plural);
            const newSubOptions = docs.reduce((docSubOptions, doc) => {
                if (loadedIDs.indexOf(doc.id) === -1) {
                    loadedIDs.push(doc.id);
                    return [
                        ...docSubOptions,
                        {
                            label: handlerAsTitle(doc, labelKey) || `${i18n.t('general:untitled')} - ID: ${doc.id}`,
                            relationTo: relation,
                            value: doc.id,
                        },
                    ];
                }
                return docSubOptions;
            }, []);
            ids.forEach((id) => {
                if (!loadedIDs.includes(id)) {
                    newSubOptions.push({
                        relationTo: relation,
                        label: labelKey === 'id' ? id : `${i18n.t('general:untitled')} - ID: ${id}`,
                        value: id,
                    });
                }
            });
            if (optionsToAddTo) {
                const subOptions = [
                    ...optionsToAddTo.options,
                    ...newSubOptions,
                ];
                optionsToAddTo.options = sort ? sortOptions(subOptions) : subOptions;
            }
            else {
                newOptions.push({
                    label: getTranslation(collection.labels.plural, i18n),
                    options: sort ? sortOptions(newSubOptions) : newSubOptions,
                });
            }
            return newOptions;
        }
        default: {
            return state;
        }
    }
};
export default optionsReducer;
