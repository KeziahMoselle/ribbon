import React, { useContext, useEffect } from 'react';
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
    setData: setPinnedBookmarks,
    status: pinnedStatus
  } = useAsync({
    promiseFn: RedditService.bootstrapPinnedBookmarksData
  })

  // Save pinnedBookmarks in AsyncStorage
  useEffect(() => {
    RedditService.savePinnedBookmarks(pinnedBookmarks);
  }, [pinnedBookmarks]);

  async function refetch() {
    try {
      RedditService.fetchSavedPosts();
    } catch (error) {
      console.log(error);
    } finally {
      updateBookmarks();
    }
  }

  function addToPinnedBookmarks(index: number) {
    const bookmark = bookmarks[index];
    if (!pinnedBookmarks) {
      setPinnedBookmarks([bookmark]);
    } else {
      setPinnedBookmarks([...pinnedBookmarks, bookmark]);
    }
  }

  function removeFromPinnedBookmarks(id: string): void {
    const filteredBookmarks = pinnedBookmarks.filter(bookmark => bookmark.id !== id);
    setPinnedBookmarks(filteredBookmarks);
  }

  function isPinnedBookmark(id: string): boolean {
    if (!pinnedBookmarks) return false;
    const isPinned = pinnedBookmarks.findIndex(bookmark => bookmark.id === id);
    if (isPinned === -1) return false;
    if (isPinned >= 0) return true;
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
        addToPinnedBookmarks,
        removeFromPinnedBookmarks,
        isPinnedBookmark,
        pinnedStatus
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