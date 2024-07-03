import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type StatusCardType = {
    title: string,
    desc: string,
    icon: string,
    color: string,
}

export default function StatusCard({ title, desc, icon, color }: StatusCardType) {
    return (
        <>
            <View style={[styles.container, { backgroundColor: `${color}`, }]}>
                <View style={styles.icon}>
                    <Icon name={icon} size={26} color={'#fff'} />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.desc}>10 {desc}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    icon: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    title: {
        fontWeight: '600',
        fontSize: 17,
        marginBottom: 3,
    },
    desc: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.5)',
    }
});