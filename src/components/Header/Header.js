import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Appbar, Avatar } from 'react-native-paper';

import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

type HeaderType = {
    type?: string,
    title?: string,
    handleNavigate : () => void
}

export default function Header({ type, title, handleNavigate } : HeaderType) {
    if(type === 'Home'){
    return (
        <View style={styles.dFlex}>
            <View style={styles.dFlexCenter}>
                
            <View>
                <Text style={styles.title}>Hello, David 👋</Text> 
                <Text style={styles.desc}>Your daily adventure starts now</Text>
            </View>
            </View>

            <Avatar.Image size={60} source={require('../../../assets/images/avatars/avatar-1.png')} />
            
        </View>
    )
}
else if (type === 'setting'){
    return(
        <View style={[styles.dFlex]}>

        <TouchableOpacity style={[styles.btn, { opacity: 0 }]} onPress={handleNavigate}>
        <AntIcon name="left" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.btn}>
            <EntypoIcon name="dots-three-vertical" size={24} />
        </View>
        
    </View>
    )
}
else{
    return(
        <View style={[styles.dFlex]}>

        <TouchableOpacity style={styles.btn} onPress={handleNavigate}>
        <AntIcon name="left" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={[styles.btn, { opacity: 0 }]}>
            <AntIcon name="left" size={24} />
        </View>
        
    </View>
    )
}
}

const styles = StyleSheet.create({
    dFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    dFlexCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7
    }, 
    title: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 2,
    },
    desc: {
        fontWeight: '500',
        fontSize: 12,
        color: '#858585',
        textShadow: '-1px 1px 10px rgba(0, 0, 0)'
    },
    btn: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10',
        backgroundColor: '#ededed',
    }
 });
  