import React, { useState } from 'react';
import { Linking } from 'expo';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Headline,
  Paragraph,
  FAB,
  TouchableRipple
} from 'react-native-paper';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Wrapper from '../../components/Layout/Wrapper';
import { Image } from 'react-native';
import usePinnedBookmarks from '../providers/hooks/usePinnedBookmarks';

interface Bookmark extends BookmarkInterface {
  index: number;
}

function BookmarkDetails({ navigation, route }) {
  const bookmark: Bookmark = route.params;
  const readBookmark = () => Linking.openURL(bookmark.permalink);

  const { isPinned, handlePinClick } = usePinnedBookmarks({
    id: bookmark.id,
    index: bookmark.index,
    title: bookmark.title,
    permalink: bookmark.permalink
  });

  console.log(bookmark);

  return (
    <React.Fragment>

      <ScrollView>

        { bookmark.thumbnail &&
          <View style={{ height: 250 }}>

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  title: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    marginBottom: 24,
    color: '#FFF'
  },
  FAB: {
    position: 'absolute',
    bottom: -20,
    right: 16,
    backgroundColor: '#000',
    borderColor: '#FFF',
    borderWidth: 2,
    marginLeft: 12
  },
  actionIcon: {
    position: 'absolute',
    padding: 16
  },
  pin: {
    right: 0
  }
});

export default BookmarkDetails;
