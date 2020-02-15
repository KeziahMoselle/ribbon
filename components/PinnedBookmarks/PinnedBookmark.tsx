import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styles from '../Bookmark/BookmarkStyle';
import {
  Title,
  Paragraph,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import Swipeable from '../Bookmark/Swipeable';
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
  url
 }: Props) {
  const { handleUnpinClick } = usePinnedBookmarks({ id });
  const { unsaveBookmark } = useBookmarks();

  return (
    <Swipeable
      id={id}
      title={title}
      permalink={permalink}
      leftPress={handleUnpinClick}
      rightPress={unsaveBookmark}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Title>{ subreddit }</Title>
          <Caption>{ date } ago</Caption>
        </View>

        { thumbnail && (
          <TouchableRipple
            onPress={() => Linking.openURL(permalink || url)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: thumbnail }}
              style={styles.image}
            />
          </TouchableRipple>
        )}

        { !thumbnail && (
          <View style={styles.textContent}>
            { title && <Caption>{ title }</Caption>}
            { description && <Paragraph>{ description }</Paragraph> }
          </View>
        )}
      </View>
    </Swipeable>
  )
}

export default Bookmark;