import AppNavigator from '@components/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from '@providers/ModalProvider';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, fontsError] = useFonts({
        'Assistant-Regular': require('./assets/fonts/Assistant/Assistant-Regular.ttf'),
        'Assistant-ExtraBold': require('./assets/fonts/Assistant/Assistant-ExtraBold.ttf'),
        'Assistant-Bold': require('./assets/fonts/Assistant/Assistant-Bold.ttf'),
        'Assistant-SemiBold': require('./assets/fonts/Assistant/Assistant-SemiBold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontsError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontsError]);

    if (!fontsLoaded && !fontsError) {
        return null;
    }

    return (
        <ModalProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </ModalProvider>
    );
}
