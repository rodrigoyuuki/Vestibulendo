import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaPrincipais = ['Home', 'Biblioteca', 'Busca'];

export const saveUltimaTela = async (screenName) => {
  if (TelaPrincipais.includes(screenName)) {
    await AsyncStorage.setItem('ultimaTela', screenName);
  }
};

export const getUltimaTela = async () => {
  const screen = await AsyncStorage.getItem('ultimaTela');
  return screen || 'Home';
};
