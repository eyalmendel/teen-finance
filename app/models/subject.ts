import { StringKey } from '@config/strings';
import { ImageRequireSource } from 'react-native';

export type Subject = {
    id: number;
    name: StringKey;
    icon: ImageRequireSource;
};
