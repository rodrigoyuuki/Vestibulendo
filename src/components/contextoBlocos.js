import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function ContextoBlocos({ index, titulo, texto }) {
    const [visivel, setVisivel] = useState(false);

    if (!texto || texto.trim() === "") {
        return null;
    }

    let buttonText = "";

    if (index === 0) {
        buttonText = "Período";
    } else if (index === 1) {
        buttonText = "A política da época";
    } else if (index === 2) {
        buttonText = "Características importantes";
    } else if (index === 3) {
        buttonText = "Relação com a obra";
    }

    const subBlocos =
        index === 2 && (texto.includes(':') || texto.includes('\n'))
            ? texto
                .split('\n')
                .map((linha) => {
                    const [subTitulo, subTexto] = linha.split(':');
                    return { subTitulo: subTitulo?.trim(), subTexto: subTexto?.trim() };
                })
            : [];

    const [subVisiveis, setSubVisiveis] = useState({});

    const alternarSub = (i) => {
        setSubVisiveis((prev) => ({
            ...prev,
            [i]: !prev[i],
        }));
    };

    const renderSubBlocos = () => (
        <View>
            {subBlocos.length > 0 ? (
                <View>
                    {subBlocos.map((item, i) => (
                        <View key={i} style={styles.subItemWrapper}>
                            <TouchableOpacity
                                style={styles.subBotao}
                                onPress={() => alternarSub(i)}
                            >
                                <View style={styles.numeroWrapper}>
                                    <Text style={styles.numero}>{i + 1}</Text>
                                </View>
                                <Text style={styles.subTitulo}>{item.subTitulo}</Text>
                            </TouchableOpacity>
                            {subVisiveis[i] && (
                                <Text style={styles.subTexto}>{item.subTexto}</Text>
                            )}
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.texto}>{texto}</Text>
            )}
        </View>
    );

    return (
        <View style={styles.contextoContent}>
            {index === 2 ? (
                renderSubBlocos()
            ) : (
                <>
                    <TouchableOpacity
                        style={[
                            styles.botaoContexto,
                            index === 1 && { alignSelf: 'center' },
                            index === 0 && { marginTop: 20 }]}
                        onPress={() => setVisivel(!visivel)}>
                        <Text style={styles.textoBotao}>{buttonText}</Text>
                        <View style={styles.buttonIcon}>
                            <Entypo
                                name={visivel ? "chevron-small-down" : "chevron-small-right"}
                                size={24}
                                color="#d87966"
                            />
                        </View>
                    </TouchableOpacity>

                    {visivel && (
                        <View style={styles.contextoCard}>
                            <Text style={styles.texto}>{texto}</Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    contextoContent: {
        paddingVertical: 7,
        backgroundColor: "#f6efeb",
    },
    botaoContexto: {
        backgroundColor: "#d87966",
        padding: 12,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        alignSelf: 'flex-start'
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
        justifyContent: 'center',
        marginLeft: 20
    },
    contextoCard: {
        backgroundColor: "#f6efeb",
        paddingVertical: 15,
    },
    texto: {
        fontSize: 13,
        fontFamily: "Poppins Regular",
        color: "#333",
        lineHeight: 20,
        textAlign: "justify",
    },
    subItemWrapper: {
        marginBottom: 15,
        backgroundColor: '#f6efeb',
    },
    subBotao: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d87966",
        borderRadius: 50,
        width: '90%',
        alignSelf: 'flex-start',
        padding: 4
    },
    numeroWrapper: {
        backgroundColor: "#a31c32",
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    numero: {
        color: "#fbe8dd",
        fontFamily: "Murecho Bold",
        fontSize: 13,
    },
    subTitulo: {
        color: "#fbe8dd",
        fontFamily: "Poppins ExtraBold",
        fontSize: 13,
        flex: 1,
        lineHeight: 15,
    },
    subTexto: {
        fontSize: 13,
        fontFamily: "Poppins Regular",
        color: "#333",
        lineHeight: 18,
        textAlign: "left",
        backgroundColor: '#f6efeb',
        marginTop: 10,
        width: '80%'
    },
});