import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { introList } from '@data';
import Layout from '@components/Layout';

const { width, height } = Dimensions.get('screen');

const Indicator = ({ active, handlePress, handleNavigate }) => {
    return (
        <View>
            <View style={styles.containerDot}>
                {introList.map(item => (
                    <View key={`indicator-${item.id}`}
                        style={[
                            styles.btnDot,
                            {
                                backgroundColor: item.id === active ? '#555' : '#999'
                            }
                        ]}
                    />
                ))}
            </View>
            <View style={styles.containerGroup}>
                {active > 0 &&
                    <TouchableOpacity onPress={() => handlePress(active - 1)} style={[styles.btn, { left: 20,}]}>
                        <Text style={styles.btnTitle}>Prev</Text>
                    </TouchableOpacity>
                }
                {active >= 0 && active < introList.length - 1 &&
                    <TouchableOpacity onPress={() => handlePress(active + 1)} style={[styles.btn, { right: 20,}]}>
                        <Text style={styles.btnTitle}>Next</Text>
                    </TouchableOpacity>
                }
                {active === introList.length - 1 &&
                    <TouchableOpacity onPress={handleNavigate} style={[styles.btn, { right: 20,}]}>
                        <Text style={styles.btnTitle}>Done</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default function IntroPage({ navigation }) {
    ///// Init Variable
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();
    const [activeIDx, setActiveIDx] = useState(0);

    ///// Update Active Page Index
    const scrollToIndex = (index: number) => {
        setActiveIDx(activeIDx => index)
    };

    ///// Navigate Event
    const onNavigate = () => {
        navigation.navigate('SigninPage');
    }

    ///// Scroll To Page
    useEffect(() => {
        if (flatListRef) {
            flatListRef?.current?.scrollToIndex({
                animated: true,
                index: activeIDx,
                viewOffset: 10,
                viewPosition: 0.5
            });
        }
    }, [activeIDx]);

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
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: width, alignItems: 'center', padding: 20, height: height * 0.95 }}>
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
                            </View>)
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
    btn: {
        position: 'absolute', 
        height: 50, 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    btnTitle: {
        fontSize: 16, 
        fontWeight: '600', 
        color: '#0e5ed6'
    },
    btnDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    containerDot: {
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        gap: 10
    },
    containerGroup: {
        flexDirection: 'row', 
        position: 'absolute', 
        top: -25, 
        left: 0, 
        width: width
    }
});