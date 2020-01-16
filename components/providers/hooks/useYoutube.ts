import React, { useState, useEffect } from 'react';
import * as YoutubeService from '../services/YoutubeService';

function useYoutube() {
  const [isYoutubeLoggedIn, setIsYoutubeLoggedIn] = useState(false);
  const [oauth, setOauth] = useState(null);

  useEffect(() => {
    initYoutube();
  }, [])

  async function initYoutube() {
    const oauth = await YoutubeService.getOauth();
    setOauth(oauth);
    if (oauth) setIsYoutubeLoggedIn(true);
  }

  async function Login() {
    try {
      await YoutubeService.SignIn();
      setIsYoutubeLoggedIn(true);
    } catch (error) {
      setIsYoutubeLoggedIn(false);
      alert(error);
    }
  }

  async function Logout() {
    await YoutubeService.Disconnect();
    setIsYoutubeLoggedIn(false);
  }

  return {
    isYoutubeLoggedIn,
    oauth,
    Login,
    Logout
  };
}

export default useYoutube;