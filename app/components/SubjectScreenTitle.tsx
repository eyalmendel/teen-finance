import React from 'react';

import { StringKey } from '@config/strings';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';
import ScreenTitle from '@components/ScreenTitle';

export type Props = {
    template: StringKey;
};

function SubjectScreenTitle({ template }: Props) {
    const getTitleParamValue = (): StringKey[] => {
        const selectedSubjectName = getSelectedSubjectName();
        return selectedSubjectName !== null ? [selectedSubjectName] : [];
    };

    return <ScreenTitle text={translate(template, getTitleParamValue())} />;
}

export default SubjectScreenTitle;
