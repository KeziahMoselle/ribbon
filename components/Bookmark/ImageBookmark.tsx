import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from './BookmarkStyle';
import {
  Title,
  Caption,
  TouchableRipple,
  FAB
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
    <Swipeable
      renderLeftActions={() => <PinAction isPinned={isPinned} />}
      onSwipeableLeftOpen={handlePinClick}
      renderRightActions={() => <UnsaveAction onPress={unsaveBookmark} />}
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

function PinAction({ isPinned }) {
  return (
    <View style={styles.leftAction}>
      <FAB
        icon={isPinned ? 'pin' : 'pin-outline'}
        label={isPinned ? 'Saved' : 'Save'}
        color="#FFF"
        style={styles.leftActionBtn}
      />
    </View>
  )
}

function UnsaveAction({ onPress }) {
  return (
    <View style={styles.rightAction}>
      <FAB
        icon="delete"
        label="Unsave"
        color="#FFF"
        style={styles.rightActionBtn}
        onPress={onPress}
      />
    </View>
  )
}

export default Bookmark;