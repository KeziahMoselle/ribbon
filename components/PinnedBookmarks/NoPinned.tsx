import React, { useState, useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useAuth } from '../providers/AuthProvider';
import { useBookmarks } from '../providers/BookmarksProvider';

function NoBookmark() {
  const { navigate } = useContext(NavigationContext);
  const { isLoggedIn, login } = useAuth();
  const { refetch } = useBookmarks();
  const [isImportLoading, setIsImportLoading] = useState(false);


  /**
   * Is logged in : Navigate to bookmarks screen
   * If not logged in : Initiate the OAuth process
   * and refetch
   */
  async function importBookmarks() {
    setIsImportLoading(true);
    if (isLoggedIn) {
      navigate('Bookmarks');
    } else {
      await login();
      await refetch();
      navigate('Bookmarks');
    }
    setIsImportLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.illustration}
          source={require('../../assets/bulb.png')}
        />
        <Title style={styles.title}>No Pinned Bookmarks</Title>
      </View>

      <Button
        onPress={importBookmarks}
        mode="contained"
        color="#000"
        loading={isImportLoading}
        disabled={isImportLoading}
      >
        { isLoggedIn
          ? 'Add Pinned Bookmarks !'
          : 'Import bookmarks first !'
        }
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    padding: 46,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000'
  },
  title: {
    fontSize: 16,
    marginTop: 26
  },
  illustration: {
    alignItems: 'center',
    height: 200,
    width: 200
  }
})

export default NoBookmark;