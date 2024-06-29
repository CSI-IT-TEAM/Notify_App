import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import Layout from '@components/Layout';
import Header from '@components/Header/Header';
import { languageList } from '../../data';

export default function LanguagePage({ navigation }) {

    const [lang, setLang] = useState('en');

    const handleBack = () => {
        navigation.goBack();
    }

    return(
        <Layout>
            <Header title='Select Language' handleNavigate={handleBack} />
            <View style={styles.container}>
            {languageList.map((item, index) => {
                return(
                    <View key={item.id}>
                            <View style={styles.cardContainer}>
                            <Image style={{width: 60, height: 40}} source={item.thumb} />
                            <Text style={styles.title}>{item.title}</Text>

                            {lang === item.name &&
                                <View style={styles.btn}>
                                <Icon name="check" size={18} color='#fff' />
                            </View>
                            }
                            
                        </View>
                        
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
        gap: '15'
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
        borderRadius: '100%',
        backgroundColor: 'seagreen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '50%',
        right: 0,
        transform: [
            { translateY: 10}
        ]
    }
 });