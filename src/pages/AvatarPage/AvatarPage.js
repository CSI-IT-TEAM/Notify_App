import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import Layout from '@components/Layout';
import Header from '@components/Header/Header';
import { avatarList } from '@data';
import AvatarCard from '@components/Card/AvatarCard/AvatarCard';

export default function AvatarPage({ navigation }) {
    const [selectThumb, setSelectThumb] = useState('avatar-1');
    const handleBack = () => {
        navigation.goBack();
    }

    const handleChange = useCallback((value) => {
        setSelectThumb(selectThumb => value);
    }, [])

    return (
        <Layout>
            <Header title='Select Avatar' handleNavigate={handleBack} />
            <View style={styles.container}>
                <FlatGrid
                    itemDimension={70}
                    data={avatarList}
                    renderItem={({ item }) => (
                        <AvatarCard 
                            key={item.id} 
                            data={item} 
                            selectIDx={selectThumb} 
                            handleChange={handleChange} 
                        />
                    )}
                />
            </View>
        </Layout>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
});