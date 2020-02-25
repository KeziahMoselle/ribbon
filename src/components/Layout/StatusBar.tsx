import React from 'react'
import Constants from 'expo-constants'
import { View, StyleSheet } from 'react-native'

function StatusBar () {
  return (
    <View style={styles.statusBar} />
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  }
})

export default StatusBar
