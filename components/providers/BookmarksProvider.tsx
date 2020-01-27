import React, { useState } from 'react';
import * as RedditService from './services/RedditService';

const BookmarksContext = React.createContext({
  all: []
});

function BookmarksProvider (props) {
  const [all, setAll] = useState<BookmarkInterface[]>([])

  async function getPosts() {
    try {
      const posts = await RedditService.getSavedPosts();
      console.log(JSON.stringify(posts));
      setAll(posts);
    } catch (e) {}
  }
    
  // getPosts();

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