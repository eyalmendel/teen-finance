import { Article } from '@models/article';
import { QuestionAnswerTuple } from '@models/quiz';

export enum RouteNames {
    SUBJECTS = 'Subjects',
    LEARNING_STYLE = 'Learning Style',
    READING = 'Reading',
    GAMING = 'Gaming',
    AUDIO = 'Audio',
    VIDEO = 'Video',
    ARTICLE = 'Article',
    QUIZ = 'Quiz',
    QUIZ_ANSWER_SUMMARY = 'Quiz Answer Summary',
}

export type AppRoutesParamList = {
    [RouteNames.SUBJECTS]: undefined;
    [RouteNames.LEARNING_STYLE]: undefined;
    [RouteNames.READING]: undefined;
    [RouteNames.GAMING]: undefined;
    [RouteNames.AUDIO]: undefined;
    [RouteNames.VIDEO]: undefined;
    [RouteNames.QUIZ]: undefined;
    [RouteNames.ARTICLE]: {
        article: Article;
    };
    [RouteNames.QUIZ_ANSWER_SUMMARY]: {
        summary: QuestionAnswerTuple[];
    };
};
