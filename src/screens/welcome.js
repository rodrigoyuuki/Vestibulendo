import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Dimensions } from 'react-native';
import PaginationDots from '../components/paginationDot';

const { width, height } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  const telas = ['Welcome', 'Aprovacao', 'Termos'];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonCard}>
        <View style={styles.card}>
          <Text style={styles.title}>Bem vindo(a)!</Text>
          <Text style={styles.descriptionText}>
            Vestibulendo: uma plataforma interativa para ajudar nos seus estudos.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Aprovacao')}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>

          <PaginationDots
            telas={telas}
            telaAtual="Welcome"
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
    fontSize: 24,
    color: '#A31C32',
    marginBottom: 10,
    fontFamily: 'Murecho Regular',
    height: 50
  },
  descriptionText: {
    fontSize: 14,
    color: '#A31C32',
    textAlign: 'center',
    marginBottom: 30,
    width: '80%',
    fontFamily: 'Poppins Regular',
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