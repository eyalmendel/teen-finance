import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
    sourceUri: string;
    style: ViewStyle;
};

function AppAudioPlayer({ sourceUri, style }: Props) {
    const [audio, setAudio] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        let cleanupCallback;

        if (audio !== null) {
            cleanupCallback = () => {
                audio.unloadAsync();
            };
        }
        return cleanupCallback;
    }, [audio]);

    const play = async (): Promise<void> => {};

    const pause = async (): Promise<void> => {};

    return (
        <View style={[styles.container, style]}>
            <Pressable style={styles.button} onPress={play}>
                <MaterialIcons
                    name="play-arrow"
                    size={24}
                    maxFontSizeMultiplier={2}
                    allowFontScaling
                    adjustsFontSizeToFit
                ></MaterialIcons>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
    },

    button: {
        width: '25%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppAudioPlayer;
