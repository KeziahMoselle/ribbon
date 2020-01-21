import React from 'react';
import { Button } from 'react-native';
import useReddit from '../components/providers/hooks/useReddit';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';

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
