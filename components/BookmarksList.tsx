import React from 'react';
import { FlatList } from 'react-native';
import Bookmark from './Bookmark';

interface Props {
  bookmarks: BookmarkInterface[]
}

function BookmarksList(props: Props) {
  return (
    <FlatList
      data={props.bookmarks}
      renderItem={({ item }) => (
        <Bookmark {...item} />
      )}
      keyExtractor={bookmark => String(bookmark.id)}
    />
  )
}

export default BookmarksList
