import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { translate } from '@services/language';
import { TEXT } from '@config/text';
import { COLORS } from '@config/colors';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    correctAnswersCount: number;
    totalCount: number;
};

export default function QuizCompletedModal({
    correctAnswersCount,
    totalCount,
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
                    <Pressable style={styles.reviewButton}>
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
                        <Pressable style={styles.roundButton}>
                            {/* <Image
                                style={styles.roundButtonIcon}
                                source={require('@assets/icons/repeat.png')}
                            /> */}
                        </Pressable>
                        <Pressable style={styles.roundButton}>
                            <Image
                                style={styles.roundButtonIcon}
                                source={require('@assets/icons/home.png')}
                            />
                        </Pressable>
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
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: COLORS.primary,
    },
    roundButtonIcon: {
        width: horizontalScale(16),
        height: verticalScale(16),
    },
});
