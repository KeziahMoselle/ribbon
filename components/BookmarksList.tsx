import React from 'react';
import { FlatList } from 'react-native';
import { useBookmarks } from './providers/BookmarksProvider';
import Bookmark from './Bookmark';

function BookmarksList() {
  const { bookmarks, refetch, isUpdatingBookmarks } = useBookmarks();

  return (
    <FlatList
      data={bookmarks}
      renderItem={({ item, index }) => (
        <Bookmark {...item} index={index} />
      )}
      keyExtractor={bookmark => String(bookmark.id)}
      refreshing={isUpdatingBookmarks}
      onRefresh={refetch}
    />
  )
}

export default BookmarksList
