import React from 'react';
import { useBookmarks } from '../components/providers/BookmarksProvider';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';
import BookmarksList from '../components/BookmarksList';
import NoBookmark from '../components/NoBookmark';
import { SafeAreaView } from 'react-native';

function HomeScreen() {
  const { status } = useBookmarks();

  return (
    <Wrapper>
        <Title>Bookmarks</Title>

        { status === 'initial' || status === 'pending' && (
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
