import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import usePinnedBookmarks from '../providers/hooks/usePinnedBookmarks';
import { useBookmarks } from '../providers/BookmarksProvider';
import { PinAction, UnsaveAction } from './Actions';

interface Props {
  id: string;
  title: string;
  permalink: string;
  children: JSX.Element;
  index?: number;
  isPinned?: boolean;
  leftPress;
  rightPress;
}

function BookmarkActions({
  id,
  title,
  permalink,
  index = null,
  children,
  isPinned = null,
  leftPress = null,
  rightPress = null
 }: Props) {
  return (
    <Swipeable
      renderLeftActions={() => <PinAction isPinned={isPinned} onPress={leftPress} />}
      renderRightActions={() => <UnsaveAction onPress={rightPress} />}
    >
      { children }
    </Swipeable>
  )
}

export default BookmarkActions;
