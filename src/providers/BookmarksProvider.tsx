import React, { useContext, useEffect, useState } from 'react'
import { useAsync } from 'react-async'
import RedditService from './services/RedditService'

const BookmarksContext = React.createContext<BookmarksProvider | null>(null)

function BookmarksProvider (props) {
  const [isUpdatingBookmarks, setIsUpdatingBookmarks] = useState(false)

  const {
    data: bookmarks,
    reload: updateBookmarks,
    setData: setBookmarks,
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
    RedditService.savePinnedBookmarks(pinnedBookmarks)
  }, [pinnedBookmarks])

  useEffect(() => {
    RedditService.saveBookmarks(bookmarks)
  }, [bookmarks])

  // Updating bookmarks at launch
  /* useEffect(() => {
    if (isFulfilled && !isUpdatingFinished) {
      refetch();
    }
  }, [isFulfilled]) */

  /**
   * Invoked by Pull to refresh or "Import" btn
   * It will refetch saved posts and update the UI
   */
  async function refetch () {
    try {
      setIsUpdatingBookmarks(true)
      await RedditService.fetchAllSavedPosts()
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdatingBookmarks(false)
      updateBookmarks()
    }
  }

  /**
   * Add the bookmark
   */
  function addToPinnedBookmarks (index: number) {
    const bookmark = bookmarks[index]
    if (!pinnedBookmarks) {
      setPinnedBookmarks([bookmark])
    } else {
      setPinnedBookmarks([...pinnedBookmarks, bookmark])
    }
  }

  function removeFromPinnedBookmarks (id: string): void {
    const filteredBookmarks = pinnedBookmarks.filter(bookmark => bookmark.id !== id)
    setPinnedBookmarks(filteredBookmarks)
  }

  function isPinnedBookmark (id: string): boolean {
    if (!pinnedBookmarks) return false
    const isPinned = pinnedBookmarks.findIndex(bookmark => bookmark.id === id)
    if (isPinned === -1) return false
    if (isPinned >= 0) return true
  }

  async function unsaveBookmark (id: string) {
    try {
      // Remove from Reddit
      await RedditService.unsavePost(id)

      // Remove in pinned bookmarks if it's there
      if (isPinnedBookmark(id)) {
        removeFromPinnedBookmarks(id)
      }
      // Remove from bookmarks
      await removeFromBookmarks(id)
    } catch (error) {
      alert(`Error when unsaving post. (${error.error}: ${error.message})`)
    }
  }

  async function removeFromBookmarks (id: string) {
    const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
    setBookmarks(filteredBookmarks)
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
        pinnedStatus,
        unsaveBookmark,
        isUpdatingBookmarks
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

function useBookmarks (): BookmarksProvider {
  const context = useContext(BookmarksContext)

  if (context === undefined) {
    throw new Error('useBookmarks must be used withing a BookmarksProvider')
  }

  return context
}

export { BookmarksContext, BookmarksProvider, useBookmarks }
