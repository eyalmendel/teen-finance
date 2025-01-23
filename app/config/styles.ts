import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { TEXT } from './text';
import { moderateScale } from '@services/scale';

export const STYLES = StyleSheet.create({
    rightAlignedText: {
        textAlign: 'right',
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
    defaultText: {
        fontSize: moderateScale(TEXT.size.default),
        fontFamily: TEXT.font.assistantRegular,
        color: COLORS.primary,
    },
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
    },
    cardTitle: {
        fontSize: moderateScale(TEXT.size.large),
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
    },
    label: {
        fontSize: TEXT.size.default,
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
    },
});
