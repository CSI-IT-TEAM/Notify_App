import { View, StyleSheet } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme, BottomNavigation, Text, Badge } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';

import HomePage from '@pages/HomePage';
import NotifyPage from '@pages/NotifyPage';
import SettingPage from '@pages/SettingPage';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { t, i18n } = useTranslation();

    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
                navigationState={state}
                safeAreaInsets={insets}
                style={{
                    backgroundColor: '#fff',
                    paddingBottom: 0,
                    height: 80,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 2.2,
                    elevation: 5,
                }}
                activeIndicatorStyle={{
                    backgroundColor: '#3f51b5',
                    height: 5,
                    borderRadius: 5,
                    position: 'absolute',
                    top: -14
                }}
                activeColor='#3f51b5'
                inactiveColor='gray'
                onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (event.defaultPrevented) {
                        preventDefault();
                    } else {
                        navigation.dispatch({
                            ...CommonActions.navigate(route.name, route.params),
                            target: state.key,
                        });
                    }
                }}
                renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                        return options.tabBarIcon({ focused, color, size: 24 });
                    }

                    return null;
                }}
                renderLabel={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.title;

                    return (
                        <View>
                            {/* {options?.tabBarBadge && <Badge style={styles.badge}>{options?.tabBarBadge}</Badge>} */}
                            <Text style={[styles.title, { color: focused ? '#3f51b5' : 'gray' }]}>{label}</Text>
                        </View>
                    );
                }}
            />
        )}
    >
        <Tab.Screen
            name="HomePage"
            component={HomePage}
            options={{
                tabBarLabel: t('home'),
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicon name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
                },
            }}
        />
        <Tab.Screen
            name="NotifyPage"
            component={NotifyPage}
            options={{
                tabBarLabel: t('notify'),
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicon name={focused ? 'book' : 'book-outline'} size={size} color={color} />;
                },
                tabBarBadge: 3,
            }}
        />
        <Tab.Screen
            name="SettingPage"
            component={SettingPage}
            options={{
                tabBarLabel: t('setting'),
                tabBarIcon: ({ focused, color, size }) => {
                    return <AntIcon name={focused ? 'appstore1' : 'appstore-o'} size={size} color={color} />;
                },
            }}
        />
    </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute', 
        top: -40, 
        left: '50%'
    },
    title: {
        textAlign: 'center', 
        fontWeight: '500', 
        fontSize: 13, 
        marginTop: -3
    }
});