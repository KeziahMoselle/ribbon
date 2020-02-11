import React from 'react';
import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import styles from './BookmarkStyle';
import {
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import { Linking } from 'expo';
import usePinnedBookmarks from '../providers/hooks/usePinnedBookmarks';
import { useBookmarks } from '../providers/BookmarksProvider';

interface Props extends BookmarkInterface {
  index: number;
}

function Bookmark({
  id,
  kind,
  title,
  date,
  description,
  subreddit,
  permalink,
  thumbnail,
  url,
  index
 }: Props) {
   const { isPinned, handlePinClick } = usePinnedBookmarks({
     id,
     index,
     title,
     permalink
   });

   const { unsaveBookmark } = useBookmarks();

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 2 }}>
        <View style={[styles.header, styles.padding]}>
          <Title>{ subreddit }</Title>
          <Caption>{ date } ago</Caption>
        </View>

        <TouchableRipple
          onPress={() => Linking.openURL(permalink || url)}
          style={styles.imageContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.image}
          />
        </TouchableRipple>
      </View>

      <View style={{
        zIndex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#000',
        opacity: 0.5
      }}></View>
    </View>
  )
}

export default Bookmark;