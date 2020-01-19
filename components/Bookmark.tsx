import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Bookmark({ title }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default Bookmark;