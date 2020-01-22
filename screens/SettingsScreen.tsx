import React, { useContext } from 'react';
import { useAuth } from '../components/providers/AuthProvider';
import { Button } from 'react-native';
import Wrapper from '../components/Layout/Wrapper';
import Title from '../components/Title';

function SettingsScreen () {
  const Reddit = useAuth();

  function _handleRedditClick() {
    if (Reddit.token) {
      return Reddit.logout();
    }

    Reddit.login();
  }

  return (
    <Wrapper>
      <Title>Settings</Title>

      <Button
        title={Reddit.token ? 'Revoke access' : 'Login with Reddit'}
        onPress={() => _handleRedditClick()}
        color="#FF5700"
      />
    </Wrapper>
  )
}

export default SettingsScreen;
