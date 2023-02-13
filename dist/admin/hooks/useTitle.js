import { handlerAsTitle } from '../../utilities/formatLabels';
import { useFormFields } from '../components/forms/Form/context';
const useTitle = (useAsTitle) => {
    const title = useFormFields(([fields]) => {
        return handlerAsTitle(fields === null || fields === void 0 ? void 0 : fields.value, useAsTitle) || fields[useAsTitle];
    });
    return typeof title === 'string' ? title : title === null || title === void 0 ? void 0 : title.value;
};
export default useTitle;
