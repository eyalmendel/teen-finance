import React from 'react';
import { GestureResponderEvent, View, StyleSheet } from 'react-native';
import ScreenTitle from './ScreenTitle';
import AppGoBackButton from './AppGoBackButton';
import { verticalScale } from '@services/scale';

type Props = {
    //onPress: (event: GestureResponderEvent) => void;
    text: string;
};
// <AppRoundButton icon={Icons.repeat} onPress={onPress} />
export default function AppHeadline({ text  }: Props) {
    return (
        <View style={styles.container}>
            <ScreenTitle text={text}></ScreenTitle>
            <AppGoBackButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'flex-end',
            gap: 16,
            alignSelf: 'stretch',
            alignItems: 'center',
            marginBottom: verticalScale(32)
        },
    });
