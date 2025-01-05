import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppCard from '@components/AppCard';
import AppSimpleList from '@components/AppSimpleList';
import AppVideoPlayer from '@components/AppVideoPlayer';
import EmptyState from '@components/EmptyState';
import EstimatedTime from '@components/EstimatedTime';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { MediaLearningUnit } from '@models/learning-unit';
import { getVideoUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';

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
                <AppSimpleList
                    style={styles.list}
                    data={videoUnits}
                    renderItem={(item) => (
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
                                    <EstimatedTime time={item.estimatedTime} />
                                </View>
                                <View style={styles.videoPlayerContainer}>
                                    <AppVideoPlayer
                                        sourceUri={item.sourceUrl}
                                    ></AppVideoPlayer>
                                </View>
                            </>
                        </AppCard>
                    )}
                ></AppSimpleList>
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
