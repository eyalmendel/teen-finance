import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    Text,
    ViewStyle,
} from 'react-native';

import { COLORS } from '@config/colors';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import { STYLES } from '@config/styles';

export type Props = {
    style: ViewStyle;
    children: JSX.Element;
    onPress?: (event: GestureResponderEvent) => void;
};

function PreviewCard({ style, children, onPress }: Props) {
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
        // margin: 'auto',
        borderRadius: moderateScale(16),
        paddingVertical: verticalScale(16),
        paddingHorizontal: horizontalScale(24),
        backgroundColor: COLORS.eggWhite,
    },
});

export default PreviewCard;
