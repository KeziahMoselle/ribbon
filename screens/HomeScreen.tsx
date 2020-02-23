import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useBookmarks } from '../components/providers/BookmarksProvider';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';
import BookmarksList from '../components/BookmarksList';
import NoBookmark from '../components/Bookmark/NoBookmark';
import BookmarkDetails from '../components/Bookmark/BookmarkDetails';

const HomeStack = createStackNavigator();

function HomeScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Bookmarks"
      headerMode="none"
    >
      <HomeStack.Screen name="Bookmarks" component={Bookmarks} />
      <HomeStack.Screen name="BookmarkDetails" component={BookmarkDetails} />
    </HomeStack.Navigator>
  )
}

function Bookmarks() {
  const { status } = useBookmarks();

  return (
    <Wrapper>
      <Title>Bookmarks</Title>

      { status !== 'fulfilled' && (
        <NoBookmark />
      )}
        
      <SafeAreaView>
        { status === 'fulfilled' && (
          <BookmarksList />
        )}
      </SafeAreaView>
    </Wrapper>
  )
}

export default HomeScreen;
