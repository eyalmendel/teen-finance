import { StringKey } from '@config/strings';
import { Article } from '@models/article';
import { LearningUnit, MediaLearningUnit } from '@models/learning-unit';
import { Quiz } from '@models/quiz';
import { ARTICLE_CONTENT } from '@mocks/article-content';
import { QUIZ_CONTENT } from '@mocks/quiz-content';
import { Subject } from '@models/subject';
import Icons from '@assets/icons';

export const getSubjects = (): Subject[] => {
    return [
        {
            id: 0,
            name: 'saving',
            icon: Icons.saving,
            isAvailable: false,
        },
        {
            id: 1,
            name: 'paycheck',
            icon: Icons.paycheck,
            isAvailable: true,
        },
        {
            id: 2,
            name: 'investments',
            icon: Icons.investment,
            isAvailable: false,
        },
        {
            id: 3,
            name: 'opening a bank account',
            icon: Icons.bankAccount,
            isAvailable: false,
        },
        {
            id: 4,
            name: 'employment rights',
            icon: Icons.employmentRights,
            isAvailable: false,
        },
        {
            id: 5,
            name: 'making income',
            icon: Icons.income,
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
            thumbnail: Icons.playingStyle,
        },
        {
            id: 1,
            subject: 'paycheck',
            title: 'Find the Error',
            description: 'Not here.. in the paycheck!',
            thumbnail: Icons.playingStyle,
        },
        {
            id: 2,
            subject: 'paycheck',
            title: "What's Missing?",
            description: 'Except your employee bonus',
            thumbnail: Icons.playingStyle,
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
            thumbnail: Icons.readingStyle,
            author: {
                name: 'מערכת',
                icon: Icons.logo,
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
            thumbnail: Icons.readingStyle,
            author: {
                name: 'מערכת',
                icon: Icons.logo,
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
            thumbnail: Icons.readingStyle,
            author: {
                name: 'מערכת',
                icon: Icons.logo,
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
            thumbnail: Icons.readingStyle,
            author: {
                name: 'מערכת',
                icon: Icons.logo,
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
            thumbnail: Icons.watchingStyle,
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: Icons.watchingStyle,
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: Icons.watchingStyle,
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
            thumbnail: Icons.listeningStyle,
        },
        {
            id: 1,
            subject: 'paycheck',
            title: "Paycheck Day Arrived. What's next?",
            description: "Paycheck Day Arrived. What's next?",
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: Icons.listeningStyle,
        },
        {
            id: 2,
            subject: 'paycheck',
            title: 'What to do if the Paycheck is Broken?',
            description: 'What to do if the Paycheck is Broken?',
            estimatedTime: 8,
            sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            thumbnail: Icons.listeningStyle,
        },
    ];
};
