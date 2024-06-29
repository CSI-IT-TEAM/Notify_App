import { StyleSheet, View } from 'react-native';

export default function BottomSheet({children}){
    return(
        <View style={styles.container}>
        <View style={styles.box}></View>
        {children}
    </View>
    )
}

const styles = StyleSheet.create({
        container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginTop: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    box: {
        width: 100,
        height: 5,
        backgroundColor: '#5d5d5d',
        borderRadius: 5,
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: [
            { translateX: -25 }
        ]
    }
});
