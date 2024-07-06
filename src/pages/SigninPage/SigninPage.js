import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-paper';
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import AntIcon from 'react-native-vector-icons/AntDesign';

import Layout from '@components/Layout';
import Header from '@components/Header';
import TextField from '@components/TextField';
import NotifyToast from '@components/Toast';
import { loginConfig, getAuthUserConfig } from '@utils/config';
import { isNullOrEmpty, fetchData } from '@function';
import { signinURL, selectURL } from '@api';
import { storeKeyConfig, storeData, storeDataObject, getData, getDataObject } from '@utils/storage';
import { useSpinner } from '@store/Spinner';
import { useExpoNotify, useNetwork } from '@hooks';

export default function SigninPage({ navigation }) {
    ///// Init Variable
    const [checkbox, setCheckbox] = useState(false);
    const [data, setData] = useState(loginConfig);
    const { state, dispatch } = useSpinner();
    const windowWidth = Dimensions.get('window').width;
    const scrollViewRef = useRef();

    ///// Custom Hook
    const { expoPushToken } = useExpoNotify();
    const { netStatus } = useNetwork();
    const { t, i18n } = useTranslation();

    //// Handle Checkbox
    const handleCheck = () => {
        setCheckbox(checkbox => !checkbox);
    }

    //// Handle Focus
    const handleFocus = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToPosition(0, 0, true);
        }
    };

    ///// Handle Change
    const handleChange = (name, value) => {
        setData(data => (
            {
                ...data,
                [name]: value,
            }
        ))
    }

    //// Form Submit
    const handleSubmit = async () => {
        //// Check Internet Status
        if (!netStatus) {
            NotifyToast(type = 'error', title = t('no_internet'));
            return;
        }
        //// Valid User Name
        if (isNullOrEmpty(data.USER_ID)) {
            NotifyToast(type = 'warn', title = t('inval_user'));
            return;
        }
        //// Valid User Pass
        if (isNullOrEmpty(data.USER_PASS)) {
            NotifyToast(type = 'warn', title = t('inval_pass'));
            return;
        }
        dispatch({ type: 'show' });

        let posData = await fetchData(signinURL, {
            'EMP_ID': data.USER_ID,
            'PASSWORD': data.USER_PASS
        });

        if (posData && !isNullOrEmpty(posData)) {
            let checkLoginData = await fetchData(selectURL, getAuthUserConfig('LOGIN', data.USER_ID, expoPushToken));

            await storeData(storeKeyConfig.USER_REMEMBER, checkbox ? 'Y' : 'N');
            await storeDataObject(storeKeyConfig.USER_INFO, posData);
            await storeDataObject(storeKeyConfig.REMEMBER_INFO, {
                'USER_ID': posData?.userinfo?.EMP_ID,
                'USER_NM': posData?.userinfo?.EMP_NAME,
                'USER_PASS': posData?.userinfo?.PASSWORD,
                'USER_IMG_TYPE': '',
                'USER_IMG': `https://changshin.vn/Upload/Employee/${posData?.userinfo?.EMP_ID}.png`,
                'USER_JOB': posData?.userinfo?.JOB_POSITION,
                'USER_LOGIN_DATE': isNullOrEmpty(checkLoginData) ? '' : checkLoginData[0]?.LOGIN_DATE
            });
            dispatch({ type: 'hidden' });
            navigation.navigate('MainPage', {
                screen: 'HomePage',
            });
        }
        else {
            dispatch({ type: 'hidden' });
            NotifyToast(type = 'warn', title = t('inval_user_pass'));
        }
    }

    useEffect(() => {
        const handleDefault = async () => {
            const isRemeber = await getData(storeKeyConfig.USER_REMEMBER);
            const userData = await getDataObject(storeKeyConfig.REMEMBER_INFO);

            setData(data => loginConfig);
            setCheckbox(checkbox => false);

            if (isRemeber && !isNullOrEmpty(isRemeber) && isRemeber === 'Y') {
                setData(data => (
                    {
                        ...data,
                        'USER_ID': userData?.USER_ID ?? '',
                        'USER_PASS': base64_decode(userData?.USER_PASS) ?? '',
                    }
                ))
                setCheckbox(checkbox => true);
            }
        }

        const unsubscribe = navigation.addListener('focus', () => {
            handleDefault();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <>
            <KeyboardAwareScrollView
                ref={scrollViewRef}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
            >
                <Layout>
                    <Header type='Authenticate' title='Sign up' />
                    <View style={[styles.dFlexCenter, { marginBottom: 20, }]}>
                        <Image source={require('../../../assets/images/backgrounds/bg-1.png')} style={{
                            width: windowWidth * 0.8,
                            height: 280,
                            resizeMode: 'contain',
                        }} />
                    </View>
                    <View style={{ marginBottom: Platform.OS === 'ios' ? 20 : 15, }}>
                        <Text style={styles.label}>{t('user_nm')}</Text>
                        <TextField
                            type='text'
                            placeholder={t('pl_user_nm')}
                            name='USER_ID'
                            value={data?.USER_ID}
                            handleEvent={handleFocus}
                            handleChange={handleChange}
                        />
                    </View>
                    <View style={{ marginBottom: Platform.OS === 'ios' ? 20 : 15, }}>
                        <Text style={styles.label}>{t('pass')}</Text>
                        <TextField
                            type='password'
                            placeholder={t('pl_pass')}
                            name='USER_PASS'
                            value={data?.USER_PASS}
                            handleEvent={handleFocus}
                            handleChange={handleChange}
                        />
                    </View>
                    <View style={[styles.dFlex, { marginBottom: Platform.OS === 'ios' ? 30 : 20, }]}>
                        <Switch value={checkbox} color='#5694f2' onValueChange={handleCheck} />
                        <Text style={styles.smLabel} suppressHighlighting={true} onPress={handleCheck}>{t('remember_me')}</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn, styles.dFlex]} onPress={handleSubmit}>
                        <Text style={styles.btnTitle}>{t('signin')}</Text>
                        <AntIcon name={'login'} size={24} color='#fff' />
                    </TouchableOpacity>
                </Layout>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: '600',
        fontSize: 17,
        marginBottom: 7,
    },
    dFlex: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    dFlexCenter: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    smLabel: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 7,
        color: '#333',
    },
    btn: {
        padding: Platform.OS === 'ios' ? 20 : 15,
        borderRadius: 10,
        backgroundColor: '#f26e56',
        justifyContent: 'center',
    },
    btnTitle: {
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
    }
});