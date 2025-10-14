import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import QuestCard from '../components/questCard';

const { width, height } = Dimensions.get('window');

const TROPHIES = [
  { numero: 1, acerto: '2', completo: true },
  { numero: 2, acerto: '10', completo: true },
  { numero: 3, acerto: '5', completo: true },
  { numero: 4, acerto: '7', completo: true },
  { numero: 5, acerto: '3', completo: true },
  { numero: 6, acerto: '0', completo: false },
  { numero: 7, acerto: '0', completo: false },
  { numero: 8, acerto: '0', completo: false },
  { numero: 9, acerto: '0', completo: false },
];

export default function Perguntas({ route, navigation }) {
  const { titulo, color, nivel } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={color} />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.title}>{nivel}</Text>
          <Text style={styles.subTitle}>{titulo}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.trophiesContainer}>
        {TROPHIES.map((trophy) => (
          <TouchableOpacity
            key={trophy.numero}
            /*onPress={() => navigation.navigate("Questões")}*/>
            <QuestCard
              numero={trophy.numero}
              acerto={trophy.acerto}
              completo={trophy.completo}
              color={color}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFED',
  },
  header: {
    width: '100%',
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbe8dd',
    borderRadius: 20,
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  trophiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 30,
  },
});