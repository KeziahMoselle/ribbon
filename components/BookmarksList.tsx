import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useBookmarks } from './providers/BookmarksProvider';
import Bookmark from './Bookmark';

function BookmarksList() {
  const { bookmarks, refetch } = useBookmarks();
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function onRefresh() {
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <FlatList
      data={bookmarks}
      renderItem={({ item }) => (
        <Bookmark {...item} />
      )}
      keyExtractor={bookmark => String(bookmark.id)}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  )
}

export default BookmarksList
