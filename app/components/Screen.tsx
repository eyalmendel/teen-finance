import { COLORS } from '@config/colors';
import { horizontalScale, verticalScale } from '@services/scale';
import ModalProvider from 'app/providers/ModalProvider';
import Constants from 'expo-constants';
import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

function Screen({ children }: PropsWithChildren) {
    return (
        <ModalProvider>
            <SafeAreaView style={styles.screen}>
                <View style={styles.view}>{children}</View>
            </SafeAreaView>
        </ModalProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: verticalScale(24) + Constants.statusBarHeight,
        paddingBottom: verticalScale(24),
        paddingHorizontal: horizontalScale(20),
        flex: 1,
        backgroundColor: COLORS.mainBackground,
    },
    view: {
        flex: 1,
    },
});

export default Screen;
