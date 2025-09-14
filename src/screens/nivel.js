import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Nivel({ route, navigation }) {
  const { titulo } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#a31c32' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#a31c32" />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.questionTitle}>{titulo}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.questionsArea}>
        <Text style={styles.tittleText}>Questões</Text>

        <TouchableOpacity style={styles.boxQuestionsMixed}
          onPress={() => navigation.navigate('Perguntas', { titulo, color: '#a31c32', nivel: 'Nível misto' })}>
          <View style={styles.iconAndText}>
            <View style={styles.iconStyleMixed}>
              <FontAwesome name="file-text" size={20} color="#d87966" />
            </View>
            <View>
              <Text style={styles.tittleLevelMixed}>Nível misto</Text>
              <Text style={styles.subtittleLevelMixed}>Nível básico, intermediário e avançado</Text>
            </View>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#fbe8dd" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxQuestions}
          onPress={() => navigation.navigate('Perguntas', { titulo, color: '#209730', nivel: 'Nível básico' })}>
          <View style={styles.iconAndText}>
            <View style={styles.iconStyle}>
              <FontAwesome name="file-text" size={20} color="#fff" />
            </View>
            <Text style={styles.tittleLevel}>Nível básico</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#f39786" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxQuestions}
          onPress={() => navigation.navigate('Perguntas', { titulo, color: '#ffbd59', nivel: 'Nível intermediário' })}>
          <View style={styles.iconAndText}>
            <View style={styles.iconStyle}>
              <FontAwesome name="file-text" size={20} color="#fff" />
            </View>
            <Text style={styles.tittleLevel}>Nível intermediário</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#f39786" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxQuestions}
          onPress={() => navigation.navigate('Perguntas', { titulo, color: '#ec1e24', nivel: 'Nível avançado' })}>
          <View style={styles.iconAndText}>
            <View style={styles.iconStyle}>
              <FontAwesome name="file-text" size={20} color="#fff" />
            </View>
            <Text style={styles.tittleLevel}>Nível avançado</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#f39786" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6efeb',
    flex: 1,
  },
  header: {
    width: '100%',
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 25,
    backgroundColor: '#a31c32',
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
  questionTitle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Poppins ExtraBold',
  },
  questionsArea: {
    padding: 45,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyleMixed: {
    backgroundColor: '#fff',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  iconStyle: {
    backgroundColor: '#f39786',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  boxQuestions: {
    marginTop: 15,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  boxQuestionsMixed: {
    marginTop: 15,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#f39786',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  tittleText: {
    fontSize: 25,
    color: '#a31c32',
    fontFamily: 'Murecho Bold'
  },
  tittleLevel: {
    marginLeft: 10,
    fontFamily: 'Murecho Bold',
    color: '#a31c32',
  },
  tittleLevelMixed: {
    fontFamily: 'Murecho Bold',
    color: '#fbe8dd',
    marginLeft: 10,

  },
  subtittleLevelMixed: {
    fontSize: 10,
    color: '#fbe8dd',
    marginTop: 2,
    marginLeft: 10,
    fontFamily: 'Murecho Regular'
  },
});