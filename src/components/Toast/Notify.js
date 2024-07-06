import Toast from 'react-native-root-toast';
import { StyleSheet, Text, View } from 'react-native';

export default function NotifyToast(type, title) {
    const getLayout = () => {
        switch (type) {
            case 'success':
                return (
                    <Text style={styles.title}>✅ {title}</Text>
                )
                break;
            case 'warn':
                return (
                    <Text style={styles.title}>⚠️ {title}</Text>
                )
                break;
            case 'error':
                return (
                    <Text style={styles.title}>❌ {title}</Text>
                )
                break;
            default:
                return (
                    <Text style={styles.title}>{title}</Text>
                )
        }
    }

    return (
        Toast.show(
            <View style={styles.container}>
                {getLayout()}
            </View>
            ,
            {
                duration: 500,
                position: Toast.positions.TOP,
                delay: 0,
                hideOnPress: true,
                shadow: false,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: '#000',
                opacity: 0.95,
                backgroundColor: 'F2F8FF'
            })
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#111',
        borderRadius: 10
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    }
});