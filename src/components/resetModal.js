import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetModal({ visible, onClose }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = () => {
        if (!email.trim()) {
            Alert.alert("Erro", "Digite seu email para redefinir a senha!");
            return;
        }
        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Sucesso", "Email de redefinição enviado com sucesso!");
                setEmail("");
                onClose();
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/user-not-found') {
                    Alert.alert("Erro", "Nenhum usuário encontrado com este email.");
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert("Erro", "Email inválido!");
                } else {
                    Alert.alert("Erro", "Erro ao enviar email de redefinição!");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Mude sua senha</Text>
                    <Text style={styles.explainText}>Digite o seu email abaixo e nós iremos enviar as instruções de como mudar a senha.</Text>

                    <TextInput
                        placeholder="Email:"
                        placeholderTextColor={'black'}
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        includeFontPadding={false}
                        textAlignVertical="center"
                    />
                    <View style={{ height: 1, backgroundColor: '#c8c7c7', marginBottom: 20 }}></View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
                            <Text style={styles.modalButtonText}>
                                {loading ? "Enviando..." : "ENVIAR"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 30,
    },
    modalTitle: {
        fontSize: 15,
        fontFamily: 'Murecho Bold',
        marginBottom: 20,
        color: 'black',
    },
    explainText: {
        fontFamily: 'Poppins Regular',
        fontSize: 11,
        marginBottom: 10,
    },
    input: {
        fontFamily: 'Murecho Regular',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 15,
        justifyContent: 'flex-end'
    },
    modalButtonText: {
        color: '#a31c32',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Poppins Regular',
    },
});