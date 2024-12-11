import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import AppAudioPlayer from '@components/AppAudioPlayer';
import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MediaLearningUnit } from '@models/learning-unit';
import { getAudioUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';

function ListeningStyleScreen() {
    const [audioUnits, setAudioUnits] = useState<MediaLearningUnit[]>([]);

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

    return (
        <Screen>
            <SubjectScreenTitle template="listeningStyleScreenTitle" />

            {audioUnits?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={audioUnits}
                    keyExtractor={(audio) => audio.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={[styles.cardContainer, styles.boxShadow]}>
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
                            <View style={styles.controlsContainer}>
                                <AppAudioPlayer
                                    sourceUri={item.sourceUrl}
                                    style={styles.playerContainer}
                                ></AppAudioPlayer>
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
        borderRadius: moderateScale(24),
        paddingVertical: verticalScale(16),
        paddingHorizontal: horizontalScale(16),
        backgroundColor: COLORS.eggWhite,
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
    title: {
        fontSize: moderateScale(TEXT.size.smallHeadline),
        fontWeight: TEXT.weight.bold,
        marginBlockEnd: verticalScale(8),
    },
    description: {
        fontSize: moderateScale(TEXT.size.default),
    },
    estimatedTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        gap: horizontalScale(4),
    },
    icon: {
        alignSelf: 'center',
    },
    controlsContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        marginBlockStart: verticalScale(16),
    },
    playerContainer: {
        width: horizontalScale(40),
        height: verticalScale(40),
        borderRadius: moderateScale(24),
    },
});

export default ListeningStyleScreen;
