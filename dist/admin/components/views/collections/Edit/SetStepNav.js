import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../../../utilities/getTranslation';
import useTitle from '../../../../hooks/useTitle';
import { useStepNav } from '../../../elements/StepNav';
import { useConfig } from '../../../utilities/Config';
export const SetStepNav = ({ collection, isEditing, id }) => {
    const { slug, labels: { plural: pluralLabel, }, admin: { useAsTitle, }, } = collection;
    const { setStepNav } = useStepNav();
    const { t, i18n } = useTranslation('general');
    const { routes: { admin } } = useConfig();
    const title = useTitle(useAsTitle);
    useEffect(() => {
        const nav = [{
                url: `${admin}/collections/${slug}`,
                label: getTranslation(pluralLabel, i18n),
            }];
        if (isEditing) {
            nav.push({
                label: (useAsTitle && useAsTitle !== 'id') ? title || `[${t('untitled')}]` : id,
            });
        }
        else {
            nav.push({
                label: t('createNew'),
            });
        }
        setStepNav(nav);
    }, [setStepNav, isEditing, pluralLabel, id, slug, useAsTitle, admin, t, i18n, title]);
    return null;
};
