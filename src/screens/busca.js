import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    ScrollView
} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBar from '../components/tabBar';
import { saveUltimaTela } from '../navigation/mainScreens';

const { width, height } = Dimensions.get('window');

export default function Busca({ navigation }) {
    useEffect(() => {
        saveUltimaTela('Busca');
    }, []);

    const [listaLivros, setListaLivros] = useState([]);
    const [listaLivrosOriginal, setListaLivrosOriginal] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const removeAcentos = (string) => {
        return string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const pesquisaFormatada = removeAcentos(query.trim());

        if (pesquisaFormatada === "") {
            setListaLivros(listaLivrosOriginal);
            return;
        }

        const livrosFiltrados = listaLivrosOriginal.filter(book => {
            const titulo = removeAcentos(book.titulo);
            const autor = removeAcentos(book.autor || "");
            const vestibular = removeAcentos(book.vestibular || "");
            return (
                titulo.includes(pesquisaFormatada) ||
                autor.includes(pesquisaFormatada) ||
                vestibular.includes(pesquisaFormatada)
            );
        });

        setListaLivros(livrosFiltrados);
    };

    useEffect(() => {
        async function getDados() {
            try {
                const docRef = collection(db, "livros");
                const snapshot = await getDocs(docRef);
                const livrosArray = snapshot.docs.map(docData => {
                    const data = docData.data();
                    return {
                        id: docData.id,
                        titulo: data.titulo,
                        capa_url: data.capa_url,
                        vestibular: data.vestibular,
                        autor: data.autor,
                        sinopse: data.sinopse,
                        url_pdf: data.url_pdf,
                        biografia: data.autor_info?.biografia ?? '',
                        imagem_url: data.autor_info?.imagem_url ?? '',
                        contexto_blocos: Array.isArray(data.contexto_historico?.contexto_blocos) ? data.contexto_historico.contexto_blocos : [],
                        contexto_titulos: Array.isArray(data.contexto_historico?.contexto_titulos) ? data.contexto_historico.contexto_titulos : [],
                        resumo_blocos: Array.isArray(data.resumo?.resumo_blocos) ? data.resumo.resumo_blocos : [],
                        resumo_titulos: Array.isArray(data.resumo?.resumo_titulos) ? data.resumo.resumo_titulos : [],
                    };
                });
                setListaLivros(livrosArray);
                setListaLivrosOriginal(livrosArray);
            } catch (err) {
                console.log("Erro ao buscar livros:", err);
            }
        }

        getDados();
    }, []);

    const filtroVestibular = (vestibularSelecionado) => {
        const livrosFiltrados = listaLivrosOriginal.filter(book =>
            book.vestibular && book.vestibular.toLowerCase() === vestibularSelecionado.toLowerCase()
        );
        setListaLivros(livrosFiltrados);
    };

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
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120, backgroundColor: 'white' }}
                ListHeaderComponent={
                    <>
                        <View style={{ backgroundColor: '#a31c32' }}>
                            <View style={styles.header}>
                                <View style={styles.icon}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Perfil")}>
                                        <Ionicons name="person-circle-outline" size={50} color="#fbe8dd" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={require("../../assets/images/logo.png")}
                                        style={styles.logo}
                                    />
                                </View>
                            </View>

                            <View style={styles.searchBar}>
                                <TextInput
                                    style={styles.searchBarInput}
                                    placeholder="Livro, autor, vestibular..."
                                    placeholderTextColor={'#a4a4a4'}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    clearButtonMode='always'
                                    value={searchQuery}
                                    onChangeText={(query) => handleSearch(query)}
                                />
                                <FontAwesome name="search" size={20} color="#a4a4a4" />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.bibliTitle, { marginLeft: 30 }]}>Vestibulares</Text>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginLeft: 25 }}>
                                <TouchableOpacity
                                    style={styles.filtroButton}
                                    onPress={() => setListaLivros(listaLivrosOriginal)}>
                                    <Text style={styles.filtroText}>Todos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.filtroButton}
                                    onPress={() => filtroVestibular("fuvest2026")}>
                                    <Text style={styles.filtroText}>Fuvest 2026</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.filtroButton}
                                    onPress={() => filtroVestibular("unicamp2025")}>
                                    <Text style={styles.filtroText}>Unicamp 2025</Text>
                                </TouchableOpacity>
                            </ScrollView>

                            <View style={styles.livroSection}>
                                <FlatList
                                    data={listaLivros}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderBookCard}
                                    numColumns={3}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    </>
                }
            />
            <TabBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a31c32'
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
        width: width * 0.55,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    searchBar: {
        height: 45,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: '#e0dfdf',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchBarInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins Regular',
    },
    bibliSection: {
        marginBottom: 20,
    },
    bibliTitle: {
        fontSize: 27,
        fontFamily: 'Murecho Bold',
        marginTop: 15
    },
    filtroButton: {
        width: 115,
        height: 40,
        backgroundColor: '#a31c32',
        marginRight: 10,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
    },
    filtroText: {
        fontFamily: 'Poppins Regular',
        fontSize: 13,
        color: '#fbe8dd'
    },
    section: {
        width: '100%',
    },
    livroSection: {
        alignSelf: 'center',
    },
    bookCard: {
        margin: 8,
        overflow: 'hidden',
        width: 100,
        height: 160,
        borderRadius: 10,
    },
});