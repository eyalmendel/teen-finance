import { StringKey } from '@config/strings';

let selectedSubjectName: StringKey | null = null;

export const getSelectedSubjectName = (): StringKey | null => {
    return selectedSubjectName;
};

export const setSelectedSubjectName = (subjectName: StringKey | null): void => {
    selectedSubjectName = subjectName;
};
