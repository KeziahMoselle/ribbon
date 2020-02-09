import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useBookmarks } from '../providers/BookmarksProvider';
import useNotifications from '../providers/hooks/useNotifications';
import {
  Button,
  Caption
} from 'react-native-paper';
import Section from './Section';


function Services () {
  const { isLoggedIn, username, login, logout } = useAuth();
  const { updateBookmarks } = useBookmarks();
  const { clearNotifications } = useNotifications();
  const [isAuthLoading, SetIsAuthLoading] = useState(false);

  async function _handleRedditClick() {
    // Loading and disable button
    SetIsAuthLoading(true);
    
    if (isLoggedIn) {
      await logout();
      updateBookmarks();
      clearNotifications();
      // Clear loading and disable state
      SetIsAuthLoading(false);
      return
    }

    await login();
    await updateBookmarks();
    // Clear loading and disable state
    SetIsAuthLoading(false);
  }
  
  return (
    <Section title="Services">
      <Button
        onPress={_handleRedditClick}
        loading={isAuthLoading}
        disabled={isAuthLoading}
        mode="outlined"
        color="#FF5700"
        icon="reddit"
        style={{ marginVertical: 1 }}
      >
        {isLoggedIn ? 'Revoke access' : 'Login with Reddit'}
      </Button>

      { isLoggedIn &&
        <Caption>
          Currently logged in as {username}
        </Caption>
      }
    </Section>
  )
}

export default Services;
