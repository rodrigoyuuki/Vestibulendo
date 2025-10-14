import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import TabBar from '../components/tabBar';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Questionario({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Perfil")}>
                        <Ionicons name="person-circle-outline" size={50} color="#fbe8dd" />
                    </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.logo}
                    />
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Questões</Text>
                <Text style={styles.subTitle}>Você realmente conhece as leituras obrigatórias? Descubra agora!</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Nivel', { titulo: 'Unicamp' })}>
                        <Image
                            source={{ uri: 'https://unicamp.br/wp-content/uploads/sites/33/2023/07/Logo_Unicamp__0.jpg' }}
                            style={{ width: 60, height: 60, borderRadius: 50, resizeMode: 'cover' }}
                        />
                        <View style={styles.buttonText}>
                            <Text style={styles.buttonTitle}>UNICAMP</Text>
                            <Text style={styles.buttonSubTitle}>Desafie-se: quanto você sabe sobre as leituras da unicamp?</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Nivel', { titulo: 'Fuvest' })}>
                        <Image
                            source={{ uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/41544b41572999.Y3JvcCw0OTksMzkxLDE1MSwxMDQ.jpg' }}
                            style={{ width: 60, height: 60, borderRadius: 50, resizeMode: 'cover' }}
                        />
                        <View style={styles.buttonText}>
                            <Text style={styles.buttonTitle}>FUVEST</Text>
                            <Text style={styles.buttonSubTitle}>Acerte ou erre: o que você sabe sobre as leituras obrigatórias?</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TabBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#a31c32'
    },
    icon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '30%',
        left: '5%',
    },
    logoContainer: {
        width: width * 0.55,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 32,
        color: 'black',
        fontFamily: 'Murecho Bold',
        marginLeft: width * 0.13,
        marginTop: height * 0.06,
    },
    subTitle: {
        fontFamily: 'Murecho Regular',
        fontSize: 16,
        width: '70%',
        marginLeft: width * 0.13,
        marginBottom: height * 0.04,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#e95f42',
        paddingLeft: 20,
        borderRadius: 18,
        alignItems: 'center',
        flexDirection: 'row',
        height: 120,
        width: '80%',
        marginBottom: 15,
    },
    buttonText: {
        marginLeft: 15,
        width: '70%',
    },
    buttonTitle: {
        fontSize: 20,
        color: '#fbe8dd',
        fontFamily: 'Poppins Regular',
    },
    buttonSubTitle: {
        fontSize: 12,
        color: '#fbe8dd',
        fontFamily: 'Poppins Regular',
    },
});