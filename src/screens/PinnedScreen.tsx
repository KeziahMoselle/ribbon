import React from 'react'
import { useBookmarks } from '../providers/BookmarksProvider'
import Wrapper from '../components/Layout/Wrapper'
import Title from '../components/Title'
import PinnedList from '../components/PinnedBookmarks/PinnedList'
import NoPinned from '../components/PinnedBookmarks/NoPinned'
import { SafeAreaView } from 'react-native'

function HomeScreen () {
  const { pinnedStatus, pinnedBookmarks } = useBookmarks()

  return (
    <Wrapper>
      <Title>Pinned Bookmarks</Title>

      { (pinnedStatus !== 'fulfilled' || pinnedBookmarks.length === 0) && (
        <NoPinned />
      )}

      <SafeAreaView>
        { pinnedStatus === 'fulfilled' && (
          <PinnedList />
        )}
      </SafeAreaView>
    </Wrapper>
  )
}

export default HomeScreen
