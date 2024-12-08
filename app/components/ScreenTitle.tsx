import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { moderateScale, verticalScale } from '@services/scale';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export type Props = {
    text: string;
};

function ScreenTitle({ text }: Props) {
    return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: moderateScale(TEXT.size.mediumHeadline),
        textAlign: 'center',
        fontWeight: TEXT.weight.extraBold,
        color: COLORS.primary,
        marginBottom: verticalScale(32),
    },
});

export default ScreenTitle;
