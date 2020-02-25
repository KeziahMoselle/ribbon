import React from 'react'
import { BookmarksProvider } from './BookmarksProvider'
import { AuthProvider } from './AuthProvider'
import { Provider as PaperProvider } from 'react-native-paper'

function Context ({ children }) {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <PaperProvider>
          { children }
        </PaperProvider>
      </BookmarksProvider>
    </AuthProvider>
  )
}

export default Context
