import React, { useState, useContext } from 'react';
import { useAsync } from 'react-async'
import RedditService from './services/RedditService';

const BookmarksContext = React.createContext<BookmarksProvider | null>(null);

function BookmarksProvider (props) {
  const {
    data: bookmarks,
    reload: updateBookmarks,
    status
  } = useAsync({
    promiseFn: RedditService.bootstrapBookmarksData
  })

  const {
    data: pinnedBookmarks,
    reload: updatePinnedBookmarks,
    setData: setPinnedBookmarks
  } = useAsync({
    promiseFn: RedditService.bootstrapPinnedBookmarksData
  })

  async function refetch() {
    try {
      RedditService.fetchSavedPosts();
    } catch (error) {
      console.log(error);
    } finally {
      updateBookmarks();
    }
  }

  async function addToPinnedBookmarks(index: number): Promise<void> {
    const bookmark = bookmarks[index];
    if (!pinnedBookmarks) {
      setPinnedBookmarks([bookmark]);
    } else {
      setPinnedBookmarks([...pinnedBookmarks, bookmark]);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        pinnedBookmarks,
        status,
        refetch,
        updateBookmarks,
        updatePinnedBookmarks,
        addToPinnedBookmarks
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