import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function TextField({ type, placeholder, name, value, handleEvent, handleChange }) {
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

    const handleSecure = (e) => {
        e.stopPropagation();
        setSecure(secure => !secure);
        setIsActive(isActive => false);
    }

    switch (type) {
        case 'password':
            return (
                <TextInput
                    mode='outlined'
                    outlineColor={activeColor}
                    activeOutlineColor={activeColor}
                    secureTextEntry={secure}
                    placeholder={placeholder}
                    right={<TextInput.Icon forceTextInputFocus onPress={handleSecure} icon={secure ? 'eye' : 'eye-off'} />}
                    style={styles.text}
                    outlineStyle={[styles.outlineContainer, { shadowColor: activeColor }]}
                    value={value}
                    onChangeText={text => handleChange(name, text)}
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
                    placeholder={placeholder}
                    style={styles.text}
                    outlineStyle={[styles.outlineContainer, { shadowColor: activeColor }]}
                    value={value}
                    onChangeText={text => handleChange(name, text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )
    }
}

const styles = StyleSheet.create({
    text: {
        paddingLeft: 5,
        fontWeight: '500',
        fontSize: 18,
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