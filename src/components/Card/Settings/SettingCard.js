import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from '@utils/i18n';

export default function SettingCard({ data, handleNavigate }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => handleNavigate(data.path)}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <View style={styles.btn}>
                    <Icon name={data.icon} size={24} />
                </View>
                <Text style={styles.title}>{i18n.t(data.name)}</Text>
            </View>
            <View style={[styles.btn, { backgroundColor: '#fff', width: 'auto', }]}>
                <Icon name='right' size={24} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#333',
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.75,
        shadowRadius: 0,
        elevation: 0,
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    btn: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#ededed',
    }
});