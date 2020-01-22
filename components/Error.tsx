import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Error () {
  return (
    <View style={styles.error}>
      <Text style={styles.errorTitle}>Error</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: '#000000'
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default Error;