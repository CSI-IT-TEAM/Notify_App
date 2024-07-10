import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');

export default function EmptyCard({ type, title, desc }) {
    //// Init Variable
    const { t, i18n } = useTranslation();

    if(type === 'block'){
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={{ marginBottom: 15 }}>
                    <Image source={require('../../../../assets/images/icons/icon-block.png')}
                        style={{ width: 120, height: 120 }} />
                </View>
                <View style={{ width: width * 0.7, alignItems: 'center', marginBottom: 30 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                </View>
                <TouchableOpacity style={[styles.btn]} onPress={() => { }}>
                    <Text style={styles.btnTitle}>{t('btn_req')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ marginBottom: 15 }}>
                <Image source={require('../../../../assets/images/icons/icon-not-found.png')}
                    style={{ width: 150, height: 150 }} />
            </View>
            <View style={{ width: width * 0.7, alignItems: 'center', marginBottom: 30 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 5,
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'center'
    },
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: '#1565c0',
        justifyContent: 'center',
    },
    btnTitle: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    }
});