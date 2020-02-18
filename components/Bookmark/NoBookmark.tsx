import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useAuth } from '../providers/AuthProvider';
import { useBookmarks } from '../providers/BookmarksProvider';

function NoBookmark() {
  const { isLoggedIn, login } = useAuth();
  const { refetch } = useBookmarks();
  const [isImportLoading, setIsImportLoading] = useState(false);


  /**
   * Is logged in : refetch bookmarks from Reddit
   * If not logged in : Initiate the OAuth process
   * and refetch
   */
  async function importBookmarks() {
    setIsImportLoading(true);
    if (isLoggedIn) {
      await refetch();
    } else {
      await login();
      await refetch();
    }
    setIsImportLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.illustration}
          source={require('../../assets/empty.png')}
        />
        <Title style={styles.title}>No Bookmarks</Title>
      </View>

      <Button
        onPress={importBookmarks}
        mode="contained"
        color="#000"
        loading={isImportLoading}
        disabled={isImportLoading}
      >
        Import Bookmarks
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