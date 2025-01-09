import AppNavigator from '@components/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from '@providers/ModalProvider';

export default function App() {
    return (
        <ModalProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </ModalProvider>
    );
}
