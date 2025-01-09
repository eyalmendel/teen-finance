import React from 'react';
import {
    GestureResponderEvent,
    ImageRequireSource,
    Pressable,
    StyleSheet,
} from 'react-native';

import { COLORS } from '@config/colors';
import { horizontalScale, verticalScale } from '@services/scale';
import AppImage from './AppImage';

type Props = {
    icon: ImageRequireSource;
    onPress: (event: GestureResponderEvent) => void;
};

export default function AppRoundButton({ icon, onPress }: Props) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <AppImage
                style={styles.icon}
                source={icon}
                contentFit="contain"
                contentPosition="center"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        aspectRatio: 1,
        borderRadius: 26,
        backgroundColor: COLORS.primary,
    },
    icon: {
        width: horizontalScale(16),
        height: verticalScale(16),
    },
});
