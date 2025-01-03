import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { COLORS } from '@config/colors';
import { moderateScale, verticalScale } from '@services/scale';

type Props = {
    progress: number;
    durationInSeconds?: number;
};

function AppHorizontalProgressBar({ progress, durationInSeconds }: Props) {
    const [width, setWidth] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(width, {
            toValue: progress * 100,
            duration: durationInSeconds ? 1000 * durationInSeconds : 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const interpolatedWidth = width.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.progress, { width: interpolatedWidth }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(4),
        borderRadius: moderateScale(2),
        backgroundColor: COLORS.lightPurple,
        overflow: 'hidden',
    },
    progress: {
        height: verticalScale(4),
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(4),
    },
});

export default AppHorizontalProgressBar;
