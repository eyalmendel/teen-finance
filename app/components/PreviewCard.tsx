import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    ViewStyle,
} from 'react-native';

import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { COLORS } from '@config/colors';
import { STYLES } from '@config/styles';

export type Props = {
    style: ViewStyle;
    children: JSX.Element;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
};

function PreviewCard({ style, children, onPress, disabled = false }: Props) {
    return (
        <Pressable
            style={[styles.container, STYLES.boxShadow, style]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: horizontalScale(250),
        height: verticalScale(120),
        paddingInline: horizontalScale(24),
        borderRadius: moderateScale(16),
        backgroundColor: COLORS.eggWhite,
    },
});

export default PreviewCard;
