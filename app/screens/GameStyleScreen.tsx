import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from '@components/Screen';
import { LearningUnit } from '@models/learning-unit';
import { getGameUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';
import ScreenTitle from '@components/ScreenTitle';
import { StringKey } from '@config/strings';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';

function GameStyleScreen() {
    const [games, setGames] = useState<LearningUnit[]>([]);

    useEffect(() => {
        setLearningGames();
    }, []);

    const setLearningGames = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const games = getGameUnitsBySubjectName(selectedSubjectName);
        setGames(games);
    };

    const getTitleParamValue = (): StringKey[] => {
        const selectedSubjectName = getSelectedSubjectName();
        return selectedSubjectName !== null ? [selectedSubjectName] : [];
    };

    return (
        <Screen>
            <ScreenTitle
                text={translate('gamingStyleScreenTitle', getTitleParamValue())}
            ></ScreenTitle>
            <FlatList
                data={games}
                keyExtractor={(game) => game.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={[styles.cardContainer, styles.boxShadow]}>
                        <View style={styles.thumbnail}></View>
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
                        </View>
                    </View>
                )}
            ></FlatList>
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
        gap: verticalScale(16),
        paddingVertical: verticalScale(16),
        paddingHorizontal: horizontalScale(16),
        backgroundColor: COLORS.eggWhite,
    },
    details: {
        gap: verticalScale(8),
        justifyContent: 'space-between',
    },
    title: {
        fontSize: moderateScale(TEXT.size.smallHeadline),
        fontWeight: TEXT.weight.bold,
        color: COLORS.primary,
    },
    description: {
        fontSize: moderateScale(TEXT.size.default),
        fontWeight: TEXT.weight.regular,
        color: COLORS.primary,
    },
    thumbnail: {
        height: verticalScale(96),
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(8),
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});

export default GameStyleScreen;
