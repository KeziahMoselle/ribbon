import React, { useState } from 'react';
import { Linking } from 'expo';
import { View, ScrollView } from 'react-native';
import {
  Appbar,
  Subheading,
  Paragraph,
  Divider,
  FAB,
  Menu
} from 'react-native-paper';
import Wrapper from '../../components/Layout/Wrapper';
import { Image } from 'react-native';
import usePinnedBookmarks from '../providers/hooks/usePinnedBookmarks';

interface Bookmark extends BookmarkInterface {
  index: number;
}

function BookmarkDetails({ navigation, route }) {
  const bookmark: Bookmark = route.params;
  const readBookmark = () => Linking.openURL(bookmark.permalink);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const { isPinned, handlePinClick } = usePinnedBookmarks({
    id: bookmark.id,
    index: bookmark.index,
    title: bookmark.title,
    permalink: bookmark.permalink
  });

  return (
    <React.Fragment>
      <Appbar.Header statusBarHeight={0} style={{ backgroundColor: '#000' }}>
        <Appbar.BackAction
          onPress={navigation.goBack}
        />
        <Appbar.Content
          title={bookmark.title}
          subtitle={bookmark.subreddit}
        />

        <Menu
          visible={isMenuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
              color="white"
            />
          }
        >
          <Menu.Item onPress={handlePinClick} title={isPinned ? 'Unpin' : 'Pin'} />
          <Menu.Item onPress={readBookmark} title="Read" />
        </Menu>
      </Appbar.Header>

      <ScrollView>

        { bookmark.thumbnail &&
          <View style={{ height: 250 }}>
            <Image
              source={{ uri: bookmark.thumbnail }}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
                resizeMode: 'cover',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8
              }}
              />
          </View>
        }
      
        <Wrapper>
          <Subheading style={{ marginTop: 8, marginBottom: 16 }}>
            { bookmark.title }
          </Subheading>

          <Divider style={{ marginVertical: 16 }} />
          
          <Paragraph>{ bookmark.description }</Paragraph>
        </Wrapper>
      </ScrollView>
    </React.Fragment>
  )
}

export default BookmarkDetails;
