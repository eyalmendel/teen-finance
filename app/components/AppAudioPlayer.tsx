import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    AVPlaybackStatus,
    AVPlaybackStatusSuccess,
} from 'expo-av';

import { COLORS } from '@config/colors';
import { horizontalScale } from '@services/scale';

type Props = {
    sourceUri: string;
    style: ViewStyle;
    playbackSpeed: number;
};

function AppAudioPlayer({ sourceUri, style, playbackSpeed }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { current: sound } = useRef(new Audio.Sound());

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

    return (
        <Pressable style={[styles.container, style]} onPress={handlePress}>
            <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={horizontalScale(30)}
                color={COLORS.white}
            ></MaterialIcons>
        </Pressable>
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
});

export default AppAudioPlayer;
