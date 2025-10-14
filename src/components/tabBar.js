import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const TabBar = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const home = route.name === 'Home';
    const biblioteca = route.name === 'Biblioteca';
    const busca = route.name === 'Busca';
    const questionario = route.name === 'Questionario';
    const audiovisual = route.name === 'Audiovisual';

    return (
        <View View style={styles.tabBar} >
            <View style={styles.tabBarContent}>
                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}>
                        <Entypo name="home" size={32} color={"#fbe8dd"} />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Início</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Biblioteca")}>
                        <FontAwesome name="bookmark" size={30} color={"#fbe8dd"} /*color={biblioteca ? "blue" : "#fbe8dd"}*/ />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Biblioteca</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.buscaIcon}
                        onPress={() => navigation.navigate("Busca")}>
                        <FontAwesome name="search" size={30} color={"#fbe8dd"} />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Buscar</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Questionario")}>
                        <MaterialIcons name="question-answer" size={30} color={"#fbe8dd"} />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Questões</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Audiovisual")}>
                        <MaterialCommunityIcons name="movie-open" size={32} color={"#fbe8dd"} />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Audiovisual</Text>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    tabBar: {
        width: '100%',
        height: 100,
        backgroundColor: '#a31c32',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabBarContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '92%',
        alignItems: 'flex-end',
        marginTop: 15,
    },
    tabButtonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonText: {
        fontFamily: 'Poppins Regular',
        fontSize: 12,
        color: '#fbe8dd',
        margin: 5,
    }
});

export default TabBar;