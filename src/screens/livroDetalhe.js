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
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import PopUpModal from '../components/popUp';
import LerMais from '../components/lerMais';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getUltimaTela } from '../navigation/mainScreens';

export default function LivroDetalhe({ route, navigation }) {
    const handleBack = async () => {
        const ultimaTela = await getUltimaTela();
        navigation.navigate(ultimaTela);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { livro } = route.params;

    if (!livro) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Livro não encontrado.</Text>
            </View>
        );
    }

    const favoritarLivro = async (titulo) => {
        const user = getAuth().currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);

        await updateDoc(userRef, {
            favoritos: arrayUnion(titulo)
        });
        setModalMessage("Livro favoritado!");
        setModalVisible(true);
    };

    const renderLeituraButton = () => {
        if (livro.url_pdf) {
            return (
                <TouchableOpacity
                    style={styles.buttonLer}
                    onPress={() => navigation.navigate("Leitura", { livroId: livro.id })}
                >
                    <Text style={styles.buttonLerText}>Ler obra</Text>
                </TouchableOpacity>
            );
        }
    };

    async function goToOpcao(livroId, navigation) {
        try {
            const q = query(
                collection(db, "audiovisual"),
                where("livro_ref", "==", doc(db, "livros", livroId))
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setModalMessage("Sem opção audiovisual para este livro!");
                setModalVisible(true);
                return;
            }
            const opcaoDoc = querySnapshot.docs[0];
            const opcaoData = { id: opcaoDoc.id, ...opcaoDoc.data() };
            navigation.navigate("OpcaoDetalhe", { opcao: opcaoData });
        } catch (error) {
            console.error("Erro ao buscar opção audiovisual:", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.livroContent}>
                    <PopUpModal 
                        visible={modalVisible}
                        message={modalMessage}
                        onClose={() => setModalVisible(false)}
                    />

                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity
                                style={styles.backHomeButton}
                                onPress={handleBack}
                            >
                                <Ionicons name="chevron-back" size={24} color="#a31c32" />
                            </TouchableOpacity>
                        </View>

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
                                <Text style={styles.titulo}>{livro.titulo || 'Título não disponível'}</Text>
                                <Text style={styles.autor}>{livro.autor || 'Autor não disponível'}</Text>
                                <Text style={styles.sinopse}>{livro.sinopse || 'Sinopse não disponível'}</Text>

                                <TouchableOpacity
                                    style={styles.favoritar}
                                    onPress={() => favoritarLivro(livro.titulo)}>
                                    <Text style={{ fontFamily: 'Poppins ExtraBold', color: '#fbe8dd' }}>Favoritar</Text>
                                    <AntDesign name="heart" size={24} color="#fbe8dd" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.maisInfo}>
                        <Text style={styles.maisInfoText}>Quer saber mais?</Text>
                        <Text style={styles.maisInfoDesc}>
                            Para facilitar em seus estudos, preparamos para você mais informações sobre a obra. Confira!
                        </Text>

                        <View style={styles.maisInfoButtonContainer}>
                            <View style={styles.maisInfoButton}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate("Resumo", { livro })}
                                >
                                    <Text style={styles.buttonText}>Resumo</Text>
                                    <Entypo name="text-document" size={40} color="#fbe8dd" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate("ContextoHistorico", { livro })}
                                >
                                    <Text style={styles.buttonText}>Contexto histórico</Text>
                                    <MaterialCommunityIcons
                                        name="clipboard-text-search-outline"
                                        size={40}
                                        color="#fbe8dd"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.maisInfoButton}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => goToOpcao(livro.id, navigation)}
                                >
                                    <Text style={styles.buttonText}>Recomendações</Text>
                                    <MaterialCommunityIcons name="movie-open" size={37} color="#fbe8dd" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}
                                    onPress={() => navigation.navigate('Questionario')}>
                                    <Text style={styles.buttonText}>Questões</Text>
                                    <MaterialIcons name="question-answer" size={40} color="#fbe8dd" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.maisInfoButton}>
                                {renderLeituraButton()}
                            </View>
                        </View>
                    </View>

                    <View style={styles.biografiaContainer}>
                        <Text style={styles.biografiaTitulo}>Sobre o autor</Text>
                        <View style={styles.autorImage}>
                            {livro.imagem_url ? (
                                <Image
                                    source={{ uri: livro.imagem_url }}
                                    style={{ width: '95%', height: '95%', borderRadius: 100 }}
                                />
                            ) : (
                                <Text style={styles.erro}>Imagem não disponível</Text>
                            )}
                        </View>
                        <LerMais
                            texto={livro.biografia || 'Biografia não disponível'}
                            limite={220}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a31c32'
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    livroContent: {
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
    livroInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    livroImage: {
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
    autor: {
        fontSize: 15,
        fontFamily: 'Murecho Regular',
        color: '#fbe8dd',
        marginBottom: 10,
    },
    sinopse: {
        fontSize: 9,
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
    },
    favoritar: {
        backgroundColor: '#f39786',
        width: 120,
        height: 50,
        borderRadius: 12,
        padding: 5,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    maisInfo: {
        marginHorizontal: 40,
        marginBottom: 40,
    },
    maisInfoText: {
        fontSize: 25,
        fontFamily: 'Murecho Bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#a31c32',
    },
    maisInfoDesc: {
        fontSize: 13,
        fontFamily: 'Poppins Regular',
        marginBottom: 5,
        marginTop: 5,
        color: '#a31c32',
    },
    maisInfoButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    maisInfoButton: {
        flexDirection: 'row',
    },
    button: {
        width: 150,
        height: 100,
        backgroundColor: '#d87966',
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
    },
    buttonLer: {
        width: 150,
        height: 60,
        backgroundColor: '#d87966',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 15,
    },
    buttonLerText: {
        fontFamily: 'Poppins ExtraBold',
        fontSize: 15,
        color: '#fbe8dd',
    },
    buttonText: {
        fontFamily: 'Poppins ExtraBold',
        fontSize: 12,
        color: '#fbe8dd',
    },
    biografiaContainer: {
        backgroundColor: '#a31c32',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    biografiaTitulo: {
        fontSize: 25,
        fontFamily: 'Murecho Bold',
        color: '#fbe8dd',
    },
    autorImage: {
        width: 140,
        height: 140,
        backgroundColor: '#d87966',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});