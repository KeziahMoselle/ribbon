import React, { useEffect } from 'react';
import { useAuth } from '../components/providers/AuthProvider';
import { Button } from 'react-native';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';

function SettingsScreen () {
  const { isLoggedIn, login, logout } = useAuth();

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
        title={isLoggedIn ? 'Revoke access' : 'Login with Reddit'}
        onPress={() => _handleRedditClick()}
        color="#FF5700"
      />
    </Wrapper>
  )
}

export default SettingsScreen;
