import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useBookmarks } from '../providers/BookmarksProvider';
import PinnedBookmark from './PinnedBookmark';

function BookmarksList() {
  const { pinnedBookmarks } = useBookmarks();

  useEffect(() => {
    console.log(pinnedBookmarks);
  }, [pinnedBookmarks])

  return (
    <FlatList
      data={pinnedBookmarks}
      renderItem={({ item, index }) => (
        <PinnedBookmark {...item} index={index} />
      )}
      keyExtractor={bookmark => String(bookmark.id)}
    />
  )
}

export default BookmarksList
