
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Avatar } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotifyMessageCard({ data, onDelete }) {

    const translateX = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX < 0 ? event.translationX : 0;
        },
        onEnd: () => {
            if (translateX.value < -100) {
                translateX.value = withSpring(-100);
            } else {
                translateX.value = withSpring(0);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const handleDelete = () => {
        // translateX.value = withSpring(-300, {}, () => {
        //     // runOnJS(onDelete)(item.id);
        // });
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity onPress={handleDelete}>
                    <View style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <PanGestureHandler 
                //onGestureEvent={gestureHandler}
            >
                <Animated.View style={[styles.contentContainer, animatedStyle]}>
                    <Avatar.Image size={50} source={require('../../../../assets/images/avatars/avatar-10.png')} />
                    <View>
                        <Text style={styles.title}>SCADA Warining</Text>
                        <Text style={[styles.desc]}>SCADA Warining</Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 20,
        gap: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    desc: {
        fontWeight: '500',
        fontSize: 12,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)',
        color: '#858585'
    },
        deleteButtonContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 120,
      backgroundColor: 'red',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    deleteButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});