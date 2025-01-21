import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
    NativeScrollEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Screen from '@components/Screen';
import ScreenTitle from '@components/ScreenTitle';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { STYLES } from '@config/styles';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { TEXT } from '@config/text';
import AppUserIcon from '@components/AppUserIcon';
import AppHorizontalProgressBar from '@components/AppHorizontalProgressBar';
import { AntDesign } from '@expo/vector-icons';

export type Props = NativeStackScreenProps<
    AppRoutesParamList,
    RouteNames.ARTICLE
>;

function ArticleScreen({ route }: Props) {
    const [progress, setProgress] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { article } = route.params;

    const scroll = ({
        contentSize,
        layoutMeasurement,
        contentOffset,
    }: NativeScrollEvent): void => {
        const contentHeight = contentSize.height;
        const scrollViewHeight = layoutMeasurement.height;
        const scrollOffset = contentOffset.y;

        const percentage = scrollOffset / (contentHeight - scrollViewHeight);

        if (isNaN(percentage)) {
            setProgress(0);
        } else {
            setProgress(Math.max(0, Math.min(100, percentage)));
        }
    };

    const scrollToTop = (): void => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
        <Screen>
            <View style={styles.container}>
                <AppHorizontalProgressBar progress={progress} height={4} />
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    onScroll={(event) => scroll(event.nativeEvent)}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <ScreenTitle
                        text={translate(article.title)}
                        style={STYLES.rightAlignedText}
                    />
                    <View style={styles.creditsContainer}>
                        <AppUserIcon icon={article.author.icon} />
                        <View>
                            <Text style={styles.creditsText}>
                                {article.author.name}
                            </Text>
                            <Text style={styles.creditsText}>
                                {article.lastUpdated}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.content}>{article.content}</Text>
                </ScrollView>
                <Pressable
                    style={[styles.scrollTopButton, STYLES.boxShadow]}
                    onPress={scrollToTop}
                >
                    <AntDesign
                        name="arrowup"
                        size={moderateScale(20)}
                        color={COLORS.primary}
                    />
                </Pressable>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: verticalScale(8),
        paddingHorizontal: horizontalScale(8),
        backgroundColor: COLORS.eggWhite,
        position: 'relative',
    },
    scrollView: {
        marginVertical: verticalScale(16),
    },
    creditsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    creditsText: {
        fontFamily: TEXT.font.assistantRegular,
        fontSize: TEXT.size.default,
        color: COLORS.grey,
    },
    content: {
        paddingVertical: verticalScale(16),
        fontSize: TEXT.size.default,
        color: COLORS.black,
    },
    scrollTopButton: {
        width: 40,
        height: 40,
        borderRadius: moderateScale(30),
        borderWidth: moderateScale(2),
        borderColor: COLORS.primary,
        backgroundColor: COLORS.mainBackground,
        position: 'absolute',
        bottom: verticalScale(34),
        left: horizontalScale(13),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ArticleScreen;
