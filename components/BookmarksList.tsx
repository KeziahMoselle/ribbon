import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useBookmarks } from './providers/BookmarksProvider';
import Bookmark from './Bookmark';
import PinnedBookmark from './PinnedBookmark';

function BookmarksList() {
  const { bookmarks, pinnedBookmarks, refetch } = useBookmarks();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('pinnedBookmarks: ', pinnedBookmarks);
  }, [pinnedBookmarks])

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
      renderItem={({ item, index }) => (
        <Bookmark {...item} index={index} />
      )}
      keyExtractor={bookmark => String(bookmark.id)}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  )
}

export default BookmarksList
