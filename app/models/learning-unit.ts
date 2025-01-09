import { StringKey } from '@config/strings';
import { ImageRequireSource } from 'react-native';

export type LearningUnit = {
    id: number;
    subject: StringKey;
    title: StringKey;
    thumbnail: ImageRequireSource;
    estimatedTime?: number;
    description?: StringKey;
};

export type MediaLearningUnit = LearningUnit & { sourceUrl: string };
