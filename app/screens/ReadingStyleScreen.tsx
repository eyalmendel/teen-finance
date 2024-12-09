import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import AppCard from '@components/AppCard';
import Screen from '@components/Screen';
import { StringKey } from '@config/strings';
import { LearningUnit } from '@models/learning-unit';
import { getReadingUnitsBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { getSelectedSubjectName } from '@services/state';

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

    return (
        <Screen>
            {learningUnits?.length === 0 ? (
                <Text>No Units For Now</Text>
            ) : (
                <FlatList
                    data={learningUnits}
                    keyExtractor={(learningUnit) => learningUnit.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <AppCard
                            label={translate(item.name as StringKey)}
                            style={styles.cardContainer}
                        ></AppCard>
                    )}
                ></FlatList>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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

export default ReadingStyleScreen;
