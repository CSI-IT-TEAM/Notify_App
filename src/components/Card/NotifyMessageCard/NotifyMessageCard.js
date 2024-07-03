import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function NotifyMessageCard() {
    return (
        <View style={[styles.container]}>
            <View style={styles.contentContainer}>
                <Avatar.Image size={50} source={require('../../../../assets/images/avatars/avatar-10.png')} />
                <View>
                    <Text style={styles.title}>SCADA Warining</Text>
                    <Text style={[styles.desc]}>SCADA Warining</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 20,
        gap: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    desc: {
        fontWeight: '500',
        fontSize: 12,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)',
        color: '#858585'
    },
    deleteButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        backgroundColor: 'red',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
});