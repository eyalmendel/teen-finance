import React from 'react';

import AppRoundButton from './AppRoundButton';
import { GestureResponderEvent } from 'react-native';

type Props = {
    onPress: (event: GestureResponderEvent) => void;
};

export default function AppRepeatButton({ onPress }: Props) {
    return (
        <AppRoundButton
            icon={require('@assets/icons/repeat.png')}
            onPress={onPress}
        />
    );
}
