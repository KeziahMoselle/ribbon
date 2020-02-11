import React from 'react';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import ImageBookmark from './Bookmark/ImageBookmark';
import TextBookmark from './Bookmark/TextBookmark';

interface Props extends BookmarkInterface {
  index: number;
}

function Bookmark(props: Props) {
  return (
    <React.Fragment>
      { props.thumbnail && <ImageBookmark {...props} />}

      { !props.thumbnail && <TextBookmark {...props} />}
    </React.Fragment>
  )
}

export default Bookmark;
