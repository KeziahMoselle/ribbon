import React from 'react';
import { View, Image } from 'react-native';
import Swipeable from './Swipeable';
import styles from './BookmarkStyle';
import {
  Title,
  Caption,
  TouchableRipple,
  Paragraph
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
  excerpt,
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
      <View style={[styles.container, !thumbnail && styles.padding]}>

        <View style={[styles.header, thumbnail && styles.padding]}>
          <Title>{ subreddit }</Title>
          <Caption>{ date } ago</Caption>
        </View>

        { thumbnail &&
          <TouchableRipple
            onPress={() => Linking.openURL(permalink || url)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: thumbnail }}
              style={styles.image}
            />
          </TouchableRipple>
        }

        { !thumbnail &&
          <View style={styles.textContent}>
            { title && <Caption>{ title }</Caption>}
            { description && <Paragraph> { excerpt } </Paragraph>}
          </View>
        }
      </View>
    </Swipeable>
  )
}

export default Bookmark;
