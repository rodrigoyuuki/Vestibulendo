import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function LerMais({ texto = '', limite = 220 }) {
    const [expandido, setExpandido] = useState(false);

    const textoCurto = texto.length > limite ? texto.substring(0, limite) : texto;

    return (
        <View style={styles.container}>
            <Text style={styles.biografia}>
                {expandido ? texto : textoCurto}{' '}
                {texto.length > limite && (
                    <Text style={styles.lerMais} onPress={() => setExpandido(!expandido)}>
                        {expandido ? 'Ver menos' : 'Veja mais...'}
                    </Text>
                )}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    biografia: {
        fontSize: 13,
        textAlign: 'justify',
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
    },
    lerMais: {
        fontSize: 13,
        fontFamily: 'Poppins ExtraBold',
        color: '#fbe8dd',
    },
});
