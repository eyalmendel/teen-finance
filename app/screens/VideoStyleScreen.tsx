import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import AppVideoPlayer from '@components/AppVideoPlayer';
import { MediaLearningUnit } from '@models/learning-unit';
import { getVideoUnitsBySubjectName } from '@services/data';
import Screen from '@components/Screen';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';

function VideoStyleScreen() {
    const [videoUnits, setVideoUnits] = useState<MediaLearningUnit[]>([]);

    useEffect(() => {
        setVideoLearningUnits();
    }, []);

    const setVideoLearningUnits = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const videoUnits = getVideoUnitsBySubjectName(selectedSubjectName);

        setVideoUnits(videoUnits);
    };

    return (
        <Screen>
            <FlatList
                data={videoUnits}
                keyExtractor={(video) => video.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <AppVideoPlayer
                            sourceUri={item.sourceUrl}
                        ></AppVideoPlayer>
                        <Text>{translate(item.description ?? null)}</Text>
                    </View>
                )}
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {},
});

export default VideoStyleScreen;
