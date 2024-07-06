import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonText({ title, handlePress, customStyles }){
    return(
        <TouchableOpacity onPress={handlePress} style={[styles.container, customStyles]}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0e5ed6'
    },
});