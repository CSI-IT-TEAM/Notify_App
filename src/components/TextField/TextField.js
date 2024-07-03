import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function TextField({ type, value, handleEvent }) {
    const [data, setData] = useState(value);
    const [secure, setSecure] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const activeColor = isActive ? '#5694f2' : '#000';

    const handleFocus = () => {
        setIsActive(true);
        handleEvent();
    }

    const handleBlur = () => {
        setIsActive(false);
    }

    switch (type) {
        case 'password':
            return (
                <TextInput
                    mode='outlined'
                    outlineColor={activeColor}
                    activeOutlineColor={activeColor}
                    secureTextEntry={secure}
                    placeholder='Enter your password'
                    right={<TextInput.Icon forceTextInputFocus onPress={() => setSecure(secure => !secure)} icon={secure ? 'eye' : 'eye-off'} />}
                    style={styles.text}
                    outlineStyle={[styles.outlineContainer, { shadowColor: activeColor }]}
                    value={data}
                    onChangeText={text => setData(data => text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )
        default:
            return (
                <TextInput
                    mode='outlined'
                    outlineColor={activeColor}
                    activeOutlineColor={activeColor}
                    placeholder='Enter your account'
                    style={styles.text}
                    outlineStyle={[styles.outlineContainer, { shadowColor: activeColor }]}
                    value={data}
                    onChangeText={text => setData(data => text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}

                />
            )
    }
}

const styles = StyleSheet.create({
    text: {
        paddingLeft: 5,
        fontWeight: '500'
    },
    outlineContainer: {
        borderRadius: 20,
        borderWidth: 2,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.75,
        shadowRadius: 0,
    }
});