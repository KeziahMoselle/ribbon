import React, { useEffect } from 'react';
import { useAuth } from '../components/providers/AuthProvider';
import { Button, Caption } from 'react-native-paper';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';

function SettingsScreen () {
  const { isLoggedIn, username, login, logout } = useAuth();

  async function _handleRedditClick() {
    if (isLoggedIn) {
      await logout();
      return
    }

    await login();
  }

  useEffect(() => {
    console.log('SettingsScreen.tsx: ', isLoggedIn);
  }, [isLoggedIn])

  return (
    <Wrapper>
      <Title>Settings</Title>

      <Button
        onPress={() => _handleRedditClick()}
        mode="outlined"
        color="#FF5700"
        icon="reddit"
      >
        {isLoggedIn ? 'Revoke access' : 'Login with Reddit'}
      </Button>

      { isLoggedIn &&
        <Caption>
          Currently logged in as {username}
        </Caption>
      }
    </Wrapper>
  )
}

export default SettingsScreen;
