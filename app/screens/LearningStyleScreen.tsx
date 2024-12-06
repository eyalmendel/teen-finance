import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';

import { LearningStyle } from '@models/learning-style';
import { translate } from '@services/language';
import Screen from '@components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { TEXT } from '@config/text';
import { COLORS } from '@config/colors';
import ScreenTitle from '@components/ScreenTitle';

type Props = NativeStackScreenProps<
    AppRoutesParamList,
    RouteNames.LEARNING_STYLE
>;

const LEARNING_STYLES: LearningStyle[] = [
    {
        id: 0,
        name: 'read',
        screen: RouteNames.READING,
        icon: require('@assets/icons/reading-style.png'),
    },
    {
        id: 1,
        name: 'watch',
        screen: RouteNames.VIDEO,
        icon: require('@assets/icons/watching-style.png'),
    },
    {
        id: 2,
        name: 'listen',
        screen: RouteNames.AUDIO,
        icon: require('@assets/icons/listening-style.png'),
    },
    {
        id: 3,
        name: 'play',
        screen: RouteNames.GAMING,
        icon: require('@assets/icons/playing-style.png'),
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
            <FlatList
                data={LEARNING_STYLES}
                keyExtractor={(style) => style.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable
                        style={[styles.cardContainer, styles.shadow]}
                        onPress={() => handleStyleSelection(item.screen)}
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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    cardContainer: {
        width: '100%',
        margin: 'auto',
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        paddingVertical: '6%',
        paddingHorizontal: '12%',
        backgroundColor: COLORS.eggWhite,
    },
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    image: {
        width: '35%',
        objectFit: 'contain',
    },
    label: {
        fontSize: TEXT.size.smallHeadline,
        fontWeight: TEXT.weight.bold,
    },
});

export default LearningStyleScreen;
