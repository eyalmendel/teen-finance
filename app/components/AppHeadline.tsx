import React from 'react';
import { GestureResponderEvent, View, StyleSheet } from 'react-native';
import ScreenTitle from './ScreenTitle';
import AppGoBackButton from './AppGoBackButton';
import { verticalScale } from '@services/scale';

type Props = {
    onPress?: (event: GestureResponderEvent) => void;
    text: string;
    showIcon?: boolean;
};

export default function AppHeadline({ text, onPress, showIcon = true }: Props) {
    return (
        <View style={[styles.container, !showIcon && styles.centerTitle]}>
            <ScreenTitle text={text}></ScreenTitle>
            {showIcon && onPress && <AppGoBackButton onPress={onPress} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'flex-end',
        gap: 16,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: verticalScale(32)
    },

    centerTitle: {
        justifyContent: 'center',
    },
});
