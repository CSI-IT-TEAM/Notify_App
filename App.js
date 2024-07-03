import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3LightTheme as DefaultTheme, BottomNavigation, Text, Badge } from 'react-native-paper';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';

import HomePage from '@pages/HomePage';
import SigninPage from '@pages/SigninPage';
import SettingPage from '@pages/SettingPage';
import IntroPage from '@pages/IntroPage';
import AvatarPage from '@pages/AvatarPage';
import LanguagePage from '@pages/LanguagePage';
import NotifyPage from '@pages/NotifyPage';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f6f6f6',
        text: 'red',
    },
};

const BottomTabNavigator = () => (
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
                            {options?.tabBarBadge && <Badge style={{position: 'absolute', top: -40, left: '50%'}}>{options?.tabBarBadge}</Badge>}
                            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 13, color: focused ? '#3f51b5' : 'gray', marginTop: -3 }}>{label}</Text>
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
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicon name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
                },
            }}
        />
        <Tab.Screen
            name="NotifyPage"
            component={NotifyPage}
            options={{
                tabBarLabel: 'Notify',
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
                tabBarLabel: 'Settings',
                tabBarIcon: ({ focused, color, size }) => {
                    return <AntIcon name={focused ? 'appstore1' : 'appstore-o'} size={size} color={color} />;
                },
            }}
        />
    </Tab.Navigator>
)

export default function App() {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
            <PaperProvider>
                <NavigationContainer theme={theme}>
                    <RootStack.Navigator
                        screenOptions={{
                            headerShown: false,
                            animationTypeForReplace: 'pop'
                        }}
                    >
                        <RootStack.Screen name="IntroPage" component={IntroPage} />
                        <RootStack.Screen name="SigninPage" component={SigninPage} />
                        <RootStack.Screen
                            name="MainPage"
                            component={BottomTabNavigator}
                        />
                        <RootStack.Screen name="LanguagePage" component={LanguagePage} />
                        <RootStack.Screen name="AvatarPage" component={AvatarPage} />
                    </RootStack.Navigator>
                </NavigationContainer>
            </PaperProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}