import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Layout, { BottomSheet } from '@components/Layout';
import Header from '@components/Header';
import NotifyMessageCard from '@components/Card/NotifyMessageCard';

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

    const [type, setType] = useState(0);
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
    const flatListRef = useRef();

    const handleBack = () => {
        navigation.goBack();
    }

    const scrollToIndex = (index: number) => {
        setType(type => index)
        flatListRef?.current?.scrollToIndex({
            animated: true,
            index: index,
            viewOffset: 10,
            viewPosition: 0.5
        });
    };

    return (
        <>
            <Layout>
                <Header type='setting' title='Today' />
            </Layout>
            <View style={{ flex: 1, marginTop: 15, }}>
                <View style={{ marginBottom: 10 }}>
                    <FlatList
                        ref={flatListRef}
                        initialScrollIndex={type}
                        style={{ flexGrow: 0, }}
                        data={[
                            { key: 'Devin' },
                            { key: 'Dan' },
                            { key: 'Dominic' },
                            { key: 'Jackson' },
                            { key: 'James' },
                        ]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 15 }}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item, index: fIndex }) => (
                            <TouchableOpacity
                                onPress={() => scrollToIndex(fIndex)}
                                style={[
                                    styles.btn,
                                    {
                                        backgroundColor: fIndex === type ? '#f26e56' : '#ededed',
                                    }
                                ]}>
                                <Text style={[styles.title, { color: fIndex === type ? '#fff' : '#333', }]}>Notication Type</Text>
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