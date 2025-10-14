import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OpcaoDetalhe({ route, navigation }) {
    const { opcao } = route.params;

    if (!opcao) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Opção não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.opcaoContent}>

                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity
                                style={styles.backHomeButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="chevron-back" size={24} color="#a31c32" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.opcaoInfo}>
                            <View style={styles.opcaoImage}>
                                {opcao.capa_opcao ? (
                                    <Image
                                        source={{ uri: opcao.capa_opcao }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 10,
                                        }}
                                    />
                                ) : (
                                    <Text style={styles.erro}>Imagem não disponível</Text>
                                )}
                            </View>

                            <View style={styles.card}>
                                <Text style={styles.titulo}>{opcao.titulo_opcao || 'Título não disponível'}</Text>
                                <Text style={styles.sinopse}>{opcao.sinopse_opcao || 'Sinopse não disponível'}</Text>

                            </View>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.detalhes}>
                            <Text style={styles.informacao}>{opcao.lancamento} | {opcao.disponivel} | {opcao.duracao} | {opcao.tipo}</Text>
                        </View>

                        <View style={styles.producao}>
                            <Text style={styles.informacao}>Direção: {opcao.direcao}</Text>
                            <Text style={[styles.informacao, {marginTop: 15}]}>Livro: {opcao.livro_titulo}</Text>
                        </View>

                        <View style={{ height: 2, backgroundColor: '#c8c7c7', marginTop: 15, marginBottom: 30}}></View>

                        <View style={styles.resumoContainer}>
                            <Text style={styles.resumo}>Sinopse</Text>
                            <Text style={styles.resumoText}>{opcao.resumo_opcao || 'Sinopse não disponível'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a31c32', 
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 100,
        backgroundColor: 'white'
    },
    opcaoContent: {
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#a31c32',
        padding: 30,
    },
    backHomeButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbe8dd',
        borderRadius: 50,
    },
    opcaoInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    opcaoImage: {
        width: 130,
        height: 200,
    },
    erro: {
        fontSize: 12,
        fontFamily: 'Poppins Regular',
        color: 'white',
        textAlign: 'center',
    },
    card: {
        paddingHorizontal: 20,
        marginBottom: 12,
        width: 200,
    },
    titulo: {
        fontSize: 25,
        fontFamily: 'Murecho Bold',
        color: '#fbe8dd',
    },
    sinopse: {
        fontSize: 9,
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
        marginTop: 10
    },
    infoContainer: {
        marginHorizontal: 40,
        marginVertical: 20,
        flex: 1
    },
    detalhes: {
        marginBottom: 20,
        flexDirection: 'row',
        height: 'auto',
        width: '100%'
    },
    informacao: {
        fontSize: 12,
        fontFamily: 'Poppins Regular',
    },
    resumo: {
        fontSize: 25,
        marginBottom: 15,
        fontFamily: 'Murecho Bold'
    },
    resumoText:{
        fontSize: 12,
        fontFamily: 'Poppins Regular',
        textAlign: 'justify',
        lineHeight: 18,
    },
});