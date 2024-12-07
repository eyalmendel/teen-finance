import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import AppVideoPlayer from '@components/AppVideoPlayer';
import { MediaLearningUnit } from '@models/learning-unit';
import { getVideoUnitsBySubjectName } from '@services/data';
import Screen from '@components/Screen';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';
import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STYLES } from '@config/styles';
import ScreenTitle from '@components/ScreenTitle';
import { StringKey } from '@config/strings';

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

    const getTitleParamValue = (): StringKey[] => {
        const selectedSubjectName = getSelectedSubjectName();
        return selectedSubjectName !== null ? [selectedSubjectName] : [];
    };

    return (
        <Screen>
            <ScreenTitle
                text={translate(
                    'watchingStyleScreenTitle',
                    getTitleParamValue(),
                )}
            ></ScreenTitle>
            <FlatList
                data={videoUnits}
                keyExtractor={(video) => video.id.toString()}
                contentContainerStyle={{ gap: '3%' }}
                renderItem={({ item }) => (
                    <View style={[styles.cardContainer, styles.boxShadow]}>
                        <View style={styles.details}>
                            <Text
                                style={[styles.title, STYLES.rightAlignedText]}
                            >
                                {translate(item.title)}
                            </Text>
                            {item.description && (
                                <Text
                                    style={[
                                        styles.description,
                                        STYLES.rightAlignedText,
                                    ]}
                                >
                                    {translate(item.description)}
                                </Text>
                            )}
                            <View style={styles.estimatedTimeContainer}>
                                <Text>{`${item.estimatedTime} ${translate(
                                    'minutes',
                                )}`}</Text>
                                <MaterialCommunityIcons
                                    style={styles.icon}
                                    name="clock-outline"
                                    color={COLORS.primary}
                                />
                            </View>
                        </View>
                        <View style={styles.videoPlayerContainer}>
                            <AppVideoPlayer
                                sourceUri={item.sourceUrl}
                            ></AppVideoPlayer>
                        </View>
                    </View>
                )}
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 200,
        margin: 'auto',
        borderRadius: '5%',
        flexDirection: 'row',
        gap: '4%',
        paddingVertical: '5%',
        paddingHorizontal: '1%',
        backgroundColor: COLORS.eggWhite,
    },
    details: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '45%',
        gap: '4%',
    },
    title: {
        fontSize: TEXT.size.smallHeadline,
        fontWeight: TEXT.weight.bold,
    },
    description: {
        fontSize: TEXT.size.default,
    },
    estimatedTimeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 4,
    },
    icon: {
        alignSelf: 'center',
    },
    videoPlayerContainer: {
        width: '45%',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        overflow: 'hidden',
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});

export default VideoStyleScreen;
