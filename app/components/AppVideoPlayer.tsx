import { translate } from '@services/language';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    sourceUri: string;
};

function AppVideoPlayer({ sourceUri }: Props) {
    const [encodedUri, setEncodedUri] = useState<string | null>(null);

    useEffect(() => {
        const encoded = encodeURI(sourceUri);
        setEncodedUri(encoded);
    }, [sourceUri]);

    const player = useVideoPlayer(encodedUri);

    return (
        <View>
            {encodedUri ? (
                <VideoView
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                />
            ) : (
                <Text>{translate('Missing Video Source')}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%',
    },
});

export default AppVideoPlayer;
