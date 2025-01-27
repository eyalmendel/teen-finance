import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import AppAudioPlayer from '@components/AppAudioPlayer';
import PlaybackSpeedControl from '@components/PlaybackSpeedControl';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';

type Props = {
    sourceUri: string;
    style?: ViewStyle;
};

function AudioSettingsContainer({ sourceUri }: Props) {
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
    const speeds = [1.0, 1.5, 2.0, 0.8];

    const handleSpeedChange = () => {
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackSpeed(speeds[nextIndex]);
    };

    return (
        <View style={[styles.controlsContainer]}>
            <PlaybackSpeedControl
                style={styles.playerContainer}
                currentSpeed={playbackSpeed}
                onPress={handleSpeedChange}
            />
            <AppAudioPlayer
                sourceUri={sourceUri}
                style={styles.playerContainer}
                playbackSpeed={playbackSpeed}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        marginBlockStart: verticalScale(16),
        gap: 8,
    },
    playerContainer: {
        width: horizontalScale(40),
        aspectRatio: 1,
        borderRadius: moderateScale(40),
    },
});

export default AudioSettingsContainer;
