import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from './ScreenTitle';
import AppGoBackButton from './AppGoBackButton';
import { verticalScale } from '@services/scale';

type Props = {
    text: string;
    showIcon?: boolean;
    style?: TextStyle;
};

export default function AppHeadline({ text, style, showIcon = true }: Props) {
    const navigation = useNavigation();
    const titleStyle = { ...styles.title, ...style };

    return (
        <View style={[styles.container, !showIcon && styles.centerTitle]} >
            <ScreenTitle text={text} style={titleStyle} />
            {showIcon && (<AppGoBackButton onPress={() => navigation.goBack()} />)}
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
        marginBottom: verticalScale(32),
    },
    centerTitle: {
        justifyContent: 'center',
    },

    title: {
        flexShrink: 1,
        flexWrap: 'wrap', 
    },
});
