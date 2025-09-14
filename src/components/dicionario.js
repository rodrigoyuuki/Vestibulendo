import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export default function Dicionario({ visible, glossario = [], onClose }) {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.floatContainer}>
                <View style={{padding: 20}}>
                    <TouchableOpacity style={styles.backButton} onPress={onClose}>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {glossario.length > 0 ? (
                        glossario.map((item, index) => (
                            <View key={index} style={styles.resumoCard}>
                                {item.termos.map((termo, i) => (
                                    <View key={`${index}-${i}`} style={{ marginBottom: 15 }}>
                                        <Text style={styles.termo}>{termo}</Text>
                                        <Text style={styles.definicao}>{item.definicao[i] || 'Sem definição'}</Text>
                                    </View>
                                ))}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.erro}>Nenhum termo disponível</Text>
                    )}
                </ScrollView>
                <View style={styles.tabBar}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    floatContainer: {
        width: '75%',
        maxHeight: '50%',
        backgroundColor: '#efeeee',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        bottom: height * 0.16,
        left: 20,
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d87966',
        borderRadius: 50,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    resumoCard: {
        paddingHorizontal: 25,
    },
    termo: {
        fontSize: 17,
        fontFamily: 'Murecho Bold',
        marginBottom: 7,
        color: '#6b6a6aff',
    },
    definicao: {
        fontSize: 12,
        fontFamily: 'Poppins Regular',
        marginBottom: 10,
        color: '#717171',
    },
    tabBar: {
        height: 50,
        backgroundColor: '#d87966',
        width: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10,
    },
    erro:{
        fontFamily: 'Poppins Regular',
        alignSelf: 'center',
        fontSize: 15
    },
});