import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AppHorizontalProgressBar from '@components/AppHorizontalProgressBar';
import AppModal from '@components/AppModal';
import AppStepCounter from '@components/AppStepCounter';
import QuizAnswer from '@components/QuizAnswer';
import QuizCompletedModal from '@components/QuizCompletedModal';
import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { COLORS } from '@config/colors';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import { StringKey } from '@config/strings';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import { ModalAction } from '@context/modalContext';
import { useModal } from '@hooks/useModal';
import { Quiz } from '@models/quiz';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getQuizBySubjectName } from '@services/data';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { getSelectedSubjectName } from '@services/state';

const COUNTDOWN_TOTAL_SECONDS = 5;

const BUTTON_TITLES = ['check', 'next', 'finish'] as const;
type ButtonTitle = (typeof BUTTON_TITLES)[number];

type Props = NativeStackScreenProps<AppRoutesParamList, RouteNames.QUIZ>;

function QuizScreen({ navigation }: Props) {
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
    const [areAnswersDisabled, setAreAnswersDisabled] =
        useState<boolean>(false);

    const { showModal, hideModal } = useModal();

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
        clearCountdown();
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setErrorMessage(null);
        setButtonTitle('check');
        setIsChecking(false);
        setAreAnswersDisabled(false);
    };

    const finishQuiz = (): void => {
        showModal(
            <QuizCompletedModal
                correctAnswersCount={correctAnswersCount}
                totalCount={quiz?.questions.length ?? 0}
                onAction={handleCompleteModalAction}
            />,
            true,
        );
        clearCountdown();
    };

    const handleCompleteModalAction = (action: ModalAction): void => {
        switch (action) {
            case 'repeat':
                restart();
                break;
            case 'next':
                navigation.navigate(RouteNames.QUIZ_ANSWER_SUMMARY, {
                    summary: quiz!.questions.map(
                        ({ title, correctAnswerId, possibleAnswers }) => ({
                            question: title,
                            correctAnswer: possibleAnswers[correctAnswerId],
                        }),
                    ),
                });
                restart();
                break;
        }

        hideModal();
    };

    const checkIfCorrect = (index: number): void => {
        if (isAnswerCorrect(index)) {
            setErrorMessage(null);
            setCorrectAnswersCount(
                (correctAnswersCount) => correctAnswersCount + 1,
            );
            setAreAnswersDisabled(true);
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

    const restart = (): void => {
        setCurrentQuestionIndex(0);
        setButtonTitle('check');
        setCorrectAnswersCount(0);
        setIsChecking(false);
        setErrorMessage(null);
        setAreAnswersDisabled(false);
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
                                        isDisabled={areAnswersDisabled}
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
                        {countdownInterval !== null && (
                            <View style={styles.progressBarContainer}>
                                <AppHorizontalProgressBar
                                    progress={progress}
                                    durationInSeconds={COUNTDOWN_TOTAL_SECONDS}
                                    height={'100%'}
                                    onFinish={() =>
                                        submitButtonHandlers[buttonTitle]()
                                    }
                                />
                            </View>
                        )}
                        <Text style={styles.submitButtonText}>
                            {translate(buttonTitle)}
                        </Text>
                    </Pressable>
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
        height: verticalScale(60),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(20),
        position: 'relative',
        overflow: 'hidden',
    },
    progressBarContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    submitButtonText: {
        fontSize: TEXT.size.smallHeadline,
        fontWeight: TEXT.weight.bold,
        color: COLORS.eggWhite,
    },
});

export default QuizScreen;
