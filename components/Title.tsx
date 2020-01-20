import React from 'react';
import { Text, StyleSheet } from 'react-native';

function Title ({ children }) {
  return (
    <Text style={styles.title}>{ children }</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 20
  }
})

export default Title;