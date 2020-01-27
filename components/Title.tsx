import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

function TitleCustom ({ children }) {
  return (
    <Title style={styles.title}>{ children }</Title>
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

export default TitleCustom;