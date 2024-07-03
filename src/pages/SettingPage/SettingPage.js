import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import Layout from '@components/Layout';
import Header from '@components/Header';
import SettingCard from '@components/Card/SettingCard';
import { settingsList } from '@data';

export default function SettingPage({ navigation }) {

    const handleBack = () => {
        navigation.goBack();
    }

    const handleNavigate = (pathName: string) => {
        navigation.navigate(pathName);
    }

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.thumb}>
                    <Avatar.Image size={150} source={require('../../../assets/images/avatars/avatar-1.png')} />
                    <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('AvatarPage')}>
                        <Icon name="image" size={28} color='#555' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>David Arthur</Text>
                <Text style={styles.desc}>@Admin</Text>
            </View>
            {settingsList.map(item => {
                return (
                    <SettingCard key={item.id} data={item} handleNavigate={handleNavigate} />
                )
            })}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    thumb: {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#ededed',
        padding: 5,
        marginBottom: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 2,
        opacity: 0.8,
    },
    desc: {
        color: '#858585',
    },
    btn: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#ededed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    }
});