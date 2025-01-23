import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '@components/Screen';
import SubjectScreenTitle from '@components/SubjectScreenTitle';
import { AppRoutesParamList, RouteNames } from '@config/routes';
import AppStepCounter from '@components/AppStepCounter';
import QuizAnswer from '@components/QuizAnswer';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';
import { TEXT } from '@config/text';
import AppHomeButton from '@components/AppHomeButton';
import AppRepeatButton from '@components/AppRepeatButton';

type Props = NativeStackScreenProps<
    AppRoutesParamList,
    RouteNames.QUIZ_ANSWER_SUMMARY
>;

export default function QuizAnswerSummaryScreen({ navigation, route }: Props) {
    const { summary } = route.params;

    return (
        <Screen>
            <SubjectScreenTitle template="quizScreenTitle" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.summaryList}
            >
                {summary.map(({ question, correctAnswer }, index) => (
                    <View key={index} style={styles.summaryEntryContainer}>
                        <AppStepCounter
                            step={index + 1}
                            total={summary.length}
                        />
                        <View
                            style={[styles.questionContainer, STYLES.boxShadow]}
                        >
                            <Text
                                style={[
                                    styles.questionText,
                                    STYLES.rightAlignedText,
                                ]}
                            >
                                {question}
                            </Text>
                        </View>
                        <QuizAnswer
                            text={correctAnswer}
                            isSelected={true}
                            isCorrect={true}
                            shouldMark={true}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.actionButtonsContainer}>
                <AppRepeatButton
                    onPress={() => navigation.navigate(RouteNames.QUIZ)}
                />
                <AppHomeButton />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    summaryList: {
        paddingInline: horizontalScale(2),
        marginBlockEnd: verticalScale(52),
        gap: moderateScale(16),
    },
    summaryEntryContainer: {
        gap: moderateScale(8),
    },
    questionContainer: {
        paddingBlock: verticalScale(16),
        paddingInline: horizontalScale(16),
        borderRadius: moderateScale(20),
        backgroundColor: COLORS.eggWhite,
    },
    questionText: {
        fontSize: TEXT.size.medium,
        fontFamily: TEXT.font.assistantSemiBold,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: horizontalScale(24),
        marginBlockStart: verticalScale(40),
    },
});
