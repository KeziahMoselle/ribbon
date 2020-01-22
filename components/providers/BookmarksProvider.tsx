import React, { useState } from 'react';

const BookmarksContext = React.createContext({
  all: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState<BookmarkInterface[]>([
    {
      id: 0,
      title: 'My bookmark',
      url: 'https://google.com'
    }
  ])

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