import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Title,
  Paragraph,
  Caption,
  Button,
  Chip,
  TouchableRipple
} from 'react-native-paper';
import { Linking } from 'expo';
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
  const { removeFromPinnedBookmarks } = useBookmarks();

  return (
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

      <View style={styles.footer}>
        <Chip
          icon={kind.toLowerCase()}
        >
          { kind }
        </Chip>

        <Button
          onPress={() => removeFromPinnedBookmarks(id)}
          mode="contained"
          color="#000"
          icon="pin-outline"
          contentStyle={{ height: 34 }}
        >
          Unpin
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 26
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    width: '100%',
    height: 150
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 8
  },
  textContent: {
    maxHeight: 150,
    minHeight: 50,
    elevation: 1,
    overflow: 'hidden'
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default Bookmark;