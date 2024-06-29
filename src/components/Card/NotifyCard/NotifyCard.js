import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotifyCard() {

    const [isNotify, setIsNotify] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotation = fadeAnim.interpolate({
        inputRange: [-1, 1], // left side to right side
        outputRange: ['-10deg', '10deg']// before that we have to check now it's perfect
    });

    const handleNotify = () => {
        setIsNotify(isNotify => !isNotify);
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

        if(isNotify){
            anaimate.start();
        }

        return () => {
            anaimate.stop();
        }
    },[isNotify])



    return (
        <TouchableOpacity onPress={handleNotify} style={[styles.container, { backgroundColor: isNotify ? '#27ba9e' : '#f6f6f6', }]}>
            <View>
            <Text style={styles.title}>SCADA Warining</Text>
            <Text style={[styles.desc, { color: isNotify ? '#555' : '#858585', }]}>SCADA Warining</Text>
            </View>
            <View>
                <Animated.View style={{ alignSelf: 'center', padding: 4, transform: [{ rotate: rotation }] }}>
                    <Icon name={isNotify ? 'bell-ring' : 'bell-off-outline'} size={isNotify ? 30 : 32} color={isNotify ? '#fff' : '#858585'} />
                </Animated.View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 5,
    },
    desc: {
        fontWeight: '500',
        fontSize: 12,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)'
    },
 });