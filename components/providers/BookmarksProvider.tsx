import React, { useState, useEffect } from 'react';

const BookmarksContext = React.createContext({
  all: [],
  reddit: [],
  twitter: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState([])
  const [reddit, setReddit] = useState([
    {
      id: 0,
      title: 'My bookmark',
      url: 'https://google.com'
    }
  ]);
  const [twitter, setTwitter] = useState([
    {
      id: 1,
      title: 'My bookmark',
      url: 'https://google.com'
    }
  ]);

  useEffect(() => {
    setAll([
      ...reddit,
      ...twitter,
    ])
  }, [reddit, twitter])

  return (
    <BookmarksContext.Provider
      value={{
        all,
        reddit,
        twitter
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext, BookmarksProvider };