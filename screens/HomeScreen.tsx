import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';
import { BookmarksContext } from '../components/providers/BookmarksProvider';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';
import Bookmark from '../components/Bookmark';
import NoBookmark from '../components/NoBookmark';

function HomeScreen() {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <Wrapper>
      <Title>Bookmarks</Title>

      { Bookmarks.all.length === 0 && (
        <NoBookmark />
      )}
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Bookmarks.all}
          renderItem={({ item }) => (
            <Bookmark {...item} />
          )}
          keyExtractor={bookmark => String(bookmark.id)}
        />
      </SafeAreaView>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 140
  }
})

export default HomeScreen;
