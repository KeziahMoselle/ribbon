import React from 'react';
import { BookmarksProvider } from './BookmarksProvider';
import { AuthProvider } from './AuthProvider';

function Context ({ children }) {
  return (
    <AuthProvider>
      <BookmarksProvider>
        { children }
      </BookmarksProvider>
    </AuthProvider>
  )
}

export default Context;
