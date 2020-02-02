import React, { useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { useAsync } from 'react-async';
import RedditService from './services/RedditService';
import Loading from '../Loading';
import ErrorScreen from '../Error';

const AuthContext = React.createContext({
  isLoggedIn: false,
  username: null,
  login: null,
  logout: null
});

function AuthProvider (props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);
  const {
    data = { isLoggedIn: false, username: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: RedditService.bootstrapAuthData
  })

  useEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
    if (isPending) {
      return <Loading />
    }

    if (isRejected || error) {
      return <ErrorScreen />
    }
  }

  async function login() {
    try {
      await RedditService.SignIn();
      await RedditService.fetchSavedPosts();
    } catch (error) {
      console.log(error);
    } finally {
      reload();
    }
  }

  async function logout() {
    try {
      await RedditService.Disconnect();
      await RedditService.clearStorage();
    } catch(error) {
      console.log(error);
    } finally {
      console.log('AuthProvider: Reload')
      reload();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: data.isLoggedIn,
        username: data.username,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used withing an AuthProvider');
  }

  return context
}

export { AuthContext, AuthProvider, useAuth };