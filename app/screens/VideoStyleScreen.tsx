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
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import EmptyState from '@components/EmptyState';

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

            {videoUnits?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={videoUnits}
                    keyExtractor={(video) => video.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={[styles.cardContainer, styles.boxShadow]}>
                            <View style={styles.details}>
                                <Text
                                    style={[
                                        styles.title,
                                        STYLES.rightAlignedText,
                                    ]}
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
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: moderateScale(16),
        paddingVertical: verticalScale(24),
    },
    cardContainer: {
        width: '98%',
        margin: 'auto',
        flexDirection: 'row',
        borderRadius: moderateScale(24),
        gap: horizontalScale(16),
        paddingVertical: verticalScale(16),
        paddingHorizontal: horizontalScale(16),
        backgroundColor: COLORS.eggWhite,
    },
    details: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '45%',
        gap: verticalScale(4),
    },
    title: {
        fontSize: moderateScale(TEXT.size.smallHeadline),
        fontWeight: TEXT.weight.bold,
    },
    description: {
        fontSize: moderateScale(TEXT.size.default),
    },
    estimatedTimeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: horizontalScale(4),
    },
    icon: {
        alignSelf: 'center',
    },
    videoPlayerContainer: {
        width: '50%',
        aspectRatio: 1,
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(8),
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
