import React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppCard from '@components/AppCard';
import AppImage from '@components/AppImage';
import AppSimpleList from '@components/AppSimpleList';
import Screen from '@components/Screen';
import ScreenTitle from '@components/ScreenTitle';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { TEXT } from '@config/text';
import { LearningStyle } from '@models/learning-style';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import Icons from '@assets/icons';

type Props = NativeStackScreenProps<
    AppRoutesParamList,
    RouteNames.LEARNING_STYLE
>;

const LEARNING_STYLES: LearningStyle[] = [
    {
        id: 0,
        name: 'read',
        screen: RouteNames.READING,
        icon: Icons.readingStyle,
    },
    {
        id: 1,
        name: 'watch',
        screen: RouteNames.VIDEO,
        icon: Icons.watchingStyle,
    },
    {
        id: 2,
        name: 'listen',
        screen: RouteNames.AUDIO,
        icon: Icons.listeningStyle,
    },
    {
        id: 3,
        name: 'play',
        screen: RouteNames.GAMING,
        icon: Icons.playingStyle,
    },
];

function LearningStyleScreen({ navigation }: Props) {
    const handleStyleSelection = (screen: RouteNames): void => {
        navigation.navigate(screen);
    };

    return (
        <Screen>
            <ScreenTitle
                text={translate('learningStylesScreenTitle')}
            ></ScreenTitle>
            <AppSimpleList
                style={styles.list}
                data={LEARNING_STYLES}
                renderItem={(item) => (
                    <AppCard
                        style={styles.cardContainer}
                        onPress={() => handleStyleSelection(item.screen)}
                    >
                        <>
                            <AppImage
                                style={styles.image}
                                source={item.icon}
                                contentFit="contain"
                            />
                            <Text style={styles.label}>
                                {translate(item.name)}
                            </Text>
                        </>
                    </AppCard>
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingInline: horizontalScale(4),
        paddingVertical: verticalScale(24),
        gap: moderateScale(16),
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(48),
    },
    image: {
        width: '35%',
        aspectRatio: 1,
    },
    label: {
        fontSize: moderateScale(TEXT.size.large),
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
    },
});

export default LearningStyleScreen;
