import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    step: number;
    total: number;
};

function AppStepCounter({ step, total }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {step}/{total}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        fontSize: TEXT.size.default,
        fontFamily: TEXT.font.assistantBold,
        color: COLORS.primary,
    },
});

export default AppStepCounter;
