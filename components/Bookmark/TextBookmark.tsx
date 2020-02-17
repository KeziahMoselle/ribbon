import React from 'react';
import { View } from 'react-native';
import styles from './BookmarkStyle';
import {
  Title,
  Paragraph,
  Caption
} from 'react-native-paper';
import { Linking } from 'expo';
import Swipeable from './Swipeable';
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
      <View style={[styles.container, styles.padding]}>
        <View style={styles.header}>
          <Title>{ subreddit }</Title>
          <Caption>{ date } ago</Caption>
        </View>

        <View style={styles.textContent}>
          { title && <Caption>{ title }</Caption>}
          { description && <Paragraph> { description } </Paragraph>}
        </View>
      </View>
    </Swipeable>
  )
}

export default Bookmark;
