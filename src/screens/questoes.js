import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Questões({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#a31c32" />
                </TouchableOpacity>
                <View style={{ width: 45 }}></View>
            </View>
            
            <Text style={styles.texto}>Futura tela de perguntas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbe8dd',
    },
    header: {
        backgroundColor: '#a31c32',
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
    },
    backButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbe8dd',
        borderRadius: 50,
        alignSelf: 'flex-start',
    },
    texto: {
        fontSize: 40,
        fontFamily: 'Poppins Regular',
        textAlign: 'center'
    },
});