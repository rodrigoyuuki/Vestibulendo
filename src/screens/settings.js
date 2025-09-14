import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Switch
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Settigns({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleLogout = async (navigation) => {
        try {
            await signOut(auth);
            console.log("Usuário saiu com sucesso!");
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });
        } catch (error) {
            console.error("Erro ao sair:", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Perfil")}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Configurações</Text>
                </View>
                <View style={{ width: 45 }}></View>
            </View>
            <View style={styles.linha}></View>

            <View style={styles.configContainer}>
                <Text style={styles.configTitle}>Configurações do aplicativo</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                    <Text style={styles.configText}>Perfil e conta</Text>
                </TouchableOpacity>
                <View style={styles.linha}></View>

                <View style={styles.notification}>
                    <Text style={styles.configText}>Notificações</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#fab4a8ff' }}
                        thumbColor={isEnabled ? '#a31c32' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <Text style={styles.configTitle}>Outros</Text>
                <TouchableOpacity>
                    <Text style={styles.configText}>Ajuda e suporte</Text>
                </TouchableOpacity>
                <View style={styles.linha}></View>

                <TouchableOpacity onPress={() => handleLogout(navigation)}>
                    <Text style={styles.configText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 30,
        marginTop: 20,
    },
    backButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a31c32',
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    titleView: {
        alignSelf: 'center',
        marginHorizontal: 'auto',
    },
    title: {
        fontSize: 22,
        color: '#a31c32',
        fontFamily: 'Poppins ExtraBold'
    },
    linha: {
        height: 2,
        backgroundColor: '#c8c7c7'
    },
    configContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        marginTop: height * 0.1,
    },
    configTitle: {
        fontSize: 15,
        marginBottom: 10,
        fontFamily: 'Murecho Bold'
    },
    configText: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'Murecho'
    },
    notification: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notButton: {
        height: 20,
        width: 50,
        backgroundColor: '#f39786',
        borderRadius: 20,
    }
});