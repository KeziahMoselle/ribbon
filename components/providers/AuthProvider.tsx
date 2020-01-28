import React, { useState, useEffect, useContext } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    data: username,
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: RedditService.bootstrapAppData
  })

  useEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled])

  useEffect(() => {
    if (username) {
      setIsLoggedIn(true);
    }
  }, [username])

  if (!firstAttemptFinished) {
    if (isPending) {
      return <Loading />
    }

    if (isRejected || error) {
      return <ErrorScreen />
    }
  }

  const login = () => RedditService.SignIn().then(reload);
  const logout = () => RedditService.Disconnect().then(reload);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
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