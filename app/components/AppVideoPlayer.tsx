import { translate } from '@services/language';
import { Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

type Props = {
    sourceUri: string;
};

function AppVideoPlayer({ sourceUri }: Props) {
    const [encodedUri, setEncodedUri] = useState<string | null>(null);
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        const encoded = encodeURI(sourceUri);
        setEncodedUri(encoded);
    }, [sourceUri]);

    return (
        <View>
            {encodedUri ? (
                <Video
                    ref={videoRef}
                    source={{ uri: encodedUri }}
                    useNativeControls
                ></Video>
            ) : (
                <Text>{translate('Missing Video Source')}</Text>
            )}
        </View>
    );
}

export default AppVideoPlayer;
