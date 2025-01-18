import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenTitle from './ScreenTitle';
import AppGoBackButton from './AppGoBackButton';
import { verticalScale } from '@services/scale';

type Props = {
    text: string;
    showIcon?: boolean;
};

export default function AppHeadline({ text, showIcon = true }: Props) {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, !showIcon && styles.centerTitle]} >
            <ScreenTitle text={text} />
            {showIcon && (
                <AppGoBackButton onPress={() => navigation.goBack()} />
            )}
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
        marginBottom: verticalScale(20),
    },
    centerTitle: {
        justifyContent: 'center',
    },
});
