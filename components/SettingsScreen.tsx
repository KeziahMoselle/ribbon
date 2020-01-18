import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import useReddit from './providers/hooks/useReddit';

function SettingsScreen () {
  const { isLoggedIn, Login, Logout } = useReddit();

  function _handleRedditClick() {
    if (isLoggedIn) {
      Logout();
    } else {
      Login();
    }
  }

  return (
    <View>
      <Text>Settings</Text>

      <Button
        title="Login with Reddit"
        onPress={() => _handleRedditClick()}
        color="#FF5700"
      />
    </View>
  )
}

export default SettingsScreen;
