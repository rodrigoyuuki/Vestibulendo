import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function PaginationDots({ telas, telaAtual, onNavigate }) {
  return (
    <View style={styles.pagination}>
      {telas.map((tela, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationDot,
            { backgroundColor: tela === telaAtual ? '#A31C32' : '#ccc' },
          ]}
          onPress={() => onNavigate(tela)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 70,
    height: Platform.OS === 'ios' ? 8 : 6,
    borderRadius: 5,
    marginHorizontal: Platform.OS === 'ios' ? 6 : 5,
  },
});