import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/welcome';
import Aprovacao from '../screens/aprovacao';
import Termos from '../screens/termos';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import ResetPassword from '../screens/resetPassword';
import Home from '../screens/home';
import Audiovisual from '../screens/audiovisual';
import OpcaoDetalhe from '../screens/opcaoDetalhe';
import LivroDetalhe from '../screens/livroDetalhe';
import Busca from '../screens/busca';
import Perfil from '../screens/profile';
import Leitura from '../screens/leitura';
import ContextoHistorico from '../screens/contextoHistorico';
import Resumo from '../screens/resumo';
import Biblioteca from '../screens/biblioteca';
import Account from '../screens/account';
import Settigns from '../screens/settings';
import Questionario from '../screens/questionario';
import Nivel from '../screens/nivel';
import Perguntas from '../screens/perguntas';
import Questões from '../screens/questoes';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    animation: 'fade',
                    headerShown: false,
                }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Aprovacao" component={Aprovacao} />
                <Stack.Screen name="Termos" component={Termos} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />    
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Audiovisual" component={Audiovisual} />
                <Stack.Screen name="OpcaoDetalhe" component={OpcaoDetalhe} />
                <Stack.Screen name="LivroDetalhe" component={LivroDetalhe} />
                <Stack.Screen name="Busca" component={Busca} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="Leitura" component={Leitura} />
                <Stack.Screen name="ContextoHistorico" component={ContextoHistorico} />
                <Stack.Screen name="Resumo" component={Resumo} />
                <Stack.Screen name="Biblioteca" component={Biblioteca} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Settigns" component={Settigns} />
                <Stack.Screen name="Questionario" component={Questionario} />
                <Stack.Screen name="Nivel" component={Nivel} />
                <Stack.Screen name="Perguntas" component={Perguntas} />
                <Stack.Screen name="Questões" component={Questões} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
