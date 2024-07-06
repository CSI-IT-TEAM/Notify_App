import { StyleSheet, Text, View, FlatList, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import { introList } from '@data';
import ButtonText from '../Button/Text/Text';

const { width, height } = Dimensions.get('screen');

export default function Indicator({ active, handlePress, handleNavigate }) {
    return (
        <View>
            <View style={styles.containerDot}>
                {introList.map(item => (
                    <View
                        key={`indicator-${item.id}`}
                        style={[
                            styles.btnDot,
                            {
                                backgroundColor: item.id === active ? '#555' : '#999'
                            }
                        ]}
                    />
                ))}
            </View>
            <View style={styles.containerGroup}>
                {active > 0 &&
                    <ButtonText 
                        title='Prev' 
                        handlePress={() => handlePress(active - 1)} 
                        customStyles={{ position: 'absolute', left: 20, }} 
                    />
                }
                {active >= 0 && active < introList.length - 1 &&
                    <ButtonText 
                        title='Next' 
                        handlePress={() => handlePress(active + 1)} 
                        customStyles={{ position: 'absolute', right: 20, }} 
                    />
                }
                {active === introList.length - 1 &&
                    <ButtonText 
                        title='Done' 
                        handlePress={handleNavigate} 
                        customStyles={{ position: 'absolute', right: 20, }} 
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    containerDot: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 15
    },
    containerGroup: {
        flexDirection: 'row',
        position: 'absolute',
        top: -25,
        left: 0,
        width: width
    }
});