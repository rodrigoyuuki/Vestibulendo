import React, { useState, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import TabBar from "../components/tabBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Audiovisual({ navigation }) {
    const [opcaoFuvest2026, setOpcaoFuvest2026] = useState([]);
    const [opcaoUnicamp2025, setOpcaoUnicamp2025] = useState([]);

    function infoOpcao(doc) {
        const data = doc.data();
        return {
            id: doc.id,
            capa_opcao: data.capa_opcao,
            direcao: data.direcao,
            disponivel: data.disponivel,
            duracao: data.duracao,
            lancamento: data.lancamento,
            livro_ref: data.livro_ref,
            livro_titulo: data.livro_titulo,
            resumo_opcao: data.resumo_opcao,
            sinopse_opcao: data.sinopse_opcao,
            tipo: data.tipo,
            titulo_opcao: data.titulo_opcao,
            vestibular: data.vestibular,
        };
    }

    async function getDados() {
        try {
            const docRef = collection(db, "audiovisual");
            const snapshot = await getDocs(docRef);

            const fuvest = [];
            const unicamp = [];

            snapshot.forEach((doc) => {
                const opcao = infoOpcao(doc);
                if (opcao.vestibular === "fuvest2026") fuvest.push(opcao);
                else if (opcao.vestibular === "unicamp2025") unicamp.push(opcao);
            });

            setOpcaoFuvest2026(fuvest);
            setOpcaoUnicamp2025(unicamp);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDados();
    }, []);

    const renderBookCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('OpcaoDetalhe', { opcao: item })}
            style={styles.bookCard}
        >
            <Image
                source={{ uri: item.capa_opcao }}
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

                <Text style={styles.title}>Audiovisual</Text>
                <Text style={styles.subTitle}>Recomendações de filmes, séries dentre outros relacionados com os livros obrigatórios</Text>

                <View style={styles.section}>
                    <View>
                        <Text style={styles.vestTitle}>Fuvest 2026</Text>
                    </View>
                    <FlatList
                        data={opcaoFuvest2026}
                        renderItem={renderBookCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </View>

                <View style={styles.section}>
                    <View>
                        <Text style={styles.vestTitle}>Unicamp 2025</Text>
                    </View>
                    <FlatList
                        data={opcaoUnicamp2025}
                        renderItem={renderBookCard}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </View>

            </ScrollView>
            <TabBar navigation={navigation} />
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
        paddingBottom: 100,
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#a31c32'
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
    title: {
        fontSize: 27,
        color: 'black',
        fontFamily: 'Murecho Bold',
        marginLeft: width * 0.08,
        marginTop: height * 0.04,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: 'Murecho Regular',
        fontSize: 14,
        width: '73%',
        marginLeft: width * 0.08,
        marginBottom: height * 0.02,
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
        margin: 8,
        overflow: 'hidden',
        width: 100,
        height: 160,
        borderRadius: 10,
    },
});