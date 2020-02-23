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

function BookmarkDetails({ navigation, route }) {
  const bookmark: BookmarkInterface = route.params;
  const readBookmark = () => Linking.openURL(bookmark.permalink);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

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
          <Menu.Item onPress={() => {}} title="Save" />
          <Menu.Item onPress={openMenu} title="Read" />
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

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <FAB
              icon="link"
              onPress={readBookmark}
              label="Read"
              style={{ backgroundColor: '#000' }}
            />
          </View>

          <Divider style={{ marginVertical: 16 }} />
          <Paragraph>{ bookmark.description }</Paragraph>
        </Wrapper>
      </ScrollView>
    </React.Fragment>
  )
}

export default BookmarkDetails;
