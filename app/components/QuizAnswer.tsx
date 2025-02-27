import React, { useCallback } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';

import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { verticalScale, horizontalScale, moderateScale } from '@services/scale';
import { TEXT } from '@config/text';

type StyleTuple = {
    container: ViewStyle | null;
    text: TextStyle | null;
};

type Props = {
    text: string;
    onSelection?: () => void;
    shouldMark?: boolean;
    isSelected?: boolean;
    isCorrect?: boolean;
    isDisabled?: boolean;
};

export default function QuizAnswer({
    text,
    isSelected,
    isCorrect,
    shouldMark,
    isDisabled,
    onSelection,
}: Props) {
    const getStyle = useCallback((): StyleTuple => {
        const style: StyleTuple = {
            container: null,
            text: null,
        };

        if (isDisabled) {
            style.container = STYLES.disabled;
        }

        if (!shouldMark) {
            if (isSelected) {
                style.container = styles.selectedAnswer;
            }
        } else if (shouldMark) {
            if (isSelected && isCorrect) {
                style.container = styles.correctAnswerContainer;
                style.text = styles.correctAnswer;
            } else if (isSelected && !isCorrect) {
                style.container = styles.wrongAnswerContainer;
                style.text = styles.wrongAnswer;
            }
        }
        return style;
    }, [isSelected, isCorrect, isDisabled, shouldMark]);

    const { container: containerStyle, text: textStyle } = getStyle();

    return (
        <Pressable
            style={[styles.answerContainer, containerStyle]}
            onPress={onSelection}
        >
            <Text style={[styles.answer, STYLES.rightAlignedText, textStyle]}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    answerContainer: {
        paddingBlock: verticalScale(16),
        paddingInline: horizontalScale(16),
        borderRadius: moderateScale(20),
        backgroundColor: COLORS.eggWhite,
        borderWidth: 0.5,
        borderColor: COLORS.mainBackground,
    },
    answer: {
        fontSize: TEXT.size.default,
        fontFamily: TEXT.font.assistantSemiBold,
    },
    selectedAnswer: {
        borderColor: COLORS.primary,
    },
    correctAnswerContainer: {
        backgroundColor: COLORS.correctBackground,
        borderColor: COLORS.correctBackground,
        pointerEvents: 'none',
    },
    correctAnswer: {
        color: COLORS.correctText,
    },
    wrongAnswerContainer: {
        backgroundColor: COLORS.wrongBackground,
        borderColor: COLORS.wrongBackground,
    },
    wrongAnswer: {
        color: COLORS.wrongText,
    },
});
