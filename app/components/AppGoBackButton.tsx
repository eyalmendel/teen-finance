import React from 'react';
import { GestureResponderEvent, ImageRequireSource, Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '@config/colors';
import { horizontalScale, verticalScale } from '@services/scale';
import AppImage from './AppImage';
import Icons from '@assets/icons';


type Props = {
    icon: ImageRequireSource;
    onPress: (event: GestureResponderEvent) => void;
};
//{ icon, onPress }: Props
export default function AppGoBackButton() {
    return (
        <View>
            {/*<Pressable style={styles.container} onPress={onPress}>*/}
            <AppImage
                style={styles.icon}
                source={Icons.goBack}
                contentFit="contain"
                contentPosition="center"
            />
            {/* </Pressable>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        aspectRatio: 1,
        borderRadius: 26,
        backgroundColor: COLORS.primary,
        
    },
    icon: {
        width: horizontalScale(24),
        height: verticalScale(24),
    },
});
