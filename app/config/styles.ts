import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const STYLES = StyleSheet.create({
    rightAlignedText: {
        textAlign: 'right',
    },
    boxShadow: {
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
    },
});
