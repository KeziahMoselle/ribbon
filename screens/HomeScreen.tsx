import React from 'react';
import { useBookmarks } from '../components/providers/BookmarksProvider';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';
import BookmarksList from '../components/BookmarksList';
import NoBookmark from '../components/NoBookmark';

function HomeScreen() {
  const Bookmarks = useBookmarks();

  return (
    <Wrapper>
      <Title>Bookmarks</Title>

      { Bookmarks.all.length === 0 && (
        <NoBookmark />
      )}
      
      { Bookmarks.all.length > 0 && (
        <BookmarksList bookmarks={Bookmarks.all} />
      )}
    </Wrapper>
  )
}

export default HomeScreen;
