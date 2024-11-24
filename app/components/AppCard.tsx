import React from 'react';
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';

export type Props = {
    label: string;
    style: ViewStyle;
    onPress?: (event: GestureResponderEvent) => void;
};

function AppCard({ label, style, onPress }: Props) {
    return (
        <Pressable style={[style, styles.container]} onPress={onPress}>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },

    label: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'right',
    },
});

export default AppCard;
