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

const BUTTON_TITLES = ['next', 'finish'] as const;
type ButtonTitle = (typeof BUTTON_TITLES)[number];

function QuizScreen() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
        number | null
    >(null);
    const [buttonTitle, setButtonTitle] = useState<ButtonTitle>('next');

    const submitButtonHandlers: Record<ButtonTitle, Function> = {
        next: setNextQuestion,
        finish: finishQuiz,
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const getQuiz = async () => {
        const selectedSubjectName = getSelectedSubjectName();

        if (selectedSubjectName === null) {
            return;
        }

        const quiz = getQuizBySubjectName(selectedSubjectName);
        setQuiz(quiz);
    };

    const setPreviousQuestion = (): void => {
        if (quiz === null || currentQuestionIndex === 0) {
            return;
        }

        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const selectAnswer = (index: number): void => {
        setSelectedAnswerIndex(index);
        if (index === quiz?.questions[currentQuestionIndex].correctAnswerId) {
        }
    };

    const isSelectedAnswerCorrect = (index: number): boolean => {
        return index === quiz?.questions[currentQuestionIndex].correctAnswerId;
    };

    function setNextQuestion(): void {
        if (quiz === null) {
            return;
        }

        const { questions } = quiz;

        if (currentQuestionIndex === questions.length - 1) {
            console.log('Finished');
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
        }
    }

    function finishQuiz(): void {}

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
                                            selectedAnswerIndex === index
                                                ? isSelectedAnswerCorrect(index)
                                                    ? styles.correctAnswerContainer
                                                    : styles.wrongAnswerContainer
                                                : null,
                                        ]}
                                        onPress={() => selectAnswer(index)}
                                    >
                                        <Text
                                            style={[
                                                STYLES.rightAlignedText,
                                                styles.answer,
                                                selectedAnswerIndex === index
                                                    ? isSelectedAnswerCorrect(
                                                          index,
                                                      )
                                                        ? styles.correctAnswer
                                                        : styles.wrongAnswer
                                                    : null,
                                            ]}
                                        >
                                            {answer}
                                        </Text>
                                    </Pressable>
                                ),
                            )}
                        </View>
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
                </View>
            ) : null}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
