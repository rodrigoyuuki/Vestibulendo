import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const { height } = Dimensions.get('window');

export default function Notas({ visible, onClose, livroId }) {
    const [titulo, setTitulo] = useState('');
    const [loadingLivro, setLoadingLivro] = useState(true);

    useEffect(() => {
        const fetchTitulo = async () => {
            try {
                const docRef = doc(db, "livros", livroId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitulo(data.titulo || "Sem título");
                } else {
                    console.log("Livro não encontrado");
                }
            } catch (err) {
                console.log("Erro ao buscar título:", err);
            } finally {
                setLoadingLivro(false);
            }
        };
        if (livroId) fetchTitulo();
    }, [livroId]);

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.floatContainer}>
                <View style={{ padding: 20 }}>
                    {loadingLivro ? (
                        <Text style={styles.text}>Carregando...</Text>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                                    <Ionicons name="chevron-back" size={24} color="#fff" />
                                </TouchableOpacity>
                                <View style={styles.titleView}>
                                    <Text style={styles.titulo}>{titulo}</Text>
                                </View>
                                <View style={{ width: 20 }}></View>
                            </View>
                        </>
                    )}
                </View>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    
                </ScrollView>
                <View style={styles.tabBar}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    floatContainer: {
        width: '75%',
        height: '50%',
        backgroundColor: '#efeeee',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        bottom: height * 0.16,
        right: 20,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'static',
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d87966',
        borderRadius: 50,
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
        backgroundColor: '#c8c7c7',
        padding: 8,
        borderRadius: 10,
    },
    titulo: {
        fontFamily: 'Murecho Regular',
        fontSize: 15,
        color: '#717171',
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    resumoCard: {
        paddingHorizontal: 25,
    },
    tabBar: {
        height: 50,
        backgroundColor: '#c8c7c7',
        width: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10,
    },
});