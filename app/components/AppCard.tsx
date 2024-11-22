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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },

    label: {
        fontSize: 14,
    },
});

export default AppCard;
