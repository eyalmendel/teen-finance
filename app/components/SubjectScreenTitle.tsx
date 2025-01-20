import React from 'react';
import { StringKey } from '@config/strings';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';
import AppHeadline from '@components/AppHeadline';

export type Props = {
    template: StringKey;
};

function SubjectScreenTitle({ template }: Props) {
    const getTitleParamValue = (): StringKey[] => {
        const selectedSubjectName = getSelectedSubjectName();
        return selectedSubjectName !== null ? [selectedSubjectName] : [];
    };

    return <AppHeadline text={translate(template, getTitleParamValue())} />;
}

export default SubjectScreenTitle;
