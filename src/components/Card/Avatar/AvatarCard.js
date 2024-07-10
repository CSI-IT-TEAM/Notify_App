import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default function AvatarCard({ data, selectIDx, handleChange }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => handleChange(data.name)}>
            <Avatar.Image size={70} source={data.thumb} />
            {selectIDx === data.name &&
                <View style={styles.btn}>
                    <Icon name="check" size={18} color='#fff' />
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        bottom: 0,
        right: 0,
    }
});