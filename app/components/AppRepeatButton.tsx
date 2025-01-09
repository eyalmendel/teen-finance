import React from 'react';
import { GestureResponderEvent } from 'react-native';

import AppRoundButton from './AppRoundButton';
import Icons from '@assets/icons';

type Props = {
    onPress: (event: GestureResponderEvent) => void;
};

export default function AppRepeatButton({ onPress }: Props) {
    return <AppRoundButton icon={Icons.repeat} onPress={onPress} />;
}
