import { ImageRequireSource } from 'react-native';
import { StringKey } from '@config/strings';

export type LearningPreview = {
    id: number;
    name: StringKey;
    icon: ImageRequireSource;
};
