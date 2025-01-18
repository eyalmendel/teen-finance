import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import Icons from '@assets/icons';
import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import ScreenTitle from '@components/ScreenTitle';
import AppSimpleList from '@components/AppSimpleList';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { Subject } from '@models/subject';
import { getSubjects } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { setSelectedSubjectName } from '@services/state';
import AppImage from '@components/AppImage';
import AppGoBackButton from '@components/AppGoBackButton';

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
            <View style={styles.headline}>
                <ScreenTitle text={translate('subjectsScreenTitle')}></ScreenTitle>
                <AppGoBackButton />
            </View>
            {subjects?.length === 0 ? (
                <EmptyState />
            ) : (
                <AppSimpleList
                    style={styles.list}
                    data={subjects}
                    numColumns={2}
                    renderItem={(subject) => (
                        <Pressable
                            style={[
                                styles.cardContainer,
                                !subject.isAvailable ? styles.unavailable : '',
                            ]}
                            onPress={() => handleSubjectSelection(subject)}
                        >
                            {!subject.isAvailable && (
                                <AppImage
                                    style={styles.comingSoon}
                                    source={Icons.comingSoon}
                                />
                            )}
                            <AppImage
                                style={styles.icon}
                                source={subject.icon}
                            />
                            <Text
                                style={[STYLES.rightAlignedText, styles.label]}
                            >
                                {translate(subject.name)}
                            </Text>
                        </Pressable>
                    )}
                />
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
        backgroundColor: COLORS.purple,
        opacity: 0.2,
    },
    unavailable: {
        pointerEvents: 'none',
        opacity: 0.8,
    },
    icon: {
        width: 30,
        height: 30,
        objectFit: 'contain',
    },
    label: {
        fontSize: TEXT.size.default,
        fontWeight: TEXT.weight.bold,
        color: COLORS.primary,
        textAlign: 'center',
    },
    headline:{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'flex-end',
        gap: 16,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: verticalScale(32)
    },
});

export default SubjectsScreen;
