import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button, Title } from 'react-native-paper'
import { useAuth } from '../../providers/AuthProvider'
import { useBookmarks } from '../../providers/BookmarksProvider'

function NoBookmark () {
  const { isLoggedIn, login } = useAuth()
  const { refetch } = useBookmarks()
  const [isImportLoading, setIsImportLoading] = useState(false)

  /**
   * Is logged in : refetch bookmarks from Reddit
   * If not logged in : Initiate the OAuth process
   * and refetch
   */
  async function importBookmarks () {
    setIsImportLoading(true)
    if (isLoggedIn) {
      await refetch()
    } else {
      await login()
      await refetch()
    }
    setIsImportLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.illustration}
          source={require('../../assets/empty.png')}
        />
        <Title style={styles.title}>No Bookmarks yet !</Title>
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
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 16,
    padding: 46
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  illustration: {
    alignItems: 'center',
    height: 200,
    width: 200
  },
  title: {
    fontSize: 16,
    marginTop: 26
  }
})

export default NoBookmark
