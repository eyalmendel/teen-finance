import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '@components/Screen';
import { LearningUnit } from '@models/learning-unit';
import { getGameUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';

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

    return (
        <Screen>
            {/* <FlatList
                data={games}
                keyExtractor={(game) => game.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <AppCard
                        label={translate(item.name)}
                        style={styles.cardContainer}
                    ></AppCard>
                )}
            ></FlatList> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 24,
        margin: 24,
    },
    cardContainer: {
        width: 120,
        height: 105,
        borderRadius: 6,
    },
});

export default GameStyleScreen;
