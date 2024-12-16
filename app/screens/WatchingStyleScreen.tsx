import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import AppVideoPlayer from '@components/AppVideoPlayer';
import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MediaLearningUnit } from '@models/learning-unit';
import { getVideoUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';
import AppCard from '@components/AppCard';

function WatchingStyleScreen() {
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
            <SubjectScreenTitle template="watchingStyleScreenTitle" />
            {videoUnits?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={videoUnits}
                    keyExtractor={(video) => video.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <AppCard style={styles.cardContainer}>
                            <>
                                <View style={styles.details}>
                                    <Text
                                        style={[
                                            STYLES.rightAlignedText,
                                            styles.title,
                                        ]}
                                    >
                                        {translate(item.title)}
                                    </Text>
                                    {item.description && (
                                        <Text
                                            style={[
                                                STYLES.defaultText,
                                                STYLES.rightAlignedText,
                                            ]}
                                        >
                                            {translate(item.description)}
                                        </Text>
                                    )}
                                    <View style={styles.estimatedTimeContainer}>
                                        <Text
                                            style={styles.estimatedTimeLabel}
                                        >{`${item.estimatedTime} ${translate(
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
                            </>
                        </AppCard>
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
        flexDirection: 'row',
        gap: horizontalScale(16),
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
        color: COLORS.primary,
    },
    estimatedTimeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: horizontalScale(4),
    },
    estimatedTimeLabel: {
        fontSize: TEXT.size.small,
        color: COLORS.primary,
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

export default WatchingStyleScreen;
