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
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function UpdateNameModal({ visible, onClose, currentName }) {
    const [name, setName] = useState(currentName || '');
    const [loading, setLoading] = useState(false);

    const handleUpdateName = async () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Digite um nome válido!");
            return;
        }

        setLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;

        try {
            await updateProfile(user, { displayName: name });
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { name });
            Alert.alert("Sucesso", "Nome atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.log(error.message);
            Alert.alert("Erro", "Não foi possível atualizar o nome.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Alterar nome</Text>
                    <TextInput
                        placeholder="Digite seu novo nome"
                        placeholderTextColor={'black'}
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={{ height: 1, backgroundColor: '#c8c7c7', marginBottom: 20 }}></View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                            <Text style={styles.modalButtonText}>CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButton} onPress={handleUpdateName}>
                            <Text style={styles.modalButtonText}>
                                {loading ? "Atualizando..." : "SALVAR"}
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
        fontSize: 16,
        fontFamily: 'Murecho Bold',
        marginBottom: 20,
        color: 'black',
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