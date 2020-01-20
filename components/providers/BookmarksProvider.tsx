import React, { useState, useEffect } from 'react';

const BookmarksContext = React.createContext({
  all: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState([
    {
      id: 0,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 1,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 2,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 3,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 4,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 5,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 6,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 7,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 8,
      title: 'My bookmark',
      url: 'https://google.com'
    },
    {
      id: 9,
      title: 'My bookmark',
      url: 'https://google.com'
    },
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