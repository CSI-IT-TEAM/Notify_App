import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotifyCard({ data, onUpdate }) {
    //// Init Variable
    const isNotify = data?.IS_REGISTER === 'Y' ? true : false;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotation = fadeAnim.interpolate({
        inputRange: [-1, 1], // left side to right side
        outputRange: ['-10deg', '10deg']// before that we have to check now it's perfect
    });

    //// Handle Reg/Unreg
    const handleNotify = () => {
        onUpdate(data?.ALARM_ID, data?.IS_REGISTER);
    }

    useEffect(() => {
        const anaimate = Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: -1, // so i add the delay here
                duration: 100,
                delay: 100,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: -1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })
        ]);

        if (isNotify) {
            anaimate.start();
        }

        return () => {
            anaimate.stop();
        }
    }, [isNotify]);

    return (
        <TouchableOpacity onPress={handleNotify} style={[styles.container, { backgroundColor: '#f6f6f6', }]}>
            <View style={{flex: 0.8,}}>
                <Text style={styles.title}>{data?.ALARM_NAME}</Text>
                <Text style={[styles.desc, { color: isNotify ? '#555' : '#858585', }]}>{data?.ALARM_DESC}</Text>
            </View>
            <View>
                <Animated.View style={{ alignSelf: 'center', padding: 4, transform: [{ rotate: rotation }] }}>
                    <Icon name={isNotify ? 'bell-ring' : 'bell-off-outline'} size={isNotify ? 30 : 32} color={isNotify ? 'seagreen' : '#858585'} />
                </Animated.View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 5,
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)'
    },
});