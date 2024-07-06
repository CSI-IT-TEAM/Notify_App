import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SpinnerProvider } from '@store/Spinner';
import RootNavigator from '@routes/RootNavigator';

export default function App() {
    return (
        <RootSiblingParent>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <PaperProvider>
                        <SpinnerProvider>
                            <RootNavigator />
                        </SpinnerProvider>
                    </PaperProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </RootSiblingParent>
    );
}