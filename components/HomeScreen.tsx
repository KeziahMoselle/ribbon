import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { BookmarksContext } from './providers/BookmarksProvider';

function HomeScreen () {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <View>
      <Text>Bookmarks</Text>
      { Bookmarks.all.length === 0 && (
        <Text>No bookmarks</Text>
      )}
      
      { Bookmarks.all.length > 0 &&
        Bookmarks.all.map(bookmark => <Text>{bookmark}</Text>)
      }
    </View>
  )
}

export default HomeScreen;
