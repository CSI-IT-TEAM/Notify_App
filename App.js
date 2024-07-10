import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SpinnerProvider } from '@store/Spinner';
import { BottomSheetProvider } from './src/store/BottomSheet';
import RootNavigator from '@routes/RootNavigator';

export default function App() {
    return (
        <RootSiblingParent>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <PaperProvider>
                        <SpinnerProvider>
                            <BottomSheetProvider>
                                <RootNavigator />
                            </BottomSheetProvider>
                        </SpinnerProvider>
                    </PaperProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </RootSiblingParent>
    );
}