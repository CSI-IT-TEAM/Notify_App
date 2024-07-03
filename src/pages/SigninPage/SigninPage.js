import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-paper';

import Layout from '@components/Layout';
import Header from '@components/Header';
import TextField from '@components/TextField';

export default function SigninPage({ navigation }) {

    const [checkbox, setCheckbox] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const scrollViewRef = useRef();

    const handleCheck = () => {
        setCheckbox(checkbox => !checkbox);
    }

    const handleFocus = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToPosition(0, 0, true);
        }
      };

    const handleSubmit = () => {
        navigation.navigate('MainPage');
    }

    return (
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
                <Text style={styles.label}>User Name</Text>
                <TextField handleEvent={handleFocus} />
            </View>
            <View style={{ marginBottom: Platform.OS === 'ios' ? 20 : 15, }}>
                <Text style={styles.label}>Password</Text>
                <TextField
                    type='password'
                    handleEvent={handleFocus}
                />
            </View>
            <View style={[styles.dFlex, { marginBottom: Platform.OS === 'ios' ? 30 : 20, }]}>
                <Switch value={checkbox} color='#5694f2' onValueChange={handleCheck} />
                <Text style={styles.smLabel} suppressHighlighting={true} onPress={handleCheck} >Remember me</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTitle}>Sign in</Text>
            </TouchableOpacity>
        </Layout>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: '600',
        fontSize: 16,
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
    },
    btnTitle: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    }
});