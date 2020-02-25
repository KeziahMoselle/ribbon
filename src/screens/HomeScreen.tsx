import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, BackHandler } from 'react-native';
import { TouchableRipple, Searchbar } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useBookmarks } from '../../components/providers/BookmarksProvider';
import Wrapper from '../../components/Layout/Wrapper';
import Title from '../../components/Title';
import NoBookmark from '../../components/Bookmark/NoBookmark';
import BookmarkDetails from '../../components/Bookmark/BookmarkDetails';
import { Feather } from '@expo/vector-icons';
import Bookmark from '../../components/Bookmark';

const HomeStack = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Bookmarks" headerMode="none">
      <HomeStack.Screen
        name="Bookmarks"
        component={Bookmarks}
      />

      <HomeStack.Screen
        name="BookmarkDetails"
        component={BookmarkDetails}
      />
    </HomeStack.Navigator>
  )
}

function Bookmarks() {
  const { status, bookmarks, refetch, isUpdatingBookmarks } = useBookmarks();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkInterface[]>([]);

  useEffect(() => {
    const filteredQuery = query.trim();
    if (!filteredQuery) return setFilteredBookmarks([]);

    const filtered = bookmarks.filter(bookmark => {
      if (bookmark.title?.includes(filteredQuery)) return true;
      if (bookmark.subreddit?.includes(filteredQuery)) return true;
      if (bookmark.description?.includes(filteredQuery)) return true;
    })

    setFilteredBookmarks(filtered);
  }, [query]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!isSearching) return;

      setIsSearching(false);
      return true;
    })

    return () => handler.remove();
  }, [isSearching])

  return (
    <Wrapper>
      <View style={styles.header}>
        <Title>Bookmarks</Title>
        <TouchableRipple
          style={{ padding: 4 }}
          onPress={() => setIsSearching(!isSearching)}
          borderless={true}
        >
          <Feather name="search" size={20} color="#000" />
        </TouchableRipple>
      </View>

      { isSearching && (
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search..."
            onChangeText={query => setQuery(query)}
            value={query}
          />
        </View>
      )}

      { status !== 'fulfilled' && (
        <NoBookmark />
      )}
        
      { (status === 'fulfilled' && !isSearching) && (
        <SafeAreaView>
          <FlatList
            data={bookmarks}
            renderItem={({ item, index }) => (
              <Bookmark {...item} index={index} />
            )}
            keyExtractor={bookmark => String(bookmark.id)}
            refreshing={isUpdatingBookmarks}
            onRefresh={refetch}
          />
        </SafeAreaView>
      )}

      { isSearching && (
        <SafeAreaView>
          <FlatList
            data={filteredBookmarks}
            renderItem={({ item, index }) => (
              <Bookmark {...item} index={index} />
            )}
            keyExtractor={bookmark => String(bookmark.id)}
            refreshing={isUpdatingBookmarks}
            onRefresh={refetch}
          />
        </SafeAreaView>
      )}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchBarContainer: {
    position: 'absolute',
    top: 6,
    width: '100%'
  }
})

export default HomeScreen;
