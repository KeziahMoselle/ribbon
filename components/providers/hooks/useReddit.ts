import { useState, useEffect } from 'react';
import * as RedditService from '../services/RedditService';

function useReddit() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    init();
  }, [])

  async function init() {
    const token = await RedditService.getToken();
    setToken(token);
    if (token) setIsLoggedIn(true);
  }

  async function Login() {
    const success = await RedditService.SignIn();
    if (!success) return
    setIsLoggedIn(true);
  }

  async function Logout() {
    await RedditService.Disconnect();
    setIsLoggedIn(false);
  }

  return {
    isLoggedIn,
    token,
    Login,
    Logout
  };
}

export default useReddit;