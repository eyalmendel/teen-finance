import React, { useEffect, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import AppStepCounter from '@components/AppStepCounter';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { Quiz } from '@models/quiz';
import { getQuizBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';
import AppHorizontalProgressBar from '@components/AppHorizontalProgressBar';
import { StringKey } from '@config/strings';
import { useModal } from '@hooks/useModal';
import AppModal from '@components/AppModal';

const COUNTDOWN_TOTAL_SECONDS = 5;

const BUTTON_TITLES = ['next', 'finish'] as const;
type ButtonTitle = (typeof BUTTON_TITLES)[number];

function QuizScreen() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
        number | null
    >(null);
    const [areAnswersDisabled, setAreAnswersDisabled] =
        useState<boolean>(false);
    const [buttonTitle, setButtonTitle] = useState<ButtonTitle>('next');
    const [countdownInterval, setCountdownInterval] =
        useState<NodeJS.Timeout | null>(null);
    const [countdownTimeLeft, setCountdownTimeLeft] = useState<number>(
        COUNTDOWN_TOTAL_SECONDS,
    );
    const [progress, setProgress] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<StringKey | null>(null);

    const { showModal } = useModal();

    useEffect(() => {
        getQuiz();

        return () => {
            if (countdownInterval === null) {
                return;
            }

            clearInterval(countdownInterval);
            setCountdownInterval(null);
        };
    }, []);

    const setNextQuestion = (): void => {
        if (quiz === null) {
            return;
        }

        const { questions } = quiz;

        if (currentQuestionIndex === questions.length - 2) {
            setButtonTitle('finish');
        }

        clearCountdown();
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const finishQuiz = (): void => {
        showModal(<Text>you are done!</Text>);
    };

    const submitButtonHandlers: Record<ButtonTitle, Function> = {
        next: setNextQuestion,
        finish: finishQuiz,
    };

    const getQuiz = async () => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const quiz = getQuizBySubjectName(selectedSubjectName);
        setQuiz(quiz);
    };

    const selectAnswer = (index: number): void => {
        setSelectedAnswerIndex(index);
        if (isSelectedAnswerCorrect(index)) {
            setErrorMessage(null);
            setAreAnswersDisabled(true);
            startCountdown();
        } else {
            setErrorMessage('Try again');
        }
    };

    const isSelectedAnswerCorrect = (index: number): boolean => {
        return index === quiz?.questions[currentQuestionIndex].correctAnswerId;
    };

    const getAnswerStyle = <T extends ViewStyle = ViewStyle>(
        index: number,
        success: T,
        failure: T,
    ): T | null => {
        return selectedAnswerIndex === index
            ? isSelectedAnswerCorrect(index)
                ? success
                : failure
            : null;
    };

    const startCountdown = (): void => {
        const interval = setInterval(() => {
            setCountdownTimeLeft((countdownTimeLeft) => countdownTimeLeft - 1);
            setProgress(countdownTimeLeft / COUNTDOWN_TOTAL_SECONDS);
        }, 1000);

        setCountdownInterval(interval);
    };

    const clearCountdown = (): void => {
        if (countdownInterval !== null) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }

        setSelectedAnswerIndex(null);
        setAreAnswersDisabled(false);
        setCountdownTimeLeft(COUNTDOWN_TOTAL_SECONDS);
        setProgress(0);
    };

    return (
        <Screen>
            <SubjectScreenTitle template="quizScreenTitle" />
            {quiz ? (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <AppStepCounter
                            step={currentQuestionIndex + 1}
                            total={quiz.questions.length ?? 0}
                        />
                        <View
                            style={[styles.questionContainer, STYLES.boxShadow]}
                        >
                            <Text
                                style={[
                                    STYLES.rightAlignedText,
                                    styles.question,
                                ]}
                            >
                                {quiz.questions[currentQuestionIndex].title}
                            </Text>
                        </View>
                        <View style={styles.answerList}>
                            {quiz.questions[
                                currentQuestionIndex
                            ].possibleAnswers.map(
                                (answer: string, index: number) => (
                                    <Pressable
                                        key={index}
                                        style={[
                                            styles.answerContainer,
                                            areAnswersDisabled &&
                                                STYLES.disabled,
                                            getAnswerStyle(
                                                index,
                                                styles.correctAnswerContainer,
                                                styles.wrongAnswerContainer,
                                            ),
                                        ]}
                                        onPress={() => selectAnswer(index)}
                                    >
                                        <Text
                                            style={[
                                                STYLES.rightAlignedText,
                                                styles.answer,
                                                getAnswerStyle<TextStyle>(
                                                    index,
                                                    styles.correctAnswer,
                                                    styles.wrongAnswer,
                                                ),
                                            ]}
                                        >
                                            {answer}
                                        </Text>
                                    </Pressable>
                                ),
                            )}
                        </View>
                        {errorMessage !== null && (
                            <Text
                                style={[
                                    STYLES.rightAlignedText,
                                    styles.errorMessage,
                                ]}
                            >
                                {translate(errorMessage)}
                            </Text>
                        )}
                    </View>
                    <Pressable
                        style={[
                            styles.submitButton,
                            selectedAnswerIndex === null ? STYLES.disabled : '',
                        ]}
                        onPress={() => submitButtonHandlers[buttonTitle]()}
                    >
                        <Text style={styles.submitButtonText}>
                            {translate(buttonTitle)}
                        </Text>
                    </Pressable>
                    {countdownInterval !== null && (
                        <AppHorizontalProgressBar
                            progress={progress}
                            duration={COUNTDOWN_TOTAL_SECONDS}
                        />
                    )}
                    <AppModal />
                </View>
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    questionContainer: {
        width: '100%',
        paddingVertical: verticalScale(48),
        paddingHorizontal: horizontalScale(32),
        borderRadius: moderateScale(20),
        marginBlockStart: verticalScale(8),
        marginBlockEnd: verticalScale(56),
        backgroundColor: COLORS.eggWhite,
    },
    question: {
        fontSize: TEXT.size.default * 1.125,
        fontWeight: 600,
    },
    answerList: {
        gap: verticalScale(16),
    },
    answerContainer: {
        paddingBlock: verticalScale(16),
        paddingInline: horizontalScale(16),
        borderRadius: moderateScale(20),
        backgroundColor: COLORS.eggWhite,
        borderWidth: 0.5,
        borderColor: COLORS.mainBackground,
    },
    correctAnswerContainer: {
        backgroundColor: COLORS.correctBackground,
    },
    correctAnswer: {
        color: COLORS.correctText,
    },
    wrongAnswerContainer: {
        backgroundColor: COLORS.wrongBackground,
    },
    wrongAnswer: {
        color: COLORS.wrongText,
    },
    answer: {
        fontSize: TEXT.size.default,
        fontWeight: 600,
    },
    errorMessage: {
        fontSize: TEXT.size.default,
        fontWeight: TEXT.weight.bold,
        color: COLORS.primary,
        paddingVertical: verticalScale(16),
    },
    submitButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingBlock: verticalScale(16),
        borderRadius: moderateScale(20),
    },
    submitButtonText: {
        fontSize: TEXT.size.smallHeadline,
        fontWeight: TEXT.weight.bold,
        color: COLORS.eggWhite,
    },
});

export default QuizScreen;
