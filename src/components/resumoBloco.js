import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function ResumoBloco({ index, titulo, texto }) {
    const [visivel, setVisivel] = useState(false);

    if (!texto || texto.trim() === "") {
        return null;
    }

    let buttonText = "";

    if (index === 0) {
        buttonText = "Conheça a história";
    } else if (index === 1) { 
        buttonText = "Principais temas";
    }

    return (
        <View style={styles.resumoContent}>
            <TouchableOpacity
                style={styles.botaoResumo}
                onPress={() => setVisivel(!visivel)}
            >
                <Text style={styles.textoBotao}>{buttonText}</Text>
                {visivel ? (
                    <View style={styles.buttonIcon}>
                        <Entypo
                            name="chevron-small-up"
                            size={24}
                            color="#d87966"
                        />
                    </View>
                ) : (
                    <View style={styles.buttonIcon}>
                        <Entypo
                            name="chevron-small-down"
                            size={24}
                            color="#d87966"
                        />
                    </View>
                )}
            </TouchableOpacity>

            {visivel && (
                <View style={styles.resumoCard}>
                    <Text style={styles.texto}>{texto}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    resumoContent: {
        backgroundColor: "#f6efeb",
    },
    botaoResumo: {
        backgroundColor: "#d87966",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 20
    },
    textoBotao: {
        color: "#fbe8dd",
        fontFamily: "Murecho Bold",
        fontSize: 16,
    },
    buttonIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#fbe8dd',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resumoCard: {
        backgroundColor: "#f6efeb",
        paddingHorizontal: 35,
        paddingTop: 30,
    },
    titulo: {
        fontSize: 24,
        fontFamily: "Murecho Bold",
        marginBottom: 20,
        color: "#a31c32",
    },
    texto: {
        fontSize: 13,
        fontFamily: "Poppins Regular",
        color: "#333",
        lineHeight: 20,
        textAlign: "justify",
    },
});