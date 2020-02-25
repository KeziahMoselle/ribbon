import React from 'react'
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swipeable from './Swipeable'
import styles from './BookmarkStyle'
import {
  Title,
  Caption,
  TouchableRipple,
  Paragraph
} from 'react-native-paper'
import usePinnedBookmarks from '../../providers/hooks/usePinnedBookmarks'
import { useBookmarks } from '../../providers/BookmarksProvider'

interface Props extends BookmarkInterface {
  index: number;
}

function Bookmark ({
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
  const navigation = useNavigation()
  const { isPinned, handlePinClick } = usePinnedBookmarks({
    id,
    index,
    title,
    permalink
  })
  const { unsaveBookmark } = useBookmarks()
  const rightPress = () => unsaveBookmark(id)
  const onBookmarkPress = () => navigation.navigate('BookmarkDetails', {
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
  })

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
      <TouchableRipple onPress={onBookmarkPress}>
        <View style={[styles.container, !thumbnail && styles.padding]}>

          <View style={[styles.header, thumbnail && styles.padding]}>
            <Title>{ subreddit }</Title>
            <Caption>{ date } ago</Caption>
          </View>

          { thumbnail &&
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: thumbnail }}
                style={styles.image}
              />
            </View>
          }

          { !thumbnail &&
            <View style={styles.textContent}>
              { title && <Caption>{ title }</Caption>}
              { excerpt && <Paragraph> { excerpt } </Paragraph>}
            </View>
          }
        </View>
      </TouchableRipple>
    </Swipeable>
  )
}

export default Bookmark
