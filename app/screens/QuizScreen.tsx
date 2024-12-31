import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
import QuizCompletedModal from '@components/QuizCompletedModal';

const COUNTDOWN_TOTAL_SECONDS = 5;

const BUTTON_TITLES = ['check', 'next', 'finish'] as const;
type ButtonTitle = (typeof BUTTON_TITLES)[number];

function QuizScreen() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [correctAnswerIndices, setCorrectAnswerIndices] = useState<number[]>(
        [],
    );
    const [buttonTitle, setButtonTitle] = useState<ButtonTitle>('check');
    const [countdownInterval, setCountdownInterval] =
        useState<NodeJS.Timeout | null>(null);
    const [countdownTimeLeft, setCountdownTimeLeft] = useState<number>(
        COUNTDOWN_TOTAL_SECONDS,
    );
    const [progress, setProgress] = useState<number>(0);

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
        number | null
    >(null);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<StringKey | null>(null);
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

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

    const getQuiz = async () => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const quiz = getQuizBySubjectName(selectedSubjectName);
        setQuiz(quiz);
        setCorrectAnswerIndices(
            quiz.questions.map((question) => question.correctAnswerId),
        );
    };

    const handleInitialCheck = (): void => {
        checkIfCorrect(selectedAnswerIndex!);

        const { questions } = quiz!;
        if (currentQuestionIndex === questions.length - 1) {
            setButtonTitle('finish');
        } else {
            setButtonTitle('next');
        }
        setIsChecking(true);
    };

    const setNextQuestion = (): void => {
        if (quiz === null) {
            return;
        }

        clearCountdown();
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setErrorMessage(null);
        setButtonTitle('check');
        setIsChecking(false);
    };

    const finishQuiz = (): void => {
        showModal(
            <QuizCompletedModal
                correctAnswersCount={correctAnswersCount}
                totalCount={quiz?.questions.length ?? 0}
            />,
            false,
        );
        clearCountdown();
    };

    const checkIfCorrect = (index: number): void => {
        if (isAnswerCorrect(index)) {
            setErrorMessage(null);
            setCorrectAnswersCount(
                (correctAnswersCount) => correctAnswersCount + 1,
            );
            startCountdown();
        } else {
            setErrorMessage('Try again');
        }
    };

    const submitButtonHandlers: Record<ButtonTitle, Function> = {
        check: handleInitialCheck,
        next: setNextQuestion,
        finish: finishQuiz,
    };

    const selectAnswer = (index: number): void => {
        setSelectedAnswerIndex(index);
        if (isChecking) {
            checkIfCorrect(index);
        }
    };

    const isAnswerCorrect = (index: number): boolean => {
        return index === correctAnswerIndices[currentQuestionIndex];
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
                                    <QuizAnswer
                                        key={index}
                                        text={answer}
                                        shouldMark={isChecking}
                                        isSelected={
                                            selectedAnswerIndex === index
                                        }
                                        isCorrect={isAnswerCorrect(index)}
                                        onSelection={() => selectAnswer(index)}
                                    />
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
