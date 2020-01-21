import { useState, useEffect } from 'react';
import * as RedditService from '../services/RedditService';

function useReddit() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    init();
  }, [])

  async function init() {
    const token = await RedditService.getToken();
    console.log(token)
    if (!token) {
      return setIsLoggedIn(false);
    }
    setToken(token);
    setIsLoggedIn(true);
  }

  async function Login() {
    const success = await RedditService.SignIn();
    if (!success) {
      setIsLoggedIn(false);
      setToken(null);
      return
    }

    setIsLoggedIn(true);
    const token = await RedditService.getToken();
    setToken(token);
  }

  async function Logout() {
    await RedditService.Disconnect();
    setIsLoggedIn(false);
    setToken(null);
  }

  return {
    isLoggedIn,
    token,
    Login,
    Logout
  };
}

export default useReddit;