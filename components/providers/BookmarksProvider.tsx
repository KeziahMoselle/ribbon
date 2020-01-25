import React, { useState } from 'react';
import * as RedditService from './services/RedditService';

const BookmarksContext = React.createContext({
  all: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState<BookmarkInterface[]>([])

  return (
    <BookmarksContext.Provider
      value={{
        all
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext, BookmarksProvider };