import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { RouteNames } from '@config/routes';
import AppRoundButton from './AppRoundButton';
import Icons from '@assets/icons';

type Props = {
    onPress?: (event: GestureResponderEvent) => void;
};

export default function AppHomeButton({ onPress }: Props) {
    const { navigate } = useNavigation();

    const handlePress = (event: GestureResponderEvent): void => {
        navigate(RouteNames.LEARNING_STYLE);
        if (onPress) {
            onPress(event);
        }
    };

    return <AppRoundButton icon={Icons.home} onPress={handlePress} />;
}
