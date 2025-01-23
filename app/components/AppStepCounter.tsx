import { COLORS } from '@config/colors';
import { TEXT } from '@config/text';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { STYLES } from '@config/styles';

type Props = {
    step: number;
    total: number;
};

function AppStepCounter({ step, total }: Props) {
    return (
        <View style={styles.container}>
            <Text style={STYLES.label}>
                {step}/{total}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default AppStepCounter;
