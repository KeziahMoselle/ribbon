import React from 'react';
import { View, Image } from 'react-native';
import Swipeable from './Swipeable';
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
  const rightPress = () => unsaveBookmark(id);

  return (
    <Swipeable
      id={id}
      title={title}
      permalink={permalink}
      index={index}
      leftPress={handlePinClick}
      isPinned={isPinned}
      rightPress={rightPress}
    >
      <View style={styles.container}>
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
    </Swipeable>
  )
}

export default Bookmark;
