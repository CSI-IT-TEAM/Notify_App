import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import RenderHtml from '@components/RenderHtml';
import { getDateFormat } from '@function';

const NotifyMessageCard = React.memo(({ data, onClick }) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => onClick(data?.ALARM_UUID)}>
            <View style={styles.contentContainer}>
                <Avatar.Image size={50} source={{ uri: data?.ALARM_ICON }} />
                <View style={{ flexGrow: 1 }}>
                    <Text style={styles.title}>{data.TITLE.replace('<body>', '').replace('</body>', '')}</Text>
                    <Text style={[styles.desc]}>{data.CONTENT_SUM.replace('<body>', '').replace('</body>', '')}</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center' }}>
                            <RenderHtml value={data?.NOTE} />
                        </View>
                        <Text style={{ fontWeight: '600', color: '#555' }}>{getDateFormat(data?.ALARM_DT, 'hh:mm aa')}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
})

export default NotifyMessageCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 7,
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        gap: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)',
        color: '#858585',
        marginBottom: 7,
    },
});