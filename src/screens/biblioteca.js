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
    Dimensions
} from 'react-native';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import TabBar from '../components/tabBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { saveUltimaTela } from '../navigation/mainScreens';

const { width, height } = Dimensions.get('window');

export default function Biblioteca({ navigation }) {
    useEffect(() => {
        saveUltimaTela('Biblioteca');
    }, []);

    const [favoritosLivros, setFavoritosLivros] = useState([]);
    const [todosLivros, setTodosLivros] = useState([]);

    const [listaLivrosOriginal, setListaLivrosOriginal] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function getDados() {
            try {
                const user = getAuth().currentUser;
                let favoritosTitulos = [];
                if (user) {
                    const userSnap = await getDoc(doc(db, "users", user.uid));
                    if (userSnap.exists()) {
                        favoritosTitulos = userSnap.data().favoritos || [];
                    }
                }

                const snapshot = await getDocs(collection(db, "livros"));
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
                        favorito: favoritosTitulos.includes(data.titulo),
                        contexto_blocos: Array.isArray(data.contexto_historico?.contexto_blocos) ? data.contexto_historico.contexto_blocos : [],
                        contexto_titulos: Array.isArray(data.contexto_historico?.contexto_titulos) ? data.contexto_historico.contexto_titulos : [],
                        resumo_blocos: Array.isArray(data.resumo?.resumo_blocos) ? data.resumo.resumo_blocos : [],
                        resumo_titulos: Array.isArray(data.resumo?.resumo_titulos) ? data.resumo.resumo_titulos : [],
                    };
                });
                setFavoritosLivros(livrosArray.filter(l => l.favorito));
                setTodosLivros(livrosArray);
                setListaLivrosOriginal(livrosArray);
            } catch (err) {
                console.log("Erro ao buscar livros:", err);
            }
        }
        getDados();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = removeAcentos(query.trim());

        if (formattedQuery === "") {
            setTodosLivros(listaLivrosOriginal);
            return;
        }

        const filteredBooks = listaLivrosOriginal.filter(book => {
            const titulo = removeAcentos(book.titulo);
            const autor = removeAcentos(book.autor || "");
            const vestibular = removeAcentos(book.vestibular || "");
            return (
                titulo.includes(formattedQuery) ||
                autor.includes(formattedQuery) ||
                vestibular.includes(formattedQuery)
            );
        });

        setTodosLivros(filteredBooks);
    };

    const removeAcentos = (string) => {
        return string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
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
                contentContainerStyle={{ paddingBottom: 120 }}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <View style={styles.icon}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Perfil")}>
                                    <Ionicons name="person-circle-outline" size={50} color="#d87966" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={require("../../assets/images/logo2.png")}
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

                        <View style={styles.bibliSection}>
                            <Text style={[styles.bibliTitle, { marginLeft: 25 }]}>Sua biblioteca</Text>
                            <View style={styles.livroSection1}>
                                <FlatList
                                    data={favoritosLivros}
                                    renderItem={renderBookCard}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    style={{
                                        marginLeft: 20,
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.bibliTitle, { marginLeft: 30 }]}>Biblioteca pública</Text>
                            <View style={styles.livroSection}>
                                <FlatList
                                    data={todosLivros}
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
        marginBottom: 10,
    },
    livroSection1: {
        backgroundColor: '#a31c32',
        paddingVertical: 30,
        justifyContent: 'center',
    },
    section: {
        width: '100%'
    },
    livroSection: {
        alignSelf: 'center',
        width: 'auto',
    },
    bookCard: {
        margin: 5,
        overflow: 'hidden',
        width: 100,
        height: 160,
        borderRadius: 10,
    },
})