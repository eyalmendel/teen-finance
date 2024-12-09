import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import AppAudioPlayer from '@components/AppAudioPlayer';
import Screen from '@components/Screen';
import { MediaLearningUnit } from '@models/learning-unit';
import { getAudioUnitsBySubjectName } from '@services/data';
import { getSelectedSubjectName } from '@services/state';
import { translate } from '@services/language';

function AudioStyleScreen() {
    const [audioUnits, setAudioUnits] = useState<MediaLearningUnit[]>([]);
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    useEffect(() => {
        setAudioLearningUnits();
    }, []);

    const setAudioLearningUnits = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const audioUnits = getAudioUnitsBySubjectName(selectedSubjectName);
        setAudioUnits(audioUnits);
    };

    const styles = StyleSheet.create({
        list: {
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            paddingVertical: 20,
        },
        listItem: {
            width: screenWidth * 0.3,
            height: screenHeight * 0.15,
            marginVertical: 20,
        },
        playerContainer: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <Screen>
            <FlatList
                data={audioUnits}
                keyExtractor={(audio) => audio.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <AppAudioPlayer
                            sourceUri={item.sourceUrl}
                            style={styles.playerContainer}
                        ></AppAudioPlayer>
                        <Text>{translate(item.description ?? null)}</Text>
                    </View>
                )}
            ></FlatList>
        </Screen>
    );
}

export default AudioStyleScreen;
