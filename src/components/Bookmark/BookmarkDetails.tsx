import React from 'react'
import { Linking } from 'expo'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import {
  Headline,
  Paragraph,
  FAB,
  TouchableRipple
} from 'react-native-paper'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import Wrapper from '../Layout/Wrapper'

import usePinnedBookmarks from '../../providers/hooks/usePinnedBookmarks'

interface Bookmark extends BookmarkInterface {
  index: number;
}

function BookmarkDetails ({ navigation, route }) {
  const bookmark: Bookmark = route.params
  const readBookmark = () => Linking.openURL(bookmark.permalink)

  const { isPinned, handlePinClick } = usePinnedBookmarks({
    id: bookmark.id,
    index: bookmark.index,
    title: bookmark.title,
    permalink: bookmark.permalink
  })

  return (
    <React.Fragment>

      <ScrollView>

        { bookmark.thumbnail &&
          <View style={styles.imageContainer}>

            <Image
              source={{ uri: bookmark.thumbnail }}
              style={styles.image}
            />

            <View style={styles.overlay} />

            <Headline style={styles.title}>
              { bookmark.title }
            </Headline>

            <TouchableRipple
              style={styles.actionIcon}
              onPress={navigation.goBack}
              borderless={true}
            >
              <Feather name="arrow-left" size={20} color="#FFF" />
            </TouchableRipple>

            <TouchableRipple
              onPress={handlePinClick}
              style={[styles.actionIcon, styles.pin]}
              borderless={true}
            >
              <MaterialCommunityIcons
                name={isPinned ? 'pin' : 'pin-outline'}
                size={20}
                color="#FFF"
              />
            </TouchableRipple>

            <FAB
              onPress={readBookmark}
              icon="link"
              style={styles.FAB}
            />
          </View>
        }

        <Wrapper>
          <Paragraph>{ bookmark.description }</Paragraph>
        </Wrapper>
      </ScrollView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 250
  },
  FAB: {
    backgroundColor: '#000',
    borderColor: '#FFF',
    borderWidth: 2,
    bottom: -20,
    marginLeft: 12,
    position: 'absolute',
    right: 16
  },
  actionIcon: {
    padding: 16,
    position: 'absolute'
  },
  image: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1,
    height: undefined,
    resizeMode: 'cover',
    width: undefined
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  pin: {
    right: 0
  },
  title: {
    bottom: 0,
    color: '#FFF',
    marginBottom: 24,
    padding: 16,
    position: 'absolute'
  }
})

export default BookmarkDetails
