import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Linking } from 'expo';

function Bookmark({ id, title, url }) {
  return (
    <TouchableRipple onPress={() => Linking.openURL(url)}>
      <View style={styles.card}>
        <Text style={styles.title}>{ title } { id }</Text>
        <Text>{ url }</Text>
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
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