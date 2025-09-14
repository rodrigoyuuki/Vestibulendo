import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ContextoHistorico({ route, navigation }) {
    const { livro } = route.params;

    const blocosArray = Array.isArray(livro?.contexto_blocos) ? livro.contexto_blocos : [];
    const titulosArray = Array.isArray(livro?.contexto_titulos) ? livro.contexto_titulos : [];
    const contextoImage = livro.contexto_imagens;

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
                    <Text style={styles.contextoTitle}>Contexto histórico</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#a31c32' }}>
                <View style={styles.contextoContainer}>
                    <View style={styles.contextoContent}>
                        {titulosArray.length > 0 ? (
                            titulosArray.map((titulo, index) => (
                                <View key={index} style={styles.contextoCard}>
                                    <Text style={styles.titulo}>
                                        {titulo || 'Título não disponível'}
                                    </Text>

                                    {index === 1 && livro.contexto_imagens && (
                                        <View style={styles.imageWrapper}>
                                            <Image
                                                source={{ uri: contextoImage }}
                                                style={styles.contextoImage}
                                                resizeMode="cover"
                                            />
                                        </View>
                                    )}

                                    <Text style={styles.texto}>
                                        {blocosArray[index] || 'Informações não disponíveis'}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.erro}>
                                Sem dados de contexto histórico disponíveis.
                            </Text>
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
    contextoContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#a31c32',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
    },
    contextoTitle: {
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
    contextoContent: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#a31c32',
    },
    contextoCard: {
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
    imageWrapper: {
        alignSelf: 'center',
        marginBottom: 20,
        padding: 5,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: '#a31c32',
        backgroundColor: '#fff',
    },
    contextoImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
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