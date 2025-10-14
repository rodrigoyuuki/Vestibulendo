import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    FlatList,
    Linking,
    Switch,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import TabBar from '../components/tabBar';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default function Perfil({ navigation }) {
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchName = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const fullName = docSnap.data().name;
                        const firstName = fullName.split(' ')[0];
                        setUserName(firstName);
                    } else {
                        console.log('Documento não encontrado!');
                    }
                } catch (error) {
                    console.log('Erro ao buscar nome:', error);
                }
            }
        };
        fetchName();
    }, []);

    useEffect(() => {
        if (user.photoURL) {
            setImage(user.photoURL);
        }
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            updateProfile(user, { photoURL: result.assets[0].uri });
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchFavoritos = async () => {
            if (!user) return;
            const userRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                setFavoritos(snapshot.data().favoritos || []);
            }
        };
        fetchFavoritos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.profileButton} onPress={pickImage}>
                    <Image
                        style={styles.profileImage}
                        source={image ? { uri: image } : require("../../assets/images/profileImg.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoIconContainer}>
                    <TouchableOpacity
                        style={styles.infoIcon}
                        onPress={() => Linking.openURL('https://www.instagram.com/vestibulendo.app?igsh=MXRkeWljY3k5anU3bw==')}>
                        <Ionicons name="logo-instagram" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.infoIcon}
                        onPress={() => navigation.navigate("Settigns")}>
                        <Ionicons name="settings-outline" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoIcon}>
                        <Ionicons name="information-circle-outline" size={35} color="#fbe8dd" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Sua atividade</Text>

                    <View style={styles.cardsRow}>
                        <View style={styles.largeCard}>
                            <Text style={styles.cardTitle}>Meus objetivos de leitura:</Text>
                        </View>

                        <View style={styles.cardsCollum}>
                            <View style={styles.smallCard}>
                                <Text style={styles.cardTitle}>Questões realizadas</Text>
                                <Text style={styles.questionsText}>
                                    Desde sua entrada no aplicativo, você realizou {' '} questões!
                                </Text>
                            </View>

                            <View style={styles.cardHorizontal}>
                                <Text style={styles.cardTitle}>Livros favoritos</Text>
                                <ScrollView
                                    style={styles.scrollView}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 50 }}>
                                    {favoritos.map((item, index) => (
                                        <View style={styles.favoritoItem} key={index}>
                                            <AntDesign name="heart" size={15} color="#f39786" />
                                            <Text style={styles.favoritos}>{item}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
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
        backgroundColor: '#a31c32',
        height: 150,
        width: '100%',
    },
    profileContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 150 - 85,
        left: width / 2,
        transform: [{ translateX: -75 }],
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    userName: {
        fontSize: 22,
        fontFamily: 'Poppins ExtraBold',
        color: '#000',
    },
    infoContainer: {
        flex: 1,
        marginTop: 90,
    },
    infoIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        marginTop: 15,
    },
    infoIcon: {
        backgroundColor: '#a31c32',
        width: 90,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        fontFamily: 'Murecho Bold',
        marginLeft: 30,
    },
    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    cardsCollum: {
        flexDirection: 'column',
        width: width * 0.43,
        gap: 10,
    },
    largeCard: {
        backgroundColor: '#a31c32',
        borderRadius: 15,
        padding: 15,
        width: width * 0.4
    },
    cardHorizontal: {
        backgroundColor: '#a31c32',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 17,
        width: '100%',
    },
    scrollView: {
        maxHeight: 90,
    },
    smallCard: {
        backgroundColor: '#a31c32',
        borderRadius: 15,
        padding: 15,
        width: '100%',
    },
    cardTitle: {
        fontSize: 13,
        color: '#fbe8dd',
        marginBottom: 10,
        fontFamily: 'Poppins ExtraBold',
    },
    questionsText: {
        fontFamily: 'Poppins Regular',
        color: '#fbe8dd',
        fontSize: 10,
    },
    favoritoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    favoritos: {
        marginLeft: 8,
        color: '#fbe8dd',
        fontFamily: 'Poppins Regular',
        fontSize: 9,
        width: '80%'
    }
});