import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { moderateScale, verticalScale } from '@services/scale';
import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

export type Props = {
    text: string;
    style?: TextStyle;
};

function ScreenTitle({ text, style }: Props) {
    return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontFamily: TEXT.font.assistantExtraBold,
        fontSize: moderateScale(TEXT.size.smallHeadline),
        textAlign: 'center',
        color: COLORS.primary,
    },
});

export default ScreenTitle;
