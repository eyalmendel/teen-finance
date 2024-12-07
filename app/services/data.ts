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
            icon: require('@assets/icons/paycheck.png'),
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
        {
            id: 0,
            subject: 'paycheck',
            title: 'The Big Riddle',
            description: '10 trivia questions about your paycheck',
            thumbnailUrl: '@assets/icons/playing-style.png',
        },
        {
            id: 1,
            subject: 'paycheck',
            title: 'Find the Error',
            description: 'Not here.. in the paycheck!',
            thumbnailUrl: '@assets/icons/playing-style.png',
        },
        {
            id: 2,
            subject: 'paycheck',
            title: "What's Missing?",
            description: 'Except your employee bonus',
            thumbnailUrl: '@assets/icons/playing-style.png',
        },
    ];
};

export const getReadingUnitsBySubjectName = (
    subjectName: StringKey | null,
): LearningUnit[] => {
    return [
        {
            id: 0,
            subject: 'paycheck',
            title: 'Paycheck Structure Explanation',
            description: 'The meaning of each section',
            estimatedTime: 8,
            thumbnailUrl: '@assets/icons/reading-style.png',
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: '10 tips for quick review',
            estimatedTime: 8,
            thumbnailUrl: '@assets/icons/reading-style.png',
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'Issues in the paycheck and how to handle it',
            estimatedTime: 8,
            thumbnailUrl: '@assets/icons/reading-style.png',
        },
        {
            id: 3,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'Issues in the paycheck and how to handle it',
            estimatedTime: 8,
            thumbnailUrl: '@assets/icons/reading-style.png',
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
            title: 'Paycheck Structure Explanation',
            description: 'Paycheck Structure Explanation',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/watching-style.png',
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/watching-style.png',
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/watching-style.png',
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
            title: 'Paycheck Structure Explanation',
            description: 'Paycheck Structure Explanation',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/listening-style.png',
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/listening-style.png',
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnailUrl: '@assets/icons/listening-style.png',
        },
    ];
};
