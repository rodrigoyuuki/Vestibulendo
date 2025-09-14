import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Resumo({ route, navigation }) {
    const { livro } = route.params;

    const titulosArray = Array.isArray(livro.resumo_titulos) ? livro.resumo_titulos : [];
    const blocosArray = Array.isArray(livro.resumo_blocos) ? livro.resumo_blocos : [];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        navigation.navigate("LivroDetalhe", { livro })
                    }
                >
                    <Ionicons name="chevron-back" size={24} color="#a31c32" />
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.resumoTitle}>Resumo</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: '#a31c32' }}
            >
                <View style={styles.resumoContainer}>
                    <View style={styles.resumoContent}>
                        {titulosArray.length > 0 ? (
                            titulosArray.map((titulo, index) => (
                                <View key={index}>
                                    <View style={styles.resumoCard}>
                                        {titulo.trim() !== '' && (
                                            <Text style={styles.titulo}>{titulo}</Text>
                                        )}
                                        <Text style={styles.texto}>
                                            {blocosArray[index] || ''}
                                        </Text>
                                    </View>

                                    {index === 0 && <View style={styles.linha}></View>}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.erro}>Sem dados de resumo disponíveis.</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a31c32',
    },
    resumoContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#a31c32',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
        position: 'static',
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
    },
    resumoTitle: {
        fontSize: 22,
        color: '#fff',
        fontFamily: 'Poppins ExtraBold',
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
    resumoContent: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#a31c32',
    },
    resumoCard: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 25,
        borderColor: '#a31c32',
        borderWidth: 1,
        marginBottom: 25,
    },
    titulo: {
        fontSize: 30,
        fontFamily: 'Murecho Bold',
        marginBottom: 20,
        color: '#a31c32',
    },
    texto: {
        fontSize: 13,
        fontFamily: 'Poppins Regular',
        color: '#333',
        lineHeight: 20,
        textAlign: 'justify',
    },
    linha: {
        height: 2,
        width: '100%',
        backgroundColor: '#a31c32',
        marginVertical: 20,
    },
    erro: {
        fontFamily: 'Poppins Regular',
        fontSize: 12,
        color: '#a31c32',
    },
});