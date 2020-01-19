import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BookmarksContext } from './providers/BookmarksProvider';
import Bookmark from './Bookmark';

function HomeScreen () {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>

      { Bookmarks.all.length === 0 && (
        <Text>No bookmarks</Text>
      )}
      
      { Bookmarks.all.length > 0 &&
        Bookmarks.all.map(bookmark => (
            <Bookmark
              key={bookmark.id}
              {...bookmark}
            />
          )
        )
      }
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
  container: {
    marginLeft: 16,
    marginRight: 16
  }
})

export default HomeScreen;
