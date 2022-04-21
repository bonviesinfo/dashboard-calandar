import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, signOut } from '../../slices/oauthSlice'

const GoogleAuth = () => {
  const dispatch = useDispatch()
  const [authInstance, setAuthInstance] = useState(null)
  const isSignedIn = useSelector(state => state.oauth.isSignedIn)

  const onAuthChange = useCallback(isSignedIn => {
    if (isSignedIn) {
      dispatch(signIn(authInstance.currentUser.get().getId()))
    } else {
      dispatch(signOut())
    }
  }, [dispatch, authInstance])

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance()
        setAuthInstance(auth)
      })
    })

  }, [])

  useEffect(() => {
    if (authInstance) {
      onAuthChange(authInstance.isSignedIn.get())
      authInstance.isSignedIn.listen(onAuthChange)
    }
  }, [onAuthChange, authInstance])

  const onSignInClick = () => {
    authInstance.signIn()
  }

  const onSignOutClick = async () => {
    authInstance.signOut()
  }


  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null
    } else if (isSignedIn) {
      return <button onClick={onSignOutClick}>Sign Out</button>
    } else {
      return <button onClick={onSignInClick}>Sign In with Google</button>
    }
  }

  return (
    <div>
      {renderAuthButton()}
    </div>
  )
}

export default GoogleAuth