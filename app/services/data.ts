import { StringKey } from '@config/strings';
import { LearningUnit, MediaLearningUnit } from '@models/learning-unit';
import { Subject } from 'app/models/subject';

export const getSubjects = (): Subject[] => {
    return [
        { id: 0, name: 'paycheck' },
        { id: 1, name: 'opening a bank account' },
        { id: 2, name: 'making income' },
        { id: 3, name: 'saving' },
        { id: 4, name: 'investments' },
        { id: 5, name: 'employment rights' },
    ];
};

export const getGameUnitsBySubjectName = (
    subjectName: StringKey | null,
): LearningUnit[] => {
    return [
        { id: 0, subject: 'paycheck', name: "What's Missing?" },
        { id: 1, subject: 'paycheck', name: 'Find the Error' },
    ];
};

export const getReadingUnitsBySubjectName = (
    subjectName: StringKey | null,
): LearningUnit[] => {
    return [
        { id: 0, subject: 'paycheck', name: 'Paycheck Structure Explanation' },
        {
            id: 1,
            subject: 'paycheck',
            name: "Paycheck Day Arrived. What's next?",
        },
        {
            id: 2,
            subject: 'paycheck',
            name: 'What to do if the Paycheck is Broken?',
        },
    ];
};

export const getVideoUnitsBySubjectName = (
    subjectName: StringKey | null,
): MediaLearningUnit[] => {
    return [
        {
            id: 0,
            subject: 'paycheck',
            name: 'Paycheck Structure Explanation',
            description: 'Paycheck Structure Explanation',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
            id: 1,
            subject: 'paycheck',
            name: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
            id: 2,
            subject: 'paycheck',
            name: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
    ];
};

export const getAudioUnitsBySubjectName = (
    subjectName: StringKey | null,
): MediaLearningUnit[] => {
    return [
        {
            id: 0,
            subject: 'paycheck',
            name: 'Paycheck Structure Explanation',
            description: 'Paycheck Structure Explanation',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
            id: 1,
            subject: 'paycheck',
            name: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
        {
            id: 2,
            subject: 'paycheck',
            name: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
    ];
};
