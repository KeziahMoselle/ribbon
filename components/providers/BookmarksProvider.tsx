import React, { useState, useEffect } from 'react';
import * as RedditService from './services/RedditService';

const BookmarksContext = React.createContext({
  all: []
});

function BookmarksProvider (props) {

  const [all, setAll] = useState<BookmarkInterface[]>([])

  useEffect(() => {
    if (all.length === 0) {
      getPosts();
    }
  }, [])

  async function getPosts() {
    try {
      const posts = await RedditService.getSavedPosts();
      console.log(posts);
      //setAll(posts);
    } catch (e) {}
  }

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