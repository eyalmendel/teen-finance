import { useState } from 'react';
import { Pressable, StyleSheet, View, ViewStyle, Text } from 'react-native';
import { COLORS } from '@config/colors';

type Props = {
    style?: ViewStyle;
    handleSpeedChange: (speed: number) => void;
};

function PlaybackSpeedControl({ style, handleSpeedChange }: Props) {
    const speeds = [1.0, 1.5, 2.0, 0.8];
    const [currentSpeedIndex, setCurrentSpeedIndex] = useState(0);

    const handlePress = () => {
        const nextIndex = (currentSpeedIndex + 1) % speeds.length;
        const nextSpeed = speeds[nextIndex];
        setCurrentSpeedIndex(nextIndex);
        handleSpeedChange(nextSpeed);
    };

    return (
        <Pressable onPress={handlePress} style={[styles.container, style]}>
            <Text style={styles.text}>{`${speeds[currentSpeedIndex]}x`}</Text>
        </Pressable>
    );
}

export default PlaybackSpeedControl;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});
