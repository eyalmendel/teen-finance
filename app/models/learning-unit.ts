import { StringKey } from '@config/strings';

export type LearningUnit = {
    id: number;
    subject: StringKey;
    title: StringKey;
    thumbnailUrl: string;
    estimatedTime?: number;
    description?: StringKey;
};

export type MediaLearningUnit = LearningUnit & { sourceUrl: string };
