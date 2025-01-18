import React from 'react';
import { GestureResponderEvent, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '@config/colors';
import { horizontalScale, verticalScale } from '@services/scale';
import AppImage from './AppImage';
import Icons from '@assets/icons';

type Props = {
    onPress: (event: GestureResponderEvent) => void;
};

export default function AppGoBackButton({ onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
            <AppImage
                style={styles.icon}
                source={Icons.goBack}
                contentFit="contain"
                contentPosition="center"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: horizontalScale(24),
        height: verticalScale(24),
    },
});
