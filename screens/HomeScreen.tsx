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

function HomeScreen() {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <Wrapper>
      <Title>Bookmarks</Title>

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
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 140
  }
})

export default HomeScreen;
