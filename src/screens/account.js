import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import ResetModal from '../components/resetModal';
import UpdateNameModal from '../components/updateName';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Account({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user?.photoURL) {
            setImage(user.photoURL);
        }
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            await updateProfile(user, { photoURL: uri });
        }
    }

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const email = docSnap.data().email;
                        setUserEmail(email);
                    } else {
                        console.log('Usuário não encontrado!');
                    }
                } catch (error) {
                    console.log('Erro ao buscar email:', error);
                }
            }
        };
        fetchEmail();
    }, []);

    useEffect(() => {
        const fetchName = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                setUserName(user.displayName || '');

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserName(docSnap.data().name || user.displayName || '');
                }
            }
        };
        fetchName();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Settigns")}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Perfil e conta</Text>
                </View>
                <View style={{ width: 45 }}></View>
            </View>
            <View style={styles.linha} />

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Perfil</Text>
                <View style={styles.profileRow}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={image ? { uri: image } : require("../../assets/images/profileImg.png")}
                            style={{ width: 50, height: 50, marginRight: 10, borderRadius: 25 }}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.profileText}>Foto de perfil</Text>
                        <TouchableOpacity
                            onPress={pickImage}>
                            <Text style={styles.subText}>Toque para mudar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.linha} />

                <View style={styles.nameSection}>
                    <Text style={styles.sectionTitle}>Nome de usuário</Text>
                    <TouchableOpacity
                        onPress={() => setNameModalVisible(true)}>
                        <Text style={styles.subText}>Toque para mudar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Configurações da conta</Text>

                <Text style={styles.configText}>Email</Text>
                <Text style={styles.infoText}>{userEmail}</Text>
                <View style={styles.linha} />

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.senhaText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>

            <ResetModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <UpdateNameModal
                visible={nameModalVisible}
                onClose={() => setNameModalVisible(false)}
                currentName={userName}
            />
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
    content: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        marginTop: height * 0.08,
    },
    sectionTitle: {
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'Murecho Bold'
    },
    profileRow: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    profileText: {
        fontSize: 15,
        fontFamily: 'Murecho Regular'
    },
    subText: {
        fontSize: 10,
        fontFamily: 'Murecho Regular',
        height: 20,
    },
    configText: {
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'Murecho Regular',
        marginBottom: 5
    },
    nameSection: {
        marginBottom: 30,
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'Murecho Regular',
        marginBottom: 10,
        height: 20
    },
    senhaText: {
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'Murecho Regular',
        height: 30
    }
});