import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TabBar = () => {
    const navigation = useNavigation();

    return (
        <View View style={styles.tabBar} >
            <View style={styles.tabBarContent}>
                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate("Home")}>
                        <Entypo name="home" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Início</Text>
                </View>
                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => navigation.navigate("Biblioteca")}>
                        <FontAwesome name="bookmark" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Biblioteca</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => navigation.navigate("Busca")}>
                        <FontAwesome name="search" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Buscar</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.questionButton}
                        onPress={() => navigation.navigate("Questionario")}>
                        <MaterialIcons name="question-answer" size={30} color="#fbe8dd" />
                    </TouchableOpacity>
                    <Text style={styles.tabButtonText}>Questões</Text>
                </View>

                <View style={styles.tabButtonIcon}>
                    <TouchableOpacity
                        style={styles.movieButton}
                        onPress={() => navigation.navigate("Audiovisual")}>
                        <MaterialCommunityIcons name="movie-open" size={32} color="#fbe8dd" />
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
    },
});

export default TabBar;