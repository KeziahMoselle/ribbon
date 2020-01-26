import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function NoBookmark() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.illustration}
          source={require('../assets/empty.png')}
        />
        <Text style={styles.title}>No Bookmarks</Text>
      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={styles.cta}
      >
        <Text style={styles.ctaText}>Import from reddit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  card: {
    alignItems: 'center',
    padding: 46,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 26
  },
  illustration: {
    alignItems: 'center',
    height: 200,
    width: 200
  },
  cta: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#000000',
    borderRadius: 3
  },
  ctaText: {
    color: '#FFFFFF',
    textTransform: 'uppercase'
  }
})

export default NoBookmark;