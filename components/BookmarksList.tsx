import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Bookmark from './Bookmark';

interface Props {
  bookmarks: BookmarkInterface[]
}

function BookmarksList(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.bookmarks}
        renderItem={({ item }) => (
          <Bookmark {...item} />
        )}
        keyExtractor={bookmark => String(bookmark.id)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 140
  }
})

export default BookmarksList
