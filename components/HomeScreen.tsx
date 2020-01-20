import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';
import { BookmarksContext } from './providers/BookmarksProvider';
import Bookmark from './Bookmark';

function HomeScreen() {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Bookmarks</Text>

      { Bookmarks.all.length === 0 && (
        <Text>No bookmarks</Text>
      )}
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Bookmarks.all}
          renderItem={({ item, index, separators }) => (
            <Bookmark {...item} />
          )}
          keyExtractor={bookmark => String(bookmark.id)}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 20
  },
  wrapper: {
    marginLeft: 24,
    marginRight: 24
  },
  container: {
    marginBottom: 140
  }
})

export default HomeScreen;
