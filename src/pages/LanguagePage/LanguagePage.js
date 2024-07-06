import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';

import Layout from '@components/Layout';
import Header from '@components/Header';
import { languageList } from '@data';

export default function LanguagePage({ navigation }) {
    ///// Init Variable
    const { t, i18n } = useTranslation()
    const lang =
            i18n.language !== null &&
            i18n.language !== undefined &&
            i18n.language !== ""
                    ? i18n.language
            : "en";

    //// Navigate Back
    const handleBack = () => {
        navigation.goBack();
    }

    //// Handle Language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    };

    return (
        <Layout>
            <Header title={i18n.t('sel_language')} handleNavigate={handleBack} />
            <View style={styles.container}>
                {languageList.map((item, index) => {
                    return (
                        <View key={item.id}>
                            <TouchableOpacity style={styles.cardContainer} onPress={() => changeLanguage(item.name)}>
                                <Image style={{ width: 60, height: 40 }} source={item.thumb} />
                                <Text style={styles.title}>{i18n.t(item.name)}</Text>
                                {lang === item.name &&
                                    <View style={styles.btn}>
                                        <Icon name="check" size={18} color='#fff' />
                                    </View>
                                }
                            </TouchableOpacity>
                            <Divider />
                        </View>
                    )
                })}
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        gap: 15
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15,
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
    },
    btn: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: 'seagreen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '50%',
        right: 0,
        transform: [
            { translateY: 10 }
        ]
    }
});