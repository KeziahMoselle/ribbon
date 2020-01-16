import React, { useState, useEffect } from 'react';

const BookmarksContext = React.createContext({
  all: [],
  reddit: [],
  twitter: [],
  youtube: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState([])
  const [reddit, setReddit] = useState([
    {
      id: 0,
      title: 'My bookmark'
    }
  ]);
  const [twitter, setTwitter] = useState([
    {
      id: 1,
      title: 'My bookmark'
    }
  ]);
  const [youtube, setYoutube] = useState([
    {
      id: 2,
      title: 'My bookmark'
    }
  ]);

  useEffect(() => {
    setAll([
      ...reddit,
      ...twitter,
      ...youtube
    ])
  }, [reddit, twitter, youtube])

  return (
    <BookmarksContext.Provider
      value={{
        all,
        reddit,
        twitter,
        youtube
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext, BookmarksProvider };