import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { WebView } from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Dicionario from "../components/dicionario";
import Notas from "../components/notas";
import LoadingModal from "../components/loading";
import { Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export default function Leitura({ route, navigation }) {
    const { livroId } = route.params;

    const [modalDicionarioVisible, setDicionarioVisible] = useState(false);
    const [modalNotasVisible, setNotasVisible] = useState(false);
    const [onlineSource, setOnlineSource] = useState(null);
    const [loadingLivro, setLoadingLivro] = useState(true);
    const [loadingPDF, setLoadingPDF] = useState(true);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [glossario, setGlossario] = useState([]);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const docRef = doc(db, "livros", livroId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setOnlineSource(data.url_pdf);
                    setTitulo(data.titulo);
                    setAutor(data.autor);

                    if (data.glossario) {
                        const g = Array.isArray(data.glossario) ? data.glossario : [data.glossario];
                        setGlossario(g);
                    } else {
                        setGlossario([]);
                    }

                    console.log("Glossário do livro:", data.glossario);
                } else {
                    console.log("Livro não encontrado");
                }
            } catch (err) {
                console.log("Erro ao buscar livro:", err);
            } finally {
                setLoadingLivro(false);
            }
        };

        fetchPDF();
    }, []);

    const handleDicionario = () => setDicionarioVisible(true);
    const handleCloseDicionario = () => setDicionarioVisible(false);

    const handleNotas = () => setNotasVisible(true);
    const handleCloseNotas = () => setNotasVisible(false);

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal visible={loadingLivro || loadingPDF} message="Abrindo Livro..." />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="#343030" />
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={styles.autor}>{autor || 'Autor não disponível'}</Text>
                    <Text style={styles.titulo}>{titulo || 'Titulo não disponível'}</Text>
                </View>

                <View style={{ width: 45 }}></View>
            </View>

            {onlineSource ? (
                <WebView
                    source={{ uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(onlineSource)}` }}
                    style={styles.webview}
                    onLoadStart={() => setLoadingPDF(true)}
                    onLoadEnd={() => setLoadingPDF(false)}
                />
            ) : (
                <View style={[styles.webview, { justifyContent: 'center', alignItems: 'center' }]}>
                </View>
            )}

            <Dicionario
                visible={modalDicionarioVisible}
                glossario={glossario}
                onClose={handleCloseDicionario}
            />
            <Notas
                visible={modalNotasVisible}
                onClose={handleCloseNotas}
                livroId={livroId}
            />

            <View style={styles.tabBar}>
                <View style={styles.tabBarContent}>
                    <View style={styles.tabButtonIcon}>
                        <TouchableOpacity
                            style={styles.questionButton}
                            onPress={handleDicionario}>
                            <FontAwesome6 name="book-bookmark" size={30} color="#f39786" />
                        </TouchableOpacity>
                        <Text style={styles.tabButtonText}>Dicionário</Text>
                    </View>

                    <View style={styles.tabButtonIcon}>
                        <TouchableOpacity
                            style={styles.movieButton}
                            onPress={handleNotas}>
                            <FontAwesome name="pencil" size={35} color="#f39786" />
                        </TouchableOpacity>
                        <Text style={styles.tabButtonText}>Anotações</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#343030',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
        position: 'static'
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
    },
    autor: {
        fontSize: 20,
        color: '#fbe8dd',
        fontFamily: 'Murecho Bold',
        textAlign: 'center',
    },
    titulo: {
        fontSize: 14,
        color: '#fbe8dd',
        fontFamily: 'Murecho Bold',
        borderBottomColor: '#fbe8dd',
        borderBottomWidth: 1,
        alignSelf: 'center',
        textAlign: 'center',
    },
    backButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f39786',
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    webview: {
        flex: 1,
    },
    tabBar: {
        width: '100%',
        height: height * 0.16,
        backgroundColor: '#343030',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    tabBarContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '92%',
        alignItems: 'flex-end',
        marginTop: 15
    },
    tabButtonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabButtonText: {
        fontFamily: 'Poppins Regular',
        fontSize: 12,
        color: '#fbe8dd',
        margin: 5
    },
});