import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { introList } from '@data';
import Layout from '@components/Layout';
import Indicator from '@components/Indicator';
import { storeKeyConfig, storeData } from '@utils/storage';
const { width, height } = Dimensions.get('screen');

const ListItem = React.memo(({ item }) => {
    return (
        <View style={{ width: width, alignItems: 'center', padding: 20, height: height * 0.9 }}>
            <View style={{ flex: 0.6, justifyContent: 'flex-end' }}>
                <Image source={item.thumb} style={{
                    width: width * 0.8,
                    height: width * 0.8,
                    resizeMode: 'contain',
                }} />
            </View>
            <View style={{ flex: 0.05 }}></View>
            <View style={{ flex: 0.2, width: width * 0.7, }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
            </View>
        </View>
    )
})

export default function IntroPage({ navigation }) {
    ///// Init Variable
    const flatListRef = useRef();
    const [activeIDx, setActiveIDx] = useState(0);

    ///// Update Active Page Index
    const scrollToIndex = (index: number) => {
        if (index < 0 || index >= introList.length) return;

        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated: true, index });
        }
    };

    ///// Navigate Event
    const onNavigate = async() => {
        await storeData(storeKeyConfig.FIRST_LOAD, 'N');
        navigation.navigate('SigninPage');
    }

    return (
        <>
            <View>
                <Animated.FlatList
                    data={introList}
                    ref={flatListRef}
                    initialScrollIndex={activeIDx}
                    keyExtractor={(item) => item.name}
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={(ev) => {
                        setActiveIDx(activeIDx => Math.floor(ev.nativeEvent.contentOffset.x / width))
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <ListItem item={item} />
                    }}
                />
            </View>
            <Indicator active={activeIDx} handlePress={scrollToIndex} handleNavigate={onNavigate} />
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center'
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
    },
});