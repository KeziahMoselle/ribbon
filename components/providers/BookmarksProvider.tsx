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
    'My bookmark'
  ]);
  const [twitter, setTwitter] = useState([
    'My bookmark'
  ]);
  const [youtube, setYoutube] = useState([
    'My bookmark'
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
        youtube,
        setReddit,
        setTwitter,
        setYoutube
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext, BookmarksProvider };