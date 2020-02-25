import useNotifications from './useNotifications'
import { useBookmarks } from '../BookmarksProvider'

function usePinnedBookmarks ({
  id,
  index = null,
  title = null,
  permalink = null
}) {
  const {
    removeFromNotificationQueue,
    queueNotification
  } = useNotifications()

  const {
    isPinnedBookmark,
    removeFromPinnedBookmarks,
    addToPinnedBookmarks
  } = useBookmarks()

  const isPinned = isPinnedBookmark(id)

  async function handlePinClick () {
    if (isPinned) return handleUnpinClick()

    addToPinnedBookmarks(index)

    await queueNotification({
      id,
      body: title || permalink,
      permalink
    })
  }

  async function handleUnpinClick () {
    await removeFromNotificationQueue(id)
    await removeFromPinnedBookmarks(id)
  }

  return {
    handlePinClick,
    handleUnpinClick,
    isPinned
  }
}

export default usePinnedBookmarks
