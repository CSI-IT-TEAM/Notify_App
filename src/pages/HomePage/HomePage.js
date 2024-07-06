import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { useTranslation } from 'react-i18next';

import Header from '@components/Header';
import Layout, { BottomSheet } from '@components/Layout';
import StatusCard from '@components/Card/StatusCard';
import NotifyCard from '@components/Card/NotifyCard';
import NotifyToast from '@components/Toast';
import { fetchData, isNullOrEmpty, checkValidToken } from '@function';
import { statusList } from '@data';
import { selectURL } from '@api';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';
import { getUpdateUserAlarmConfig } from '@utils/config';
import { useSpinner } from '@store/Spinner';
import { useExpoNotify, useNetwork } from '@hooks';

const { width, height } = Dimensions.get('screen');

const NotifyList = ({ data, loading, expoPushToken, handleUpdate }) => {
    //// Init Variable
    const { t, i18n } = useTranslation();

    if(loading){
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (expoPushToken === '__') {
        return (
            <>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={{ marginBottom: 15 }}>
                        <Image source={require('../../../assets/images/icons/icon-block.png')}
                            style={{ width: 120, height: 120 }} />
                    </View>
                    <View style={{ width: width * 0.7, alignItems: 'center', marginBottom: 30 }}>
                        <Text style={styles.reqTitle}>{t('permis_req_title')}</Text>
                        <Text style={styles.reqDesc}>{t('permis_req_desc')}</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn]} onPress={() => { }}>
                        <Text style={styles.btnTitle}>{t('btn_req')}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.ALARM_ID}
            renderItem={({ item }) => <NotifyCard data={item} onUpdate={handleUpdate} />}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default function HomePage({ navigation }) {
    ///// Init Variable
    const [dataList, setDataList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [empID, setEmpID] = useState('');
    const regQty = dataList ? dataList.filter(item => item?.IS_REGISTER === 'Y').length : 0;
    const { dispatch } = useSpinner();

    ///// Custom Hook
    const { expoPushToken } = useExpoNotify();
    const { netStatus } = useNetwork();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(loading => true);
            const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);
            let posData = await fetchData(selectURL, {
                'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.SELECT_ALARM_MENU_LIST',
                'V_P_QTYPE': 'Q',
                'V_P_EMPID': remenberInfo?.USER_ID ?? '',
                'OUT_CURSOR': ''
            });

            setEmpID(empID => remenberInfo?.USER_ID ?? '');
            setDataList(dataList => posData);
            setLoading(loading => false);
        }

        const unsubscribe = navigation.addListener('focus', async () => {
            getUserInfo();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    //// Handle Update
    const handleUpdate = async (itemID, itemReg) => {
        //// Check Internet Status
        if (!netStatus) {
            NotifyToast(type = 'error', title = t('no_internet'));
            return;
        }

        //// Check User Token Expire
        dispatch({ type: 'show' });
        const userInfo = await getDataObject(storeKeyConfig.USER_INFO);
        const postData = await checkValidToken(userInfo?.token?.token);

        if (!postData) {
            await removeData(storeKeyConfig.USER_INFO);
            dispatch({ type: 'hidden' });
            dispatch({ type: 'invalidUser' });
            navigation.navigate('SigninPage');
        }

        //// Update Data
        let posData = await fetchData(selectURL, getUpdateUserAlarmConfig(empID, itemID, itemReg === 'Y' ? 'OFF' : 'ON'));

        if (posData && !isNullOrEmpty(posData) && posData[0].STATUS === 'OK') {
            setDataList(dataList.map(item => {
                if (item.ALARM_ID === itemID) {
                    // Create a *new* object with changes
                    return { ...item, IS_REGISTER: itemReg === 'Y' ? 'N' : 'Y' };
                } else {
                    // No changes
                    return item;
                }
            }));
            dispatch({ type: 'hidden' });
            NotifyToast(type = 'success', title = t('update_success'));
        }
        else {
            dispatch({ type: 'hidden' });
            NotifyToast(type = 'warn', title = t('update_fail'));
        }
    }

    //// Get Base Value
    const getBaseValue = (keyCD) => {
        let _result = 0;

        switch (keyCD) {
            case 'status-1':
                _result = dataList?.length;
                break;
            case 'status-2':
                _result = regQty;
                break;
            default:
                break;
        }

        return _result;
    }

    return (
        <>
            <Layout>
                <Header type='Home' />
            </Layout>
            <View style={styles.statusContainer}>
                <FlatGrid
                    itemDimension={150}
                    data={statusList}
                    renderItem={({ item }) => (
                        <StatusCard
                            key={item.id}
                            data={item}
                            value={getBaseValue(item.id)}
                        />
                    )}
                />
            </View>
            <BottomSheet>
                <View style={styles.notifyContainer}>
                    <Text style={styles.title}>{t('notify_list')}</Text>
                </View>
                <NotifyList
                    data={dataList}
                    loading={loading}
                    expoPushToken={expoPushToken}
                    handleUpdate={handleUpdate}
                />
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    statusContainer: {
        marginTop: 5,
    },
    notifyContainer: {
        paddingTop: 20,
        paddingBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15,
    },
    reqTitle: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 5,
    },
    reqDesc: {
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