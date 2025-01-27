import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    AVPlaybackStatus,
    AVPlaybackStatusSuccess,
} from 'expo-av';

import { COLORS } from '@config/colors';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import PlaybackSpeedControl from './PlaybackSpeedControl';

type Props = {
    sourceUri: string;
};

function AppAudioPlayer({ sourceUri }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { current: sound } = useRef(new Audio.Sound());
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
    const speeds = [1.0, 1.5, 2.0, 0.8];

    useEffect(() => {
        loadTrack();
        return () => {
            sound ? sound.unloadAsync() : null;
        };
    }, []);

    const loadTrack = async (): Promise<void> => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: true,
        });
        await sound.loadAsync({ uri: sourceUri });

        sound.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
            if (status.isLoaded) {
                const playbackStatus = status as AVPlaybackStatusSuccess;
                if (playbackStatus.didJustFinish) {
                    await sound.setPositionAsync(0);
                    setIsPlaying(false);
                    await sound.pauseAsync();
                }
            }
        });
    };

    async function handlePress() {
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }

        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    useEffect(() => {
        if (sound) {
            sound.setRateAsync(playbackSpeed, true);
        }
    }, [playbackSpeed]);

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

            <Pressable
                style={[styles.container, styles.playerContainer]}
                onPress={handlePress}
            >
                <MaterialIcons
                    name={isPlaying ? 'pause' : 'play-arrow'}
                    size={horizontalScale(30)}
                    color={COLORS.white}
                ></MaterialIcons>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
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

export default AppAudioPlayer;
