import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from './BottomSheet';

export default function Layout({ children }) {
    return(
        <SafeAreaView 
            edges={['top', 'left', 'right']} 
        >
        <View style={styles.container}>
            {children}
        </View>
        </SafeAreaView>
    )
}

export { BottomSheet };

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
    },
 });
