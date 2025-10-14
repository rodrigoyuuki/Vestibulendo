import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Platform,
    Image
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ResumoBloco from '../components/resumoBloco';
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
                        navigation.navigate("LivroDetalhe", { livro })}>
                    <Ionicons name="chevron-back" size={24} color="#a31c32" />
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.resumoTitle}>Resumo</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f6efeb', paddingBottom: 100 }}>
                <View style={styles.livroInfo}>
                    <View style={styles.livroImage}>
                        {livro.capa_url ? (
                            <Image
                                source={{ uri: livro.capa_url }}
                                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            />
                        ) : (
                            <Text style={styles.erro}>Imagem não disponível</Text>
                        )}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.tituloLivro}>{livro.titulo || 'Título não disponível'}</Text>
                        <Text style={styles.autor}>{livro.autor || 'Autor não disponível'}</Text>
                        <Text style={styles.sinopse}>{livro.sinopse || 'Sinopse não disponível'}</Text>
                    </View>
                </View>

                <View style={{ height: 2, backgroundColor: '#a31c32', marginVertical: 20, }}></View>

                {blocosArray.map((texto, index) => (
                    <ResumoBloco
                        key={index}
                        index={index}
                        titulo={titulosArray[index]}
                        texto={texto}
                    />
                ))}
            </ScrollView>
            <View View style={styles.tabBar}></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6efeb',
    },
    resumoContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#a31c32',
        height: height * 0.13,
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
    livroInfo: {
        marginVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a31c32',
        borderRadius: 20,
        width: '93%',
        alignSelf: 'center',
        paddingVertical: 30,
    },
    livroImage: {
        width: 120,
        height: 190,
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
    tituloLivro: {
        fontSize: 20,
        fontFamily: 'Murecho Bold',
        color: '#fbe8dd',
    },
    autor: {
        fontSize: 13,
        fontFamily: 'Murecho Regular',
        color: '#fbe8dd',
        marginBottom: 10,
    },
    sinopse: {
        fontSize: 9,
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
    },
    tabBar: {
        width: '100%',
        height: 80,
        backgroundColor: '#a31c32',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
});