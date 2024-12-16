import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { translate } from '@services/language';
import { horizontalScale } from '@services/scale';

type Props = {
    time?: number;
};

function EstimatedTime({ time }: Props) {
    return (
        <View style={styles.estimatedTimeContainer}>
            <Text style={styles.estimatedTimeLabel}>{`${time ?? 0} ${translate(
                'minutes',
            )}`}</Text>
            <MaterialCommunityIcons
                style={styles.icon}
                name="clock-outline"
                color={COLORS.primary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    estimatedTimeContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignContent: 'center',
        gap: horizontalScale(4),
    },
    estimatedTimeLabel: {
        fontSize: TEXT.size.small,
        color: COLORS.primary,
    },
    icon: {
        alignSelf: 'center',
    },
});

export default EstimatedTime;
