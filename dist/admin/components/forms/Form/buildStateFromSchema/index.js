import { iterateFields } from './iterateFields';
const buildStateFromSchema = async (args) => {
    const { fieldSchema, data: fullData = {}, user, id, operation, locale, t, } = args;
    if (fieldSchema) {
        const fieldPromises = [];
        const state = {};
        iterateFields({
            state,
            fields: fieldSchema,
            id,
            locale,
            operation,
            path: '',
            user,
            fieldPromises,
            data: fullData,
            fullData,
            parentPassesCondition: true,
            t,
        });
        await Promise.all(fieldPromises);
        return state;
    }
    return {};
};
export default buildStateFromSchema;
