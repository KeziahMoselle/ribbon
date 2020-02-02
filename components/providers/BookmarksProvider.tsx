import React, { useState, useEffect, useContext } from 'react';
import { useAsync } from 'react-async'
import RedditService from './services/RedditService';

const BookmarksContext = React.createContext({
  all: null,
  refetch: null,
  reload: null
});

function BookmarksProvider (props) {
  const [all, setAll] = useState<BookmarkInterface[]>([])
  const {
    data: redditPosts,
    reload
  } = useAsync({
    promiseFn: RedditService.bootstrapBookmarksData
  })

  useEffect(() => {
    console.log('redditPosts', redditPosts);
    if (redditPosts) {
      setAll([...all, ...redditPosts]);
    } else {
      setAll([]);
    }
  }, [redditPosts])

  async function refetch() {
    try {
      RedditService.fetchSavedPosts();
    } catch (error) {
      console.log(error);
    } finally {
      console.log('BookmarksProvider: Reload')
      reload();
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        all,
        refetch,
        reload
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

function useBookmarks() {
  const context = useContext(BookmarksContext);

  if (context === undefined) {
    throw new Error('useAuth must be used withing an AuthProvider');
  }
  
  return context
}

export { BookmarksContext, BookmarksProvider, useBookmarks };