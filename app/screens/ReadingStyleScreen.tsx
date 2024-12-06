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
    cardContainer: {
        width: '100%',
        margin: 'auto',
        borderRadius: '5%',
        flexDirection: 'row',
        gap: '4%',
        paddingVertical: '6%',
        paddingHorizontal: '5%',
        backgroundColor: COLORS.eggWhite,
    },
    details: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '70%',
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
    thumbnail: {
        width: '28%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});

export default ReadingStyleScreen;
