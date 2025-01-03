import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { AntDesign } from '@expo/vector-icons';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { ModalAction } from '@context/modalContext';
import AppHomeButton from './AppHomeButton';
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
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('@assets/icons/playing-style.png')}
            />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {translate('quizCompletedTitle')}
                    </Text>
                    <Text style={styles.titleText}>
                        {correctAnswersCount}/{totalCount}
                    </Text>
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    titleText: {
        fontSize: TEXT.size.mediumHeadline,
        fontWeight: TEXT.weight.extraBold,
        color: COLORS.primary,
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
