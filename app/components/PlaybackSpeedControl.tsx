import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Text } from 'react-native';
import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';

type Props = {
    style?: ViewStyle;
    currentSpeed: number;
    handleSpeedChange: (speed: number) => void;
};

function PlaybackSpeedControl({style, currentSpeed, handleSpeedChange}: Props) {
    const speeds = [1.0, 1.5, 2.0, 0.8];

    const handlePress = () => {
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        handleSpeedChange(speeds[nextIndex]);
    };

    return (
        <Pressable onPress={handlePress} style={[styles.container, style]}>
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
