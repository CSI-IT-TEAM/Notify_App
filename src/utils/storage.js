import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeKeyConfig = {
    USER_INFO: '@USER_INFO',
    USER_REMEMBER: '@USER_REMEMBER',
    REMEMBER_INFO: '@REMEMBER_INFO',
    FIRST_LOAD: '@FIRST_LOAD',
}

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

export const storeDataObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        // error reading value
    }
};

export const getDataObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue === null) {
            return null;
        }
        else {
            const data = await JSON.parse(jsonValue);
            return data;
        }
    } catch (e) {
        // error reading value
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }
}