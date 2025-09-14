import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import Routes from './src/navigation/routes';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins Regular': require('./assets/fontes/Poppins-Regular.ttf'),
        'Poppins ExtraBold': require('./assets/fontes/Poppins-ExtraBold.ttf'),
        'Murecho Regular': require('./assets/fontes/Murecho-Regular.ttf'),
        'Murecho Bold': require('./assets/fontes/Murecho-Bold.ttf'),
      });
      setFontsLoaded(true);
    };
    
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A31C32" />
      </View>
    );
  }

  return <Routes />;
}