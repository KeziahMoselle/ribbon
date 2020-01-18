import React, { useState, useEffect } from 'react';
import * as RedditService from '../services/RedditService';

function useReddit() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [oauth, setOauth] = useState(null);

  useEffect(() => {
    init();
  }, [])

  async function init() {
    const oauth = await RedditService.getOauth();
    setOauth(oauth);
    if (oauth) setIsLoggedIn(true);
  }

  async function Login() {
    try {
      await RedditService.SignIn();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      alert(error);
    }
  }

  async function Logout() {
    await RedditService.Disconnect();
    setIsLoggedIn(false);
  }

  return {
    isLoggedIn,
    oauth,
    Login,
    Logout
  };
}

export default useReddit;