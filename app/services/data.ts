import { StringKey } from '@config/strings';
import { Article } from '@models/article';
import { LearningUnit, MediaLearningUnit } from '@models/learning-unit';
import { Quiz } from '@models/quiz';
import { ARTICLE_CONTENT } from 'app/mocks/article-content';
import { QUIZ_CONTENT } from 'app/mocks/quiz-content';
import { Subject } from 'app/models/subject';

export const getSubjects = (): Subject[] => {
    return [
        {
            id: 0,
            name: 'saving',
            icon: require('@assets/icons/saving.png'),
            isAvailable: false,
        },
        {
            id: 1,
            name: 'paycheck',
            icon: require('@assets/icons/paycheck.png'),
            isAvailable: true,
        },
        {
            id: 2,
            name: 'investments',
            icon: require('@assets/icons/investment.png'),
            isAvailable: false,
        },
        {
            id: 3,
            name: 'opening a bank account',
            icon: require('@assets/icons/bank_account.png'),
            isAvailable: false,
        },
        {
            id: 4,
            name: 'employment rights',
            icon: require('@assets/icons/employment_rights.png'),
            isAvailable: false,
        },
        {
            id: 5,
            name: 'making income',
            icon: require('@assets/icons/income.png'),
            isAvailable: false,
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
            title: 'The Big Quiz',
            description: '10 trivia questions about your paycheck',
            thumbnail: require('@assets/icons/playing-style.png'),
        },
        {
            id: 1,
            subject: 'paycheck',
            title: 'Find the Error',
            description: 'Not here.. in the paycheck!',
            thumbnail: require('@assets/icons/playing-style.png'),
        },
        {
            id: 2,
            subject: 'paycheck',
            title: "What's Missing?",
            description: 'Except your employee bonus',
            thumbnail: require('@assets/icons/playing-style.png'),
        },
    ];
};

export const getQuizBySubjectName = (subjectName: StringKey | null): Quiz => {
    return QUIZ_CONTENT;
};

export const getArticlesBySubjectName = (
    subjectName: StringKey | null,
): Article[] => {
    return [
        {
            id: 0,
            subject: 'paycheck',
            title: 'Paycheck Structure Explanation',
            description: 'The meaning of each section',
            estimatedTime: 8,
            thumbnail: require('@assets/icons/reading-style.png'),
            author: {
                name: 'מערכת',
                icon: require('@assets/icons/logo.png'),
            },
            lastUpdated: new Date().toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            }),
            content: ARTICLE_CONTENT,
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: '10 tips for quick review',
            estimatedTime: 8,
            thumbnail: require('@assets/icons/reading-style.png'),
            author: {
                name: 'מערכת',
                icon: require('@assets/icons/logo.png'),
            },
            lastUpdated: new Date().toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            }),
            content: ARTICLE_CONTENT,
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'Issues in the paycheck and how to handle it',
            estimatedTime: 8,
            thumbnail: require('@assets/icons/reading-style.png'),
            author: {
                name: 'מערכת',
                icon: require('@assets/icons/logo.png'),
            },
            lastUpdated: new Date().toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            }),
            content: ARTICLE_CONTENT,
        },
        {
            id: 3,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'Issues in the paycheck and how to handle it',
            estimatedTime: 8,
            thumbnail: require('@assets/icons/reading-style.png'),
            author: {
                name: 'מערכת',
                icon: require('@assets/icons/logo.png'),
            },
            lastUpdated: new Date().toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            }),
            content: ARTICLE_CONTENT,
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
            thumbnail: require('@assets/icons/watching-style.png'),
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: require('@assets/icons/watching-style.png'),
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: require('@assets/icons/watching-style.png'),
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
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: require('@assets/icons/listening-style.png'),
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: require('@assets/icons/listening-style.png'),
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: require('@assets/icons/listening-style.png'),
        },
    ];
};
