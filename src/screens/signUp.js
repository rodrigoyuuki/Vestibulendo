import React, { useState, useEffect } from "react";
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
    Platform,
    Dimensions
} from 'react-native';

import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CustomModal from '../components/customModal';
import LoadingModal from '../components/loading';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [passHide, setPassHide] = useState(true);
    const [passHide2, setPassHide2] = useState(true);

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleCreateUser() {
        setLoading(true);
        if (!validateForms()) {
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            await updateProfile(currentUser, { displayName: name });
            await setDoc(doc(db, "users", currentUser.uid), { name, email });

            navigation.navigate("Home");
        } catch (err) {
            if (err.code == "auth/invalid-email") {
                setErrorMessage("Email inválido!");
                setErrorModalVisible(true);
            } else if (err.code == "auth/missing-password") {
                setErrorMessage("A senha é obrigatória!");
                setErrorModalVisible(true);
            } else if (err.code == "auth/email-already-in-use") {
                setErrorMessage("Esse e-mail já está sendo usado!");
                setErrorModalVisible(true);
            } else {
                setErrorMessage("Erro ao criar conta! Tente novamente mais tarde.");
                setErrorModalVisible(true);
            }
        } finally {
            setLoading(false);
        }
    }

    function validateForms() {
        if (!name.trim()) {
            setErrorMessage("Digite seu nome!");
            setErrorModalVisible(true);
            return false;
        } else if (!email.trim()) {
            setErrorMessage("Digite seu email!");
            setErrorModalVisible(true);
            return false;
        } else if (password.length === 0) {
            setErrorMessage("A senha é obrigatória!");
            setErrorModalVisible(true);
            return false;
        } else if (password.length < 6) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres!");
            setErrorModalVisible(true);
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            setErrorMessage("Email inválido!");
            setErrorModalVisible(true);
            return false;
        } else if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem!");
            setErrorModalVisible(true);
            return false;
        }
        return true;
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <LoadingModal visible={loading} message="Criando sua conta..." />
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.signUpContent}>
                        <CustomModal
                            visible={errorModalVisible}
                            message={errorMessage}
                            onClose={() => setErrorModalVisible(false)}
                        />

                        <View style={styles.signUpTextContainer}>
                            <Text style={styles.signUpText}>Faça seu</Text>
                            <Text style={[styles.signUpText, { marginLeft: 5, fontFamily: 'Murecho Bold' }]}>cadastro</Text>
                        </View>

                        <TextInput
                            placeholder="Nome:"
                            style={styles.input}
                            keyboardType="default"
                            placeholderTextColor={'#b47882'}
                            value={name}
                            onChangeText={setName}
                            includeFontPadding={false}
                            textAlignVertical="center"
                        />

                        <TextInput
                            placeholder="Email:"
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor={'#b47882'}
                            value={email}
                            onChangeText={setEmail}
                            includeFontPadding={false}
                            textAlignVertical="center"
                        />

                        <View style={styles.senhaContainer}>
                            <TextInput
                                placeholder="Senha:"
                                style={styles.senhaInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor={'#b47882'}
                                value={password}
                                onChangeText={setPassword}
                                includeFontPadding={false}
                                textAlignVertical="center"
                                secureTextEntry={passHide}
                            />
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => setPassHide(!passHide)}
                            >
                                <Ionicons name={passHide ? 'eye-outline' : 'eye-off-outline'} size={24} color="#b47882" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.senhaContainer}>
                            <TextInput
                                placeholder="Confirme sua senha:"
                                style={styles.senhaInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor={'#b47882'}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                includeFontPadding={false}
                                textAlignVertical="center"
                                secureTextEntry={passHide2}
                            />
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => setPassHide2(!passHide2)}
                            >
                                <Ionicons name={passHide2 ? 'eye-outline' : 'eye-off-outline'} size={24} color="#b47882" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleCreateUser}
                            disabled={loading}
                        >
                            <Text style={styles.submitText}>Criar conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.createAcountButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.buttonText}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#a31c32'
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
        resizeMode: 'contain'
    },
    signUpContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fbe8dd',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    signUpTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.06,
        marginTop: height * 0.05,
    },
    signUpText: {
        fontSize: 30,
        fontFamily: 'Murecho Regular',
        height: 50, color: '#a31c32'
    },
    input: {
        width: width * 0.75,
        height: height * 0.055,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingLeft: 15,
        marginBottom: height * 0.02,
        fontSize: 17,
        fontFamily: 'Poppins Regular',
    },
    senhaContainer: {
        width: width * 0.75,
        height: height * 0.055,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: height * 0.02,
        paddingHorizontal: 10,
    },
    senhaInput: {
        flex: 1,
        fontSize: 17,
        fontFamily: 'Poppins Regular'
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        width: width * 0.4,
        height: height * 0.055,
        backgroundColor: '#a31c32',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: height * 0.01,
    },
    submitText: {
        fontFamily: 'Poppins Regular',
        color: 'white',
        fontSize: 15
    },
    buttonText: {
        fontFamily: 'Poppins Regular',
        fontSize: 15,
        color: '#a31c32',
        textDecorationLine: 'underline',
    },
});
