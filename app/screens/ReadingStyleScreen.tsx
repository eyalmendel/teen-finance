import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import AppCard from '@components/AppCard';
import EmptyState from '@components/EmptyState';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Article } from '@models/article';
import { getArticlesBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutesParamList, RouteNames } from '@config/routes';

type Props = NativeStackScreenProps<AppRoutesParamList, RouteNames.READING>;

function ReadingStyleScreen({ navigation }: Props) {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async (): Promise<void> => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const articles = getArticlesBySubjectName(selectedSubjectName);

        setArticles(articles);
    };

    return (
        <Screen>
            <SubjectScreenTitle template="readingStyleScreenTitle" />
            {articles?.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(learningUnit) => learningUnit.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <AppCard
                            style={styles.cardContainer}
                            onPress={() =>
                                navigation.navigate(RouteNames.ARTICLE, {
                                    article: item,
                                })
                            }
                        >
                            <>
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
                                                styles.description,
                                                STYLES.rightAlignedText,
                                            ]}
                                        >
                                            {translate(item.description)}
                                        </Text>
                                    )}
                                    <View style={styles.estimatedTimeContainer}>
                                        <Text>{`${
                                            item.estimatedTime
                                        } ${translate('minutes')}`}</Text>
                                        <MaterialCommunityIcons
                                            style={styles.icon}
                                            name="clock-outline"
                                            color={COLORS.primary}
                                        />
                                    </View>
                                </View>
                                <View style={styles.thumbnail}></View>
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
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: horizontalScale(16),
    },
    details: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '65%',
        gap: verticalScale(8),
    },
    title: {
        fontSize: moderateScale(TEXT.size.smallHeadline),
        fontWeight: TEXT.weight.bold,
    },
    description: {
        fontSize: moderateScale(TEXT.size.default),
    },
    estimatedTimeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: horizontalScale(4),
    },
    icon: {
        alignSelf: 'center',
    },
    thumbnail: {
        width: '30%',
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(8),
        aspectRatio: 96 / 128,
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});

export default ReadingStyleScreen;
