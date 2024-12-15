import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
} from 'react-native';

type Props = {
    icon: ImageSourcePropType;
    style?: ImageStyle;
};

function AppUserIcon({ icon, style }: Props) {
    return <Image style={[styles.icon, style]} source={icon} />;
}

const styles = StyleSheet.create({
    icon: {
        width: horizontalScale(55),
        height: verticalScale(55),
        borderRadius: moderateScale(55),
    },
});

export default AppUserIcon;
