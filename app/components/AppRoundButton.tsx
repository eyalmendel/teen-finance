import React from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
} from 'react-native';

import { COLORS } from '@config/colors';
import { horizontalScale, verticalScale } from '@services/scale';

type Props = {
    icon: ImageSourcePropType;
    onPress: (event: GestureResponderEvent) => void;
};

export default function AppRoundButton({ icon, onPress }: Props) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.icon} source={icon} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: COLORS.primary,
    },
    icon: {
        width: horizontalScale(16),
        height: verticalScale(16),
    },
});
