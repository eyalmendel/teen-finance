import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { LearningUnit } from '@models/learning-unit';
import { getGameUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';
import AppCard from '@components/AppCard';

function GamingStyleScreen() {
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

    return (
        <Screen>
            <SubjectScreenTitle template="gamingStyleScreenTitle" />
            {games?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={games}
                    keyExtractor={(game) => game.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <AppCard style={styles.cardContainer}>
                            <>
                                <Image
                                    style={styles.thumbnail}
                                    source={item.thumbnail}
                                    resizeMode="contain"
                                />
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
                                                STYLES.defaultText,
                                                STYLES.rightAlignedText,
                                            ]}
                                        >
                                            {translate(item.description)}
                                        </Text>
                                    )}
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
        gap: verticalScale(16),
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
    thumbnail: {
        height: verticalScale(96),
        width: '100%',
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

export default GamingStyleScreen;
