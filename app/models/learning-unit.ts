import { StringKey } from '@config/strings';

export type LearningUnit = {
    id: number;
    subject: StringKey;
    name: StringKey;
    description?: StringKey;
};

export type MediaLearningUnit = LearningUnit & { sourceUrl: string };
