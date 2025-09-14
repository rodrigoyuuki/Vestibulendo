import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import { auth } from "../firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import CustomModal from '../components/customModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function ResetPassword({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [email, setEmail] = useState("");

    function handleResetPassword() {
        if (!email.trim()) {
            setModalMessage("Digite seu email para redefinir a senha!");
            setModalVisible(true);
            return;
        }
        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setModalMessage("Email de redefinição enviado com sucesso!");
                setModalVisible(true);
            })
            .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/user-not-found') {
                    setModalMessage("Nenhum usuário encontrado com este email.");
                } else if (error.code === 'auth/invalid-email') {
                    setModalMessage("Email inválido!");
                } else {
                    setModalMessage("Erro ao enviar email de redefinição!");
                }
                setModalVisible(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.resetPasswordContent}>
                        <CustomModal
                            visible={modalVisible}
                            message={modalMessage}
                            onClose={() => setModalVisible(false)}
                        />

                        <TouchableOpacity
                            style={styles.redefinirSenhaButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>

                        <View style={styles.resetPasswordTitleContainer}>
                            <Text style={styles.resetPasswordTitle}>Redefinir</Text>
                            <Text style={[styles.resetPasswordTitle, { marginLeft: 5, fontFamily: 'Murecho Bold' }]}>senha</Text>
                        </View>

                        <View style={styles.explainTextContent}>
                            <Text style={styles.explainText}>Para redefinir sua senha, insira um email.</Text>
                            <Text style={styles.explainText}>Lembre-se de verificar sua caixa de spam!</Text>
                        </View>

                        <TextInput
                            placeholder="Insira um email:"
                            placeholderTextColor={'#b47882'}
                            style={styles.input}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            includeFontPadding={false}
                            textAlignVertical="center"
                        />

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleResetPassword}
                            disabled={loading}
                        >
                            <Text style={styles.submitText}>{loading ? "Enviando..." : "Enviar"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#a31c32',
    },
    logoContainer: {
        width: '100%',
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.5,
        height: height * 0.1,
        resizeMode: 'contain',
    },
    resetPasswordContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fbe8dd',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    redefinirSenhaButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a31c32',
        borderRadius: 50,
    },
    resetPasswordTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.06,
        marginTop: height * 0.05,
    },
    resetPasswordTitle: {
        fontSize: 30,
        height: 50,
        fontFamily: 'Murecho Regular',
        color: '#a31c32'
    },
    explainTextContent: {
        width: '80%',
        marginBottom: height * 0.04,
    },
    explainText: {
        fontFamily: 'Poppins Regular',
        fontSize: 14,
        color: '#a31c32',
    },
    input: {
        width: width * 0.75,
        height: height * 0.055,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingLeft: 15,
        marginBottom: height * 0.03,
        fontSize: 17,
        fontFamily: 'Poppins Regular',
    },
    submitButton: {
        width: width * 0.4,
        height: height * 0.055,
        backgroundColor: '#a31c32',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.08,
        marginBottom: height * 0.01,
    },
    submitText: {
        fontFamily: 'Poppins Regular',
        color: 'white',
        fontSize: 15,
    },
});
