import React, { useState } from 'react';
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

const { Value, event, cond, eq, call, or } = Animated;

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

  const [dragging, setDragging] = useState(false);
  const [x, setX] = useState(0);
  const gestureState = new Value(-1);
  const offsetX = new Value(0);

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: offsetX,
        state: gestureState
      }
    }
  ])

  function start([]) {
    setDragging(true);
  }

  function moving([offsetX]) {
    setX(offsetX);
    console.log(offsetX);
  }

  function done([offsetX]) {
    setDragging(false);

    // Open the actions UI
    if (offsetX < -40) return setX(-160);
    // Close the actions UI
    if (offsetX > -40) return setX(0);
  }

  return (
    <View style={styles.container}>
      <Animated.Code>
        {() => 
          cond(
            eq(gestureState, State.BEGAN),
            call([], start)
          )
        }
      </Animated.Code>

      <Animated.Code>
        {() =>
          cond(
            eq(gestureState, State.ACTIVE),
            call([offsetX], moving)
          )
        }
      </Animated.Code>

      <Animated.Code>
        {() =>
          cond(
            or(
              eq(gestureState, State.END),
              eq(gestureState, State.FAILED),
              eq(gestureState, State.CANCELLED)
            ),
            call([offsetX], done)
          )
        }
      </Animated.Code>

      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View style={{
           zIndex: 2,
           translateX: x
        }}>
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
        </Animated.View>
      </PanGestureHandler>

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