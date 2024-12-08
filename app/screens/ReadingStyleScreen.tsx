import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Screen from '@components/Screen';
import { StringKey } from '@config/strings';
import { LearningUnit } from '@models/learning-unit';
import { getReadingUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';
import ScreenTitle from '@components/ScreenTitle';
import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STYLES } from '@config/styles';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';

function ReadingStyleScreen() {
    const [learningUnits, setLearningUnits] = useState<LearningUnit[]>([]);

    useEffect(() => {
        setUnits();
    }, []);

    const setUnits = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const units = getReadingUnitsBySubjectName(selectedSubjectName);

        setLearningUnits(units);
    };

    const getTitleParamValue = (): StringKey[] => {
        const selectedSubjectName = getSelectedSubjectName();
        return selectedSubjectName !== null ? [selectedSubjectName] : [];
    };

    return (
        <Screen>
            <ScreenTitle
                text={translate(
                    'readingStyleScreenTitle',
                    getTitleParamValue(),
                )}
            ></ScreenTitle>
            {learningUnits?.length === 0 ? (
                <Text>{translate('No Units For Now')}</Text>
            ) : (
                <FlatList
                    data={learningUnits}
                    keyExtractor={(learningUnit) => learningUnit.id.toString()}
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
                            <View style={styles.thumbnail}></View>
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
        width: '90%',
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: horizontalScale(16),
        borderRadius: moderateScale(24),
        paddingVertical: horizontalScale(16),
        paddingHorizontal: horizontalScale(16),
        backgroundColor: COLORS.eggWhite,
    },
    details: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '65%',
        gap: verticalScale(8),
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
    thumbnail: {
        width: '30%',
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(8),
        aspectRatio: 96 / 128,
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});

export default ReadingStyleScreen;
