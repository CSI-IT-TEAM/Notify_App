import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Avatar } from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';
import { getLastTwoWords } from '@function';
import i18n from '@utils/i18n';
import AvatarBox from '@components/AvatarBox';

type HeaderType = {
    type?: string,
    title?: string,
    handleNavigate: () => void
}

export default function Header({ type, title, handleNavigate }: HeaderType) {
    ///// Init Variable
    const [data, setData] = useState(null);
    const name = data ? getLastTwoWords(data?.USER_NM) : 'Guest';
    const thumb = data?.USER_IMG || null;
    const thumbType = data?.USER_IMG_TYPE || '';

    const navigation = useNavigation();

    useEffect(() => {
        const getUserInfo = async() => {
            const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);
            setData(data => remenberInfo || null);
        }
        getUserInfo();

        const unsubscribe = navigation.addListener('focus', async() => {
            getUserInfo();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    if (type === 'Home') {
        return (
            <View style={styles.dFlex}>
                <View style={styles.dFlexCenter}>
                    <View>
                        <Text style={styles.title}>{i18n.t('hello')}, {name} 👋</Text>
                        <Text style={styles.desc}>{i18n.t('slogan')}</Text>
                    </View>
                </View>
                <AvatarBox size={60} thumb={thumb} type={thumbType}/>
            </View>
        )
    }
    else if (type === 'Authenticate') {
        return (
            <View>
                <View style={styles.dFlexTop}>
                    <View>
                        <Text style={styles.title}>{i18n.t('welcome')} 👋</Text>
                        <Text style={styles.desc}>{i18n.t('notify_login')}</Text>
                    </View>
                </View>
            </View>
        )
    }
    else if (type === 'setting') {
        return (
            <View style={[styles.dFlex]}>
                <TouchableOpacity style={[styles.btn, { opacity: 0 }]} onPress={handleNavigate}>
                    <AntIcon name="left" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.btn}>
                    <EntypoIcon name="dots-three-vertical" size={24} />
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={[styles.dFlex]}>
                <TouchableOpacity style={styles.btn} onPress={handleNavigate}>
                    <AntIcon name="left" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View style={[styles.btn, { opacity: 0 }]}>
                    <AntIcon name="left" size={24} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    dFlexCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7
    },
    dFlexTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
    },
    title: {
        fontWeight: '700',
        fontSize: 26,
        marginBottom: 2,
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        color: '#858585',
        textShadow: '-1px 1px 10px rgba(0, 0, 0)'
    },
    btn: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#ededed',
    }
});