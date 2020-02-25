import React, { useState, useEffect, useContext } from 'react'
import { useAsync } from 'react-async'
import RedditService from './services/RedditService'
import Loading from '../components/Loading'
import ErrorScreen from '../components/Error'

const AuthContext = React.createContext<AuthProvider | null>(null)

function AuthProvider (props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false)
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
      setFirstAttemptFinished(true)
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

  async function login () {
    try {
      await RedditService.SignIn()
      await RedditService.fetchAllSavedPosts()
    } catch (error) {
      console.log(error)
    } finally {
      reload()
    }
  }

  async function logout () {
    try {
      await RedditService.Disconnect()
    } catch (error) {
      console.log(error)
    } finally {
      reload()
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

function useAuth () {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used withing an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
