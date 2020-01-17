import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import useYoutube from './providers/hooks/useYoutube';

function SettingsScreen () {
  const { isYoutubeLoggedIn, Login, Logout } = useYoutube();

  function _handleYoutubeClick() {
    if (isYoutubeLoggedIn) {
      Logout();
    } else {
      Login();
    }
  }

  function _handleRedditClick() {
    
  }

  return (
    <View>
      <Text>Settings</Text>

      <Button
        title={isYoutubeLoggedIn ? 'Revoke YouTube access' : 'Login with YouTube'}
        onPress={() => _handleYoutubeClick()}
        color="#FF0000"
      />

      <Button
        title="Login with Reddit"
        onPress={() => _handleRedditClick()}
        color="#FF5700"
      />
    </View>
  )
}

export default SettingsScreen;
