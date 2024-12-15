import { LearningUnit } from './learning-unit';
import { User } from './user';

export type Article = LearningUnit & {
    author: User;
    lastUpdated: string;
    content: string;
};
