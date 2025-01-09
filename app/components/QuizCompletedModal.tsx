import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Icons from '@assets/icons';
import { COLORS } from '@config/colors';
import { StringKey } from '@config/strings';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { ModalAction } from '@context/modalContext';
import { AntDesign } from '@expo/vector-icons';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import AppHomeButton from './AppHomeButton';
import AppImage from './AppImage';
import AppRepeatButton from './AppRepeatButton';

type Props = {
    correctAnswersCount: number;
    totalCount: number;
    onAction: (action: ModalAction) => void;
};

export default function QuizCompletedModal({
    correctAnswersCount,
    totalCount,
    onAction,
}: Props) {
    const [titleText, setTitleText] = useState<StringKey | null>(null);

    useEffect(() => {
        setTitleBySuccessRate();
    }, []);

    const setTitleBySuccessRate = (): void => {
        let text: StringKey;
        const successRate = correctAnswersCount / totalCount;

        if (successRate > 0.8) {
            text = 'quizGreatCompletion';
        } else if (successRate >= 0.5) {
            text = 'quizGoodCompletion';
        } else {
            text = 'quizBadCompletion';
        }

        setTitleText(text);
    };

    return (
        <View style={styles.container}>
            <AppImage style={styles.image} source={Icons.playingStyle} />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {correctAnswersCount}/{totalCount}
                    </Text>
                    <Text style={styles.titleText}>{translate(titleText)}</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <Pressable
                        style={styles.reviewButton}
                        onPress={() => onAction('next')}
                    >
                        <AntDesign
                            name="arrowleft"
                            size={12}
                            color={COLORS.eggWhite}
                        />
                        <Text style={styles.reviewButtonText}>
                            {translate('review quiz answers')}
                        </Text>
                    </Pressable>
                    <View style={styles.roundButtonsContainer}>
                        <AppRepeatButton onPress={() => onAction('repeat')} />
                        <AppHomeButton onPress={() => onAction('home')} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    image: {
        width: horizontalScale(100),
        height: verticalScale(100),
    },
    content: {
        gap: moderateScale(32),
    },
    titleContainer: {
        gap: moderateScale(4),
    },
    titleText: {
        fontSize: TEXT.size.large,
        fontWeight: TEXT.weight.bold,
        color: COLORS.primary,
        ...STYLES.rightAlignedText,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    reviewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(4),
        paddingVertical: verticalScale(16),
        paddingHorizontal: horizontalScale(8),
        borderRadius: moderateScale(30),
        backgroundColor: COLORS.primary,
    },
    reviewButtonText: {
        fontSize: TEXT.size.small,
        fontWeight: TEXT.weight.bold,
        color: COLORS.eggWhite,
    },
    roundButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(4),
    },
});
