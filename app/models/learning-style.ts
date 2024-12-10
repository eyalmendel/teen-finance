import { ImageRequireSource } from 'react-native';

import { RouteNames } from '@config/routes';
import { StringKey } from '@config/strings';

export type LearningStyle = {
    id: number;
    name: StringKey;
    screen: RouteNames;
    icon: ImageRequireSource;
};
