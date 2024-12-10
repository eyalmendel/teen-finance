import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { COLORS } from '@config/colors';
import { horizontalScale } from '@services/scale';

type Props = {
    sourceUri: string;
    style: ViewStyle;
};

function AppAudioPlayer({ sourceUri, style }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { current: sound } = useRef(new Audio.Sound());

    useEffect(() => {
        loadTrack();
        return () => {
            sound ? sound.unloadAsync() : null;
        };
    }, []);

    const loadTrack = async (): Promise<void> => {
        await sound.loadAsync({ uri: sourceUri });
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

    return (
        <Pressable style={[styles.container, style]} onPress={handlePress}>
            <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={horizontalScale(30)}
                color={COLORS.white}
                style={styles.playIcon}
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
    playIcon: {},
});

export default AppAudioPlayer;
