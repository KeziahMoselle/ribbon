import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Loading () {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingTitle}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#000000',
    flex: 1
  },
  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default Loading
