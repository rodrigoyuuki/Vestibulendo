import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import Questões from '../screens/questoes';

const { width, height } = Dimensions.get('window');

const QuestCard = ({ numero, acerto, completo, color }) => {
    return (
        <View style={completo ? styles.questCard : styles.questCardLock}>
            <View
                style={[
                    completo ? styles.questNumIcon : styles.questNumIconLock,
                    completo && color ? { backgroundColor: color } : null
                ]}>
                <Text style={completo ? styles.questNum : styles.questNumLock}>
                    {numero}
                </Text>
            </View>
            <View style={styles.trofeu}>
                <SimpleLineIcons
                    name="trophy"
                    size={30}
                    color={completo ? '#d87966' : '#a4a4a4'}
                />
                <View style={styles.acertoIcon}>
                    <FontAwesome
                        name="check"
                        size={12}
                        color={completo ? '#4CAF50' : '#8B8B8B'}
                    />
                    <Text style={completo ? styles.acerto : styles.acertoLock}>{acerto}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    questCard: {
        width: width * 0.26,
        height: height * 0.12,
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 5,
        padding: 7
    },
    questCardLock: {
        width: width * 0.26,
        height: height * 0.12,
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 5,
        padding: 7
    },
    questNumIcon: {
        height: 27,
        width: 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    questNum: {
        fontSize: 12,
        fontFamily: 'Poppins ExtraBold',
        color: 'white',
    },
    questNumIconLock: {
        backgroundColor: '#a4a4a4',
        height: 27,
        width: 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    questNumLock: {
        fontSize: 12,
        fontFamily: 'Poppins ExtraBold',
        color: 'white',
    },
    trofeu: {
        alignItems: 'center',
    },
    acertoIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    acerto: {
        fontSize: 14,
        color: '#A31C32',
        marginHorizontal: 5,
    },
    acertoLock: {
        fontSize: 14,
        color: '#8B8B8B',
        marginHorizontal: 5,
    },
});

export default QuestCard;