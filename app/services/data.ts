import { StringKey } from '@config/strings';
import { LearningUnit, MediaLearningUnit } from '@models/learning-unit';
import { Subject } from 'app/models/subject';

export const getSubjects = (): Subject[] => {
    return [
        {
            id: 0,
            name: 'saving',
            icon: require('@assets/icons/saving.png'),
        },
        {
            id: 1,
            name: 'paycheck',
            icon: require('../../assets/icons/paycheck.png'),
        },
        {
            id: 2,
            name: 'investments',
            icon: require('@assets/icons/investment.png'),
        },
        {
            id: 3,
            name: 'opening a bank account',
            icon: require('@assets/icons/bank_account.png'),
        },
        {
            id: 4,
            name: 'employment rights',
            icon: require('@assets/icons/employment_rights.png'),
        },
        {
            id: 5,
            name: 'making income',
            icon: require('@assets/icons/income.png'),
        },
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
