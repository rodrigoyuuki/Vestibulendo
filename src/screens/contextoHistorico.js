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
import ContextoBlocos from '../components/contextoBlocos';

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

            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f6efeb', paddingBottom: 100 }}>
                <View style={styles.contextoContainer}>
                    {blocosArray.map((texto, index) => (
                        <View key={index}>
                            {index === 1 && contextoImage ? (
                                <View style={styles.imageWrapper}>
                                    <Image source={{ uri: contextoImage }} style={styles.contextoImage} />
                                </View>
                            ) : null}

                            {index === 2 ? (
                                <View style={styles.linhaView}>
                                    <View style={{ height: 2, backgroundColor: '#a31c32', marginVertical: 20, width: 40 }}></View>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <Text style={styles.linhaText}>Características</Text>
                                        <Text style={styles.linhaText}>importantes</Text>
                                    </View>
                                    <View style={{ height: 2, backgroundColor: '#a31c32', marginVertical: 20, flex: 1 }}></View>
                                </View>
                            ) : null}

                            <View style={{ paddingHorizontal: 35 }}>
                                <ContextoBlocos
                                    key={index}
                                    index={index}
                                    titulo={titulosArray[index]}
                                    texto={texto}
                                />
                            </View>

                            {index < blocosArray.length - 1 && index !== 1 && (
                                <View style={{ height: 2, backgroundColor: '#a31c32', marginVertical: 20, }}></View>
                            )}
                        </View>
                    ))}
                </View>
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
    contextoContainer: {
        flex: 1,
    },
    header: {
        backgroundColor: '#a31c32',
        height: height * 0.13,
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
    imageWrapper: {
        alignSelf: 'center',
        marginVertical: 15,
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
    linhaView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
    },
    linhaText: {
        fontFamily: 'Murecho Bold',
        fontSize: 25,
        color: '#a31c32'
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