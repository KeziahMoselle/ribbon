import React from 'react';
import { View } from 'react-native';
import { Appbar, Subheading } from 'react-native-paper';
import Wrapper from '../../components/Layout/Wrapper';
import { Image } from 'react-native';

function BookmarkDetails({ navigation, route }) {
  const bookmark: BookmarkInterface = route.params;

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
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

          
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
      
      <Wrapper>

        <Subheading style={{ marginTop: 8 }}>{ bookmark.title }</Subheading>

      </Wrapper>
    </React.Fragment>
  )
}

export default BookmarkDetails;
