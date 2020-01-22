import React, { useState, useEffect, useContext } from 'react';
import { useAsync } from 'react-async';
import bootstrapAppData from './services/bootstrapAppData';
import * as RedditService from './services/RedditService';
import Loading from '../Loading';
import ErrorScreen from '../Error';

const AuthContext = React.createContext({
  token: {},
  login: null,
  logout: null
});

function AuthProvider (props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);
  const {
    data = {},
    error,
    isRejected,
    isPending,
    isSettled,
    reload
  } = useAsync({
    promiseFn: bootstrapAppData
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

    if (isRejected) {
      return <ErrorScreen />
    }
  }

  const login = () => RedditService.SignIn().then(reload);
  const logout = () => RedditService.Disconnect().then(reload);

  return (
    <AuthContext.Provider
      value={{
        token: data,
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