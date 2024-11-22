import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import AppCard from '@components/AppCard';
import Screen from '@components/Screen';
import { Subject } from '@models/subject';
import { getSubjects } from '@services/data';
import { translate } from '@services/language';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { setSelectedSubjectName } from '@services/state';

type Props = NativeStackScreenProps<AppRoutesParamList, RouteNames.SUBJECTS>;

function SubjectsScreen({ navigation }: Props) {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        setSubjectList();
    }, []);

    const setSubjectList = async (): Promise<void> => {
        const subjects = getSubjects();
        setSubjects(subjects);
    };

    const handleSubjectSelection = (selectedSubject: Subject): void => {
        setSelectedSubjectName(selectedSubject.name);
        navigation.navigate(RouteNames.LEARNING_STYLE);
    };

    return (
        <Screen>
            <Text style={styles.title}>{translate('subjectsScreenTitle')}</Text>

            <FlatList
                data={subjects}
                keyExtractor={(subject) => subject.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <AppCard
                        style={styles.cardContainer}
                        label={translate(item.name)}
                        onPress={() => handleSubjectSelection(item)}
                    ></AppCard>
                )}
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
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

export default SubjectsScreen;
