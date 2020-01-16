import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { BookmarksContext } from './providers/BookmarksProvider';

function SettingsScreen () {
  const Bookmarks = useContext(BookmarksContext);

  return (
    <View>
      <Text>Settings</Text>

      <Button
        title="Connect Reddit"
        onPress={() => Bookmarks.addReddit()}
      />

      <Button
        title="Connect Twitter"
        onPress={() => Bookmarks.addTwitter()}
      />

      <Button
        title="Connect YouTube"
        onPress={() => Bookmarks.addYouTube()}
      />
    </View>
  )
}

export default SettingsScreen;
