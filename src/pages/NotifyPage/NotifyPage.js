import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import Layout, { BottomSheet } from '@components/Layout';
import Header from '@components/Header';
import NotifyMessageCard from '@components/Card/NotifyMessageCard';
import { fetchData } from '@function';
import { selectURL } from '@api';
import { useSpinner } from '@store/Spinner';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';

const DetailList = React.memo(({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={(item) => <NotifyMessageCard />}
            showsVerticalScrollIndicator={false}
        />
    )
})

export default function NotifyPage({ navigation }) {
    ///// Init Variable
    const [typeList, setTypeList] = useState(null);
    const [dataList, setDataList] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(true);
    const { dispatch } = useSpinner();
    const flatListRef = useRef();

    ///// Custom Hook
    const { t, i18n } = useTranslation();

    const [listData, setListData] = useState([
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'df' },
        { key: 'gf' },
        { key: 'Jaghghmes' },
    ])
    
    ///// Handle Scroll
    const scrollToIndex = (index: number) => {
        setType(type => index)
        flatListRef?.current?.scrollToIndex({
            animated: true,
            index: index,
            viewOffset: 10,
            viewPosition: 0.5
        });
    };

    useEffect(() => {
        const getUserInfo = async () => {
            dispatch({ type: 'show' });
            setLoading(loading => true);
            const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);

            let posData = await fetchData(selectURL, {
                'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.SELECT_ALARM_MENU_LIST',
                'V_P_QTYPE': 'Q',
                'V_P_EMPID': remenberInfo?.USER_ID ?? '',
                'OUT_CURSOR': ''
            });
            let _typeArray = posData.map(item => {
                return {
                    'ALARM_ID': item.ALARM_ID,
                    'ALARM_NAME': item.ALARM_NAME
                }
            });
            _typeArray.unshift({
                'ALARM_ID': 'ALL',
                'ALARM_NAME': 'All'
            });

            setTypeList(typeList => _typeArray);
            setLoading(loading => false);
            dispatch({ type: 'hidden' });
        }

        const unsubscribe = navigation.addListener('focus', async () => {
            getUserInfo();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <>
            <Layout>
                <Header type='setting' title={t('today')} />
            </Layout>
            <View style={{ flex: 1, marginTop: 15, }}>
                <View style={{ marginBottom: 10 }}>
                    <FlatList
                        ref={flatListRef}
                        initialScrollIndex={type}
                        style={{ flexGrow: 0, }}
                        data={typeList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 15 }}
                        keyExtractor={(item) => item.ALARM_ID}
                        renderItem={({ item, index: fIndex }) => (
                            <TouchableOpacity
                                onPress={() => scrollToIndex(fIndex)}
                                style={[
                                    styles.btn,
                                    {
                                        backgroundColor: fIndex === type ? '#f26e56' : '#ededed',
                                    }
                                ]}>
                                <Text style={[styles.title, { color: fIndex === type ? '#fff' : '#333', }]}>{item.ALARM_NAME}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.listContainer}>
                    <DetailList data={listData} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    btn: {
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    }
});