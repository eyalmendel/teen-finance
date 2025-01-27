import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Text } from 'react-native';
import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';

type Props = {
    style?: ViewStyle;
    currentSpeed: number;
    onPress: () => void;
};

function PlaybackSpeedControl({ style, currentSpeed, onPress }: Props) {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <Text style={styles.text}>{`${currentSpeed}x`}</Text>
        </Pressable>
    );
}

export default PlaybackSpeedControl;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(57, 39, 111, 0.15)',
    },
    text: {
        color: COLORS.primary,
        fontFamily: TEXT.font.assistantBold,
    },
});
