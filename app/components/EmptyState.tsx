import { TEXT } from '@config/text';
import { translate } from '@services/language';
import { horizontalScale, moderateScale, verticalScale } from '@services/scale';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function EmptyState() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('@assets/icons/error.png')}
            />
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
        fontWeight: TEXT.weight.bold,
    },
});

export default EmptyState;
