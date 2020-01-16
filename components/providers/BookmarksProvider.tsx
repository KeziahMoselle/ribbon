import React, { useState, useEffect } from 'react';
import Store from './utils/Store';
import GoogleSignIn from './services/GoogleService';

const BookmarksContext = React.createContext({
  all: [],
  reddit: [],
  twitter: [],
  youtube: [],
  addReddit: null,
  addTwitter: null,
  addYouTube: null
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

  
  function addReddit() {

  }

  function addTwitter() {

  }

  async function addYouTube() {
    const localState = await Store.getItem('GoogleOAuthKey');
    if (localState) return alert('Already connected');
    GoogleSignIn();
  } 

  
  return (
    <BookmarksContext.Provider
      value={{
        all,
        reddit,
        twitter,
        youtube,
        addReddit,
        addTwitter,
        addYouTube
      }}
    >
      {props.children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext, BookmarksProvider };