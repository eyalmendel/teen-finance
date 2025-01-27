import { horizontalScale, moderateScale } from '@services/scale';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppImage from './AppImage';

type Props = {
    icon: string;
};

function AppUserIcon({ icon }: Props) {
    return <AppImage style={[styles.icon]} source={icon} />;
}

const styles = StyleSheet.create({
    icon: {
        width: horizontalScale(55),
        aspectRatio: 1,
        objectFit: 'contain',
    },
});

export default AppUserIcon;
