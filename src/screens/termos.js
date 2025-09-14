import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomCheckbox from '../components/checkBox';
import { Dimensions } from 'react-native';
import PaginationDots from '../components/paginationDot';
import CustomModal from '../components/customModal';

const { width, height } = Dimensions.get('window');

export default function Termos({ navigation }) {
  const telas = ['Welcome', 'Aprovacao', 'Termos'];
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [notificacao, setNotificacao] = useState(false);

  const handleCheckBox = (value) => {
    setAgreed(value);
  };

  const handleNotificacao = (value) => {
    setNotificacao(value);
  };

  return (
    <View style={styles.container}>
      <CustomModal
        visible={modalVisible}
        message={message}
        onClose={() => setModalVisible(false)}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonCard}>
        <View style={styles.card}>
          <Text style={styles.title}>Termos e condições</Text>

          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxContent}>
              <CustomCheckbox
                onValueChange={handleCheckBox}
                label={
                  <Text style={styles.label}>
                    Li e aceito os{' '}
                    <Text
                      style={{textDecorationLine: 'underline'}}
                      onPress={() => navigation.navigate('Welcome')}
                    >
                      termos e condições de uso
                    </Text>
                    .
                  </Text>
                }
              />
            </View>

            <View style={styles.checkBoxContent}>
              <CustomCheckbox
                label="Gostaria de receber atualizações sobre o App por email."
                onValueChange={handleNotificacao}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (!agreed) {
                setMessage('É preciso aceitar os termos de uso!');
                setModalVisible(true);
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>

          <PaginationDots
            telas={telas}
            telaAtual="Termos"
            onNavigate={(tela) => navigation.navigate(tela)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A31C32',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  buttonCard: {
    height: height * 0.45,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FBE8DD',
    paddingHorizontal: 40,
    paddingVertical: 50,
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    height: 50,
    fontSize: 24,
    color: '#A31C32',
    marginBottom: 10,
    fontFamily: 'Murecho Regular',
  },
  checkBoxContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  checkBoxContent: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    flex: 1,
    color: '#A31C32',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: '#A31C32',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontFamily: 'Poppins Regular',
    fontSize: 18,
  },
});