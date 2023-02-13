import { useEffect } from 'react';
import equal from 'deep-equal';
import { useAuth } from '../../../../utilities/Auth';
import { useDocumentInfo } from '../../../../utilities/DocumentInfo';
import { useAllFormFields } from '../../../Form/context';
import { getFilterOptionsQuery } from '../../getFilterOptionsQuery';
import reduceFieldsToValues from '../../../Form/reduceFieldsToValues';
import getSiblingData from '../../../Form/getSiblingData';
export const GetFilterOptions = ({ filterOptions, filterOptionsResult, setFilterOptionsResult, relationTo, path, }) => {
    const [fields] = useAllFormFields();
    const { id } = useDocumentInfo();
    const { user } = useAuth();
    useEffect(() => {
        const data = reduceFieldsToValues(fields);
        const siblingData = getSiblingData(fields, path);
        const newFilterOptionsResult = getFilterOptionsQuery(filterOptions, {
            id,
            data,
            relationTo,
            siblingData,
            user,
        });
        if (!equal(newFilterOptionsResult, filterOptionsResult)) {
            setFilterOptionsResult(newFilterOptionsResult);
        }
    }, [
        fields,
        filterOptions,
        id,
        relationTo,
        user,
        path,
        filterOptionsResult,
        setFilterOptionsResult,
    ]);
    return null;
};
