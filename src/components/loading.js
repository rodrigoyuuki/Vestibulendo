import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingModal({ visible, message = "Carregando..." }) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#A31C32" />
                    <Text style={styles.text}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    text: {
        marginTop: 15,
        fontSize: 16,
        color: '#A31C32',
        fontFamily: 'Poppins Regular',
        textAlign: 'center',
    },
});