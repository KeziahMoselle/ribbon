import React, { useContext } from 'react';
import { useAsync } from 'react-async'
import RedditService from './services/RedditService';

const BookmarksContext = React.createContext<BookmarksProvider | null>(null);

function BookmarksProvider (props) {
  const {
    data: bookmarks,
    reload,
    status
  } = useAsync({
    promiseFn: RedditService.bootstrapBookmarksData
  })

  async function refetch() {
    try {
      RedditService.fetchSavedPosts();
    } catch (error) {
      console.log(error);
    } finally {
      reload();
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        status,
        refetch,
        reload
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

function useBookmarks(): BookmarksProvider {
  const context = useContext(BookmarksContext);

  if (context === undefined) {
    throw new Error('useBookmarks must be used withing a BookmarksProvider');
  }
  
  return context
}

export { BookmarksContext, BookmarksProvider, useBookmarks };