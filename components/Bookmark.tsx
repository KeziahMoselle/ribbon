import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Linking } from 'expo';

function Bookmark({ id, title, url }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableRipple onPress={() => Linking.openURL(url)}>
        <View style={styles.card}>
          <Text style={styles.title}>{ title }</Text>
          <Text>{ url }</Text>
        </View>
      </TouchableRipple>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
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