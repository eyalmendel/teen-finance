import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { COLORS } from '@config/colors';
import { moderateScale, verticalScale } from '@services/scale';

type Props = {
    progress: number;
    durationInSeconds?: number;
    height?: number | `${number}%` | null;
    onFinish?: () => void;
};

function AppHorizontalProgressBar({
    progress,
    durationInSeconds,
    height,
    onFinish,
}: Props) {
    const [width, setWidth] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(width, {
            toValue: progress * 100,
            duration: durationInSeconds ? 1000 * durationInSeconds : 500,
            useNativeDriver: false,
        }).start(onAnimationEnd);
    }, [progress]);

    const interpolatedWidth = width.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const onAnimationEnd = (event: { finished: boolean }): void => {
        if (event.finished && onFinish) {
            onFinish();
        }
    };

    return (
        <View style={[styles.container, { height }]}>
            <Animated.View
                style={[
                    styles.progress,
                    { width: interpolatedWidth },
                    { height },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: moderateScale(2),
        backgroundColor: COLORS.lightPurple,
        overflow: 'hidden',
    },
    progress: {
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(4),
    },
});

export default AppHorizontalProgressBar;
