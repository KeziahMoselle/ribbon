import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useBookmarks } from './providers/BookmarksProvider';

function NoBookmark() {
  const { refetch } = useBookmarks();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.illustration}
          source={require('../assets/empty.png')}
        />
        <Title style={styles.title}>No Bookmarks</Title>
      </View>

      <Button
        onPress={refetch}
        mode="contained"
        color="#000"
      >
        Import Bookmarks
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: 16,
    marginTop: 26
  },
  illustration: {
    alignItems: 'center',
    height: 200,
    width: 200
  }
})

export default NoBookmark;