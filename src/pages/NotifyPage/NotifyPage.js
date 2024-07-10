import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SectionList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Layout from '@components/Layout';
import Header from '@components/Header';
import NotifyMessageCard from '@components/Card/NotifyMessage';
import EmptyCard from '@components/Card/Empty';
import { fetchData, isNullOrEmpty } from '@function';
import { selectURL } from '@api';
import { useSpinner } from '@store/Spinner';
import { useBottomSheetModal } from '@store/BottomSheet';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';

const DetailList = ({ data, refresh, onClick, onRefresh }) => {
    ///// Custom Hook
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();

    return (
        <SectionList
            sections={data}
            keyExtractor={(item) => item.ALARM_UUID}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 15, marginTop: data.length === 1 ? 0 : title === 'today' ? 0 : 15 }}>{t(title)}</Text>
            )}
            renderItem={({ item }) => <NotifyMessageCard data={item} onClick={onClick} />}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
        />
    )
}

function filterList(dataList, tabList, tabIDx) {
    if (isNullOrEmpty(dataList) || isNullOrEmpty(tabList)) return null;
    let _dataType = tabList[tabIDx]?.ALARM_ID;
    let _resultArray = _dataType === 'ALL' ? dataList : dataList.filter(item => item.ALARM_ID === _dataType);
    let _todayList = _resultArray.filter(item => item.IS_TODAY === 'Y');
    let _otherList = _resultArray.filter(item => item.IS_TODAY === 'N');
    let _sectionList = [];

    if(isNullOrEmpty(_todayList) && isNullOrEmpty(_otherList)) return null;
    if(!isNullOrEmpty(_todayList)){
        _sectionList.push({
            title: 'today',
            data: _todayList,
        })
    }

    if(!isNullOrEmpty(_otherList)){
        _sectionList.push({
            title: 'prev_date',
            data: _otherList,
        })
    }

    return _sectionList;
}

export default function NotifyPage({ navigation }) {
    ///// Init Variable
    const [typeList, setTypeList] = useState(null);
    const [dataList, setDataList] = useState(null);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { state, dispatch } = useSpinner();
    const { dispatchBottomSheet } = useBottomSheetModal();

    ///// Custom Hook
    const { t, i18n } = useTranslation();
    const flatListRef = useRef();
    const sheetRef = useRef(null);
    const filterData = useMemo(() => filterList(dataList, typeList, type), [dataList, typeList, type]);

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

            let getData = await fetchData(selectURL, {
                'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.SELECT_ALARM_LIST',
                'V_P_QTYPE': 'U',
                'V_P_EMPID': remenberInfo?.USER_ID ?? '',
                'OUT_CURSOR': ''
            });

            setDataList(dataList => getData);
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

    //// Handle Notify Click
    const handleClick = useCallback((itemKey) => {
        let _searchData = dataList.filter(item => item.ALARM_UUID === itemKey)[0];
        dispatchBottomSheet({ type: 'showModal', payload: _searchData });
    }, [dataList]);

    //// Handle Refresh
    const handleRefresh = async() => {
        setRefreshing(true);

        const remenberInfo = await getDataObject(storeKeyConfig.REMEMBER_INFO);
        let getData = await fetchData(selectURL, {
            'PROCEDURE': 'LMES.PKG_ALARM_UPLOAD.SELECT_ALARM_LIST',
            'V_P_QTYPE': 'U',
            'V_P_EMPID': remenberInfo?.USER_ID ?? '',
            'OUT_CURSOR': ''
        });
        setDataList(dataList => getData);

        setTimeout(() => {
          setRefreshing(false);
        }, 500); // Refresh indicator will be visible for at least 1 second
    }

    return (
        <>
            <Layout>
                <Header type='setting' title={t('notify')} />
            </Layout>
            <View style={{ flex: 1, marginTop: 5, }}>
                {!isNullOrEmpty(flatListRef) && flatListRef.length > 2 &&
                    <View style={{ marginBottom: 25 }}>
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
                }
                <View style={styles.listContainer}>
                    {state.visible ? (
                        <></>
                    ) : isNullOrEmpty(filterData) ? (
                        <EmptyCard 
                            title={t('not_found_title')} 
                            desc={t('not_found_desc')} 
                        />
                    ) : (
                        <DetailList 
                            data={filterData} 
                            refresh={refreshing}
                            onClick={handleClick} 
                            onRefresh={handleRefresh}
                        />
                    )}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
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