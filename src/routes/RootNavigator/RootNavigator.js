import React, { useState, useEffect, useRef } from 'react';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';

import SigninPage from '@pages/SigninPage';
import IntroPage from '@pages/IntroPage';
import AvatarPage from '@pages/AvatarPage';
import LanguagePage from '@pages/LanguagePage';
import { storeKeyConfig, getData, getDataObject } from '@utils/storage';
import { isNullOrEmpty, fetchData, checkValidToken } from '@function';
import { validTokenURL } from '@api';
import { useSpinner } from '@store/Spinner';
import BottomTabNavigator from '../BottomTabNavigator';

const RootStack = createNativeStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f6f6f6',
        text: 'red',
    },
};

export default function RootNavigator(){
    ///// Init Variable
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigationRef = useNavigationContainerRef();
    const { state, dispatch } = useSpinner();

    useEffect(() => {
        const handleDefault = async () => {
            const userInfo = await getDataObject(storeKeyConfig.USER_INFO);
            const isRemeber = await getData(storeKeyConfig.FIRST_LOAD);

            if (isRemeber && !isNullOrEmpty(isRemeber) && isRemeber === 'N'){
                setFirstLoad(firstLoad => false);
            }

            ///// Valid User Token
            const postData = await checkValidToken(userInfo?.token?.token);
            dispatch({ type: postData ? 'validUser' : 'invalidUser' });
            setLoading(false);
        }

        handleDefault();
    }, []);

    if(loading){
        return(
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#333' }}
                color='#666'
                overlayColor='fff'
            />
        )
    }

    return(
        <NavigationContainer 
            ref={navigationRef}
            theme={theme}
        >
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                    animationTypeForReplace: 'pop'
                }}
            >
                {firstLoad && <RootStack.Screen name="IntroPage" component={IntroPage} />}
                {!state.validUser && <RootStack.Screen name="SigninPage" component={SigninPage} />}
                <RootStack.Screen
                    name="MainPage"
                    component={BottomTabNavigator}
                />
                <RootStack.Screen name="LanguagePage" component={LanguagePage} />
                <RootStack.Screen name="AvatarPage" component={AvatarPage} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}