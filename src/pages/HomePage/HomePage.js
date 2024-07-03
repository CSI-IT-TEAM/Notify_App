
import { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Avatar } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';

import Header from '@components/Header';
import Layout, { BottomSheet } from '@components/Layout';
import StatusCard from '@components/Card/StatusCard';
import NotifyCard from '@components/Card/NotifyCard';

import { handleRegistrationError } from '@function';
import { statusList } from '@data';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;

            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

export default function HomePage({ navigation }) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(
        undefined
    );
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => {
                setExpoPushToken(token ?? '');
                console.log(token);
            })
            .catch((error: any) => setExpoPushToken(`${error}`));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const handleNavigation = useCallback(() => {
        navigation.navigate('SettingPage');
    }, [])

    return (

        <>

            <Layout>
                <Header type='Home' handleNavigate={handleNavigation} />
            </Layout>
            <View style={styles.statusContainer}>
                     <FlatGrid
                        itemDimension={150}
                        data={statusList}
                        renderItem={({ item }) => (<StatusCard
                            key={item.id}
                            title={item.title}
                            desc={item.desc}
                            icon={item.icon}
                            color={item.color}
                        />)}
                        /> 

                </View>

            <BottomSheet>

            <View style={styles.notifyContainer}>
                    <Text style={styles.title}>Notify List</Text>
                </View>
                <FlatList
                    data={[
                        { key: 'Devin' },
                        { key: 'Dan' },
                        { key: 'Dominic' },
                        { key: 'Jackson' },
                        { key: 'James' },
                    ]}
                    keyExtractor={(item) => item.key}
                    renderItem={(item) => <NotifyCard />}
                    showsVerticalScrollIndicator={false}
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
});