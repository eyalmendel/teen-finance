import { StringKey } from '@config/strings';
import { ImageSourcePropType } from 'react-native';

export type LearningUnit = {
    id: number;
    subject: StringKey;
    title: StringKey;
    thumbnail: ImageSourcePropType;
    estimatedTime?: number;
    description?: StringKey;
};

export type MediaLearningUnit = LearningUnit & { sourceUrl: string };
