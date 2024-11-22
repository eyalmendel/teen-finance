import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AppCard from '@components/AppCard';
import { LearningStyle } from '@models/learning-style';
import { translate } from '@services/language';
import Screen from '@components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutesParamList, RouteNames } from '@config/routes';

type Props = NativeStackScreenProps<
    AppRoutesParamList,
    RouteNames.LEARNING_STYLE
>;

const LEARNING_STYLES: LearningStyle[] = [
    { id: 0, name: 'read', screen: RouteNames.READING },
    { id: 1, name: 'watch', screen: RouteNames.VIDEO },
    { id: 2, name: 'listen', screen: RouteNames.AUDIO },
    { id: 3, name: 'play', screen: RouteNames.GAMING },
];

function LearningStyleScreen({ navigation }: Props) {
    const handleStyleSelection = (screen: RouteNames): void => {
        navigation.navigate(screen);
    };

    return (
        <Screen>
            <FlatList
                data={LEARNING_STYLES}
                keyExtractor={(style) => style.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <AppCard
                        label={translate(item.name)}
                        style={styles.cardContainer}
                        onPress={() => handleStyleSelection(item.screen)}
                    ></AppCard>
                )}
            ></FlatList>
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

export default LearningStyleScreen;
