import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icons from '@assets/icons';
import { TEXT } from '@config/text';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import AppImage from './AppImage';

function EmptyState() {
    return (
        <View style={styles.container}>
            <AppImage style={styles.image} source={Icons.error} />
            <Text style={styles.message}>
                {translate('missingDataErrorMessage')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: verticalScale(32),
        width: '100%',
    },
    image: {
        width: horizontalScale(150),
        aspectRatio: 1,
    },
    message: {
        fontSize: moderateScale(TEXT.size.smallHeadline),
        fontFamily: TEXT.font.assistantBold,
    },
});

export default EmptyState;
