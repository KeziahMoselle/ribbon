import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useBookmarks } from '../providers/BookmarksProvider';
import useNotifications from '../providers/hooks/useNotifications';
import {
  Button,
  Caption,
  Dialog,
  Portal,
  Paragraph
} from 'react-native-paper';
import Section from './Section';


function Services () {
  const { isLoggedIn, username, login, logout } = useAuth();
  const { updateBookmarks } = useBookmarks();
  const { clearNotifications } = useNotifications();
  const [isAuthLoading, SetIsAuthLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function _handleRedditClick() {
    // If we are logged in
    // Show a confirmation dialog to logout
    if (isLoggedIn) return openConfirmationDialog()


    // Initiate login process
    SetIsAuthLoading(true);
    await login();
    await updateBookmarks();
    // Clear loading and disable state
    SetIsAuthLoading(false);
  }

  async function handleLogout() {
    setIsDialogOpen(false);
    await logout();
    updateBookmarks();
    clearNotifications();
    // Clear loading and disable state
    SetIsAuthLoading(false);
  }
  
  function openConfirmationDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
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

      <Portal>
        <Dialog visible={isDialogOpen}>
          <Dialog.Title>Warning !</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Do you really want to log out from Reddit ?
            </Paragraph>
            <Caption>
              Note: It will remove your pinned bookmarks.
            </Caption>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: 'space-between' }}>
            <Button
              color="#000"
              onPress={closeDialog}
            >
              Stay logged in
            </Button>

            <Button
              mode="contained"
              style={{ backgroundColor: '#F56565' }}
              onPress={handleLogout}
            >
              I want to log out
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Section>
  )
}

export default Services;
