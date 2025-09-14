import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PopUpModal({ visible, message, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#d87966',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
  },
  message: {
    fontSize: 16,
    color: 'white',
    width: '90%',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
  },
  closeButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#A31C32',
    fontSize: 16,
    fontFamily: 'Poppins Regular',
  },
});