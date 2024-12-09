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
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        flex: 1,
    },
    view: {
        // borderWidth: 1,
        flex: 1,
    },
});

export default Screen;
