import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import FormSubmit from '../../forms/Submit';
import { useDocumentInfo } from '../../utilities/DocumentInfo';
import { useForm, useFormModified } from '../../forms/Form/context';
const Publish = () => {
    const { unpublishedVersions, publishedDoc } = useDocumentInfo();
    const { submit } = useForm();
    const modified = useFormModified();
    const { t } = useTranslation('version');
    const hasNewerVersions = (unpublishedVersions === null || unpublishedVersions === void 0 ? void 0 : unpublishedVersions.totalDocs) > 0;
    const canPublish = modified || hasNewerVersions || !publishedDoc;
    const publish = useCallback(() => {
        submit({
            overrides: {
                _status: 'published',
            },
        });
    }, [submit]);
    return (React.createElement(FormSubmit, { type: "button", onClick: publish, disabled: !canPublish }, t('publishChanges')));
};
export default Publish;
