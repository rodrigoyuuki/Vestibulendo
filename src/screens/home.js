import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions, 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import TabBar from '../components/tabBar';
import { saveUltimaTela } from '../navigation/mainScreens';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
    useEffect(() => {
        saveUltimaTela('Home');
    }, []);

    const [livrosFuvest2026, setLivrosFuvest2026] = useState([]);
    const [livrosUnicamp2025, setLivrosUnicamp2025] = useState([]);
    const [livrosFuvest2025, setLivrosFuvest2025] = useState([]);

    function infoLivro(doc) {
        const data = doc.data();
        return {
            id: doc.id,
            titulo: data.titulo,
            capa_url: data.capa_url,
            vestibular: data.vestibular,
            autor: data.autor,
            sinopse: data.sinopse,
            url_pdf: data.url_pdf,
            biografia: data.autor_info?.biografia ?? '',
            imagem_url: data.autor_info?.imagem_url ?? '',
            contexto_imagens: data.contexto_historico?.contexto_imagens ?? '',
            contexto_blocos: Array.isArray(data.contexto_historico?.contexto_blocos) ? data.contexto_historico.contexto_blocos : [],
            contexto_titulos: Array.isArray(data.contexto_historico?.contexto_titulos) ? data.contexto_historico.contexto_titulos : [],
            resumo_blocos: Array.isArray(data.resumo?.resumo_blocos) ? data.resumo.resumo_blocos : [],
            resumo_titulos: Array.isArray(data.resumo?.resumo_titulos) ? data.resumo.resumo_titulos : [],
            termos: Array.isArray(data.glossario?.termos) ? data.glossario.termos : [],
            definicao: Array.isArray(data.glossario?.definicao) ? data.glossario.definicao : [],
        };
    }

    async function getDados() {
        try {
            const docRef = collection(db, "livros");
            const snapshot = await getDocs(docRef);

            let listaFuvest2026 = [];
            let listaUnicamp2025 = [];
            let listaFuvest2025 = [];

            snapshot.forEach((doc) => {
                const livro = infoLivro(doc);
                if (livro.vestibular === "fuvest2026") {
                    listaFuvest2026.push(livro);
                } else if (livro.vestibular === 'unicamp2025') {
                    listaUnicamp2025.push(livro);
                } else if (livro.vestibular === "fuvest2025") {
                    listaFuvest2025.push(livro);
                }
            });

            setLivrosFuvest2026(listaFuvest2026);
            setLivrosUnicamp2025(listaUnicamp2025);
            setLivrosFuvest2025(listaFuvest2025);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDados();
    }, []);

    const renderBookCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('LivroDetalhe', { livro: item })}
            style={styles.bookCard}
        >
            <Image
                source={{ uri: item.capa_url }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.header}>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                            <Ionicons name="person-circle-outline" size={50} color="#d87966" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={require("../../assets/images/logo2.png")} style={styles.logo} />
                    </View>
                </View>

                <View style={styles.welcome}>
                    <Text style={styles.welcomeTitle}>Olá, vestibulando!</Text>
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeText}>O que você busca hoje?</Text>
                        <Text style={styles.welcomeText}>
                            Nossa plataforma é repleta de funcionalidades que tornarão sua leitura mais produtiva.
                        </Text>
                    </View>
                </View>

                <View style={styles.homeContent}>
                    <View style={styles.section}>
                        <View>
                            <Text style={styles.vestTitle}>Fuvest 2026</Text>
                        </View>
                        <FlatList
                            data={livrosFuvest2026}
                            renderItem={renderBookCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Text style={styles.vestTitle}>Unicamp 2025</Text>
                        </View>
                        <FlatList
                            data={livrosUnicamp2025}
                            renderItem={renderBookCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Text style={styles.vestTitle}>Fuvest 2025</Text>
                        </View>
                        <FlatList
                            data={livrosFuvest2025}
                            renderItem={renderBookCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
            <TabBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    header: {
        width: '100%',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    icon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '30%',
        left: '5%',
    },
    logoContainer: {
        width: width * 0.5,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    welcome: {
        backgroundColor: '#a31c32',
        width: width * 0.9,
        height: height * 0.15,
        borderRadius: 25,
        padding: 15,
        paddingHorizontal: width * 0.08,
        alignSelf: 'center',
        marginBottom: height * 0.02,
    },
    welcomeTitle: {
        fontSize: 20,
        fontFamily: 'Murecho Bold',
        color: '#fbe8dd',
    },
    welcomeTextContainer: {
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 11,
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
    },
    section: {
        paddingLeft: width * 0.07,
        marginBottom: height * 0.02,
    },
    vestTitle: {
        fontSize: 27,
        fontFamily: 'Murecho Bold',
    },
    bookCard: {
        marginRight: 10,
        marginTop: 10,
        overflow: 'hidden',
        width: 100,
        height: 160,
        borderRadius: 10,
    },
});