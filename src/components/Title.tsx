import React from 'react'
import { StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

function TitleCustom ({ children }) {
  return (
    <Title style={styles.title}>{ children }</Title>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 12
  }
})

export default TitleCustom
