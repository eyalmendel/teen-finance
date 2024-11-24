import { COLORS } from '@config/colors';
import Constants from 'expo-constants';
import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

function Screen({ children }: PropsWithChildren) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.view}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 24 + Constants.statusBarHeight,
        paddingBottom: 24,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: COLORS.mainBackground,
    },
    view: {
        flex: 1,
    },
});

export default Screen;
