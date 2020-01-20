import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

function Bookmark({ id, title, url }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <View style={styles.card}>
        <Text style={styles.title}>{ title } { id }</Text>
        <Text>{ url }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default Bookmark;