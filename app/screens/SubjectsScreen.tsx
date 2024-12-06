import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';

import Screen from '@components/Screen';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { Subject } from '@models/subject';
import { getSubjects } from '@services/data';
import { translate } from '@services/language';
import { setSelectedSubjectName } from '@services/state';
import { TEXT } from '@config/text';
import ScreenTitle from '@components/ScreenTitle';

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
            <ScreenTitle text={translate('subjectsScreenTitle')}></ScreenTitle>

            <FlatList
                data={subjects}
                keyExtractor={(subject) => subject.id.toString()}
                contentContainerStyle={styles.list}
                numColumns={2}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.cardContainer}
                        onPress={() => handleSubjectSelection(item)}
                    >
                        <Image style={styles.image} source={item.icon}></Image>
                        <Text style={styles.label}>{translate(item.name)}</Text>
                    </Pressable>
                )}
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        // maxHeight: 120,
        borderRadius: 6,
        margin: '2%',
        paddingHorizontal: '8%',
        paddingVertical: '8%',
        gap: '3%',
        backgroundColor: COLORS.purple,
    },
    image: {
        width: '30%',
        objectFit: 'contain',
    },
    label: {
        fontSize: TEXT.size.default,
        fontWeight: TEXT.weight.bold,
        textAlign: 'right',
    },
});

export default SubjectsScreen;
