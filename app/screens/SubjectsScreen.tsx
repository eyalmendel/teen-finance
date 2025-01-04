import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';

import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import ScreenTitle from '@components/ScreenTitle';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { Subject } from '@models/subject';
import { getSubjects } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
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
            <ScreenTitle text={translate('subjectsScreenTitle')}></ScreenTitle>
            {subjects?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={subjects}
                    keyExtractor={(subject) => subject.id.toString()}
                    contentContainerStyle={styles.list}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Pressable
                            style={[
                                styles.cardContainer,
                                !item.isAvailable ? styles.unavailable : '',
                            ]}
                            onPress={() => handleSubjectSelection(item)}
                        >
                            {!item.isAvailable && (
                                <Image
                                    style={styles.comingSoon}
                                    source={require('@assets/icons/coming-soon.png')}
                                />
                            )}
                            <Image
                                style={styles.icon}
                                source={item.icon}
                            ></Image>
                            <Text
                                style={[STYLES.rightAlignedText, styles.label]}
                            >
                                {translate(item.name)}
                            </Text>
                        </Pressable>
                    )}
                ></FlatList>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: horizontalScale(160),
        height: verticalScale(144),
        borderRadius: moderateScale(8),
        margin: moderateScale(8),
        paddingBlock: verticalScale(16),
        paddingInline: horizontalScale(16),
        gap: verticalScale(8),
        backgroundColor: COLORS.purple,
    },
    comingSoon: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.1,
    },
    unavailable: {
        pointerEvents: 'none',
        opacity: 0.8,
    },
    icon: {
        objectFit: 'contain',
    },
    label: {
        fontSize: TEXT.size.default,
        fontWeight: TEXT.weight.bold,
        color: COLORS.primary,
        textAlign: 'center',
    },
});

export default SubjectsScreen;
