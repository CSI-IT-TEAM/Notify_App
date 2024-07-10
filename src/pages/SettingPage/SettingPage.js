import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import Layout from '@components/Layout';
import Header from '@components/Header';
import SettingCard from '@components/Card/Settings';
import AvatarBox from '@components/AvatarBox';
import NotifyToast from '@components/Toast';
import { settingsList } from '@data';
import { getAuthUserConfig } from '@utils/config';
import { storeKeyConfig, getData, getDataObject, removeData } from '@utils/storage';
import { useSpinner } from '@store/Spinner';
import { selectURL } from '@api';
import { getLastTwoWords, fetchData, isNullOrEmpty } from '@function';
import { useExpoNotify, useNetwork } from '@hooks';

export default function SettingPage({ navigation }) {
    ///// Init Variable
    const [data, setData] = useState(null);
    const { dispatch } = useSpinner();

    ///// Custom Hook
    const { expoPushToken } = useExpoNotify();
    const { netStatus } = useNetwork();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const getUserInfo = async() => {
            const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);
            setData(data => remenberInfo || null);
        }

        const unsubscribe = navigation.addListener('focus', async() => {
            getUserInfo();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    //// Handle Navigate
    const handleNavigate = async (pathName: string) => {
        if (pathName === 'SigninPage') {
            //// Check Internet Status
            if (!netStatus) {
                NotifyToast(type = 'error', title = t('no_internet'));
                return;
            }
            //// Update Data
            const userData = await getDataObject(storeKeyConfig.REMEMBER_INFO);
            let checkLoginData = await fetchData(selectURL, getAuthUserConfig('LOGOUT', userData?.USER_ID, expoPushToken, userData?.USER_LOGIN_DATE));

            if(!isNullOrEmpty(checkLoginData)){
                await removeData(storeKeyConfig.USER_INFO);
                dispatch({ type: 'invalidUser' });
                navigation.navigate(pathName);
            }
        }
        else {
            navigation.navigate(pathName);
        }
    }

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.thumb}>
                    <AvatarBox size={150} thumb={data?.USER_IMG} type={data?.USER_IMG_TYPE} />
                    {/* <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('AvatarPage')}>
                        <Icon name="image" size={28} color='#555' />
                    </TouchableOpacity> */}
                </View>
                <Text style={styles.title}>{data?.USER_NM}</Text>
                <Text style={styles.desc}>@{data?.USER_JOB}</Text>
            </View>
            {settingsList.map(item => {
                return (
                    <SettingCard key={item.id} data={item} handleNavigate={handleNavigate} />
                )
            })}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    thumb: {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#ededed',
        padding: 5,
        marginBottom: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 2,
        opacity: 0.8,
    },
    desc: {
        color: '#858585',
    },
    btn: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#ededed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    }
});