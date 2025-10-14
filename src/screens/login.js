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
  Platform,
  Dimensions
} from 'react-native';
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomModal from '../components/customModal';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);

  function handleSignIn() {
    if (!formsValido()) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Email ou senha inválidos!");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("A senha é obrigatória!");
        } else if (err.code === "auth/invalid-credential") {
          setErrorMessage("Email ou senha inválidos!");
        } else if (err.code === "auth/user-not-found") {
          setErrorMessage("Usuário não encontrado!");
        } else {
          setErrorMessage("Erro ao tentar fazer login! Tente novamente.");
        }
        setErrorModalVisible(true);
      });
  }

  function formsValido() {
    if (!email.trim()) {
      setErrorMessage("Digite seu email!");
      setErrorModalVisible(true);
      return false;
    } else if (password.length === 0) {
      setErrorMessage("A senha é obrigatória!");
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.loginContent}>
            <CustomModal
              visible={errorModalVisible}
              message={errorMessage}
              onClose={() => setErrorModalVisible(false)}
            />

            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Faça seu</Text>
              <Text style={[styles.loginText, { marginLeft: 5, fontFamily: 'Murecho Bold' }]}>login </Text>
            </View>

            <TextInput
              placeholder="Email:"
              placeholderTextColor={'#b47882'}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              includeFontPadding={false}
              textAlignVertical="center"
            />

            <View style={styles.senhaContainer}>
              <TextInput
                placeholder="Senha:"
                placeholderTextColor={'#b47882'}
                style={styles.senhaInput}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={passHide}
                includeFontPadding={false}
                textAlignVertical="center"
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setPassHide(!passHide)}
              >
                <Ionicons
                  name={passHide ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color="#b47882"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.redefinirSenhaButton}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={styles.buttonText}>Redefinir senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSignIn()}
            >
              <Text style={styles.submitText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAcountButton}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Cadastre-se</Text>
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
  loginContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fbe8dd',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.07,
    marginTop: height * 0.05,
  },
  loginText: {
    fontSize: 30,
    fontFamily: 'Murecho Regular',
    height: 50,
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
  senhaContainer: {
    width: width * 0.75,
    height: height * 0.055,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: height * 0.015,
    paddingHorizontal: 10,
  },
  senhaInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Poppins Regular',
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    color: '#a31c32',
    textDecorationLine: 'underline',
  },
  submitButton: {
    width: width * 0.4,
    height: height * 0.055,
    backgroundColor: '#a31c32',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.09,
    marginBottom: height * 0.01,
  },
  submitText: {
    fontFamily: 'Poppins Regular',
    color: 'white',
    fontSize: 15,
  },
});
