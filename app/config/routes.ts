import { Article } from '@models/article';

export enum RouteNames {
    SUBJECTS = 'Subjects',
    LEARNING_STYLE = 'Learning Style',
    READING = 'Reading',
    GAMING = 'Gaming',
    AUDIO = 'Audio',
    VIDEO = 'Video',
    ARTICLE = 'Article',
}

export type AppRoutesParamList = {
    [RouteNames.SUBJECTS]: undefined;
    [RouteNames.LEARNING_STYLE]: undefined;
    [RouteNames.READING]: undefined;
    [RouteNames.GAMING]: undefined;
    [RouteNames.AUDIO]: undefined;
    [RouteNames.VIDEO]: undefined;
    [RouteNames.ARTICLE]: {
        article: Article;
    };
};
