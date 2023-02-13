import { handlerAsTitle } from '../../utilities/formatLabels';
import { useFormFields } from '../components/forms/Form/context';

const useTitle = (useAsTitle: string): string => {
  const title = useFormFields(([fields]) => {
    return handlerAsTitle(fields?.value, useAsTitle) || fields[useAsTitle];
  });
  return typeof title === 'string' ? title : title?.value as string;
};

export default useTitle;
