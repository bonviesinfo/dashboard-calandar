import React, { useEffect } from 'react'

const GoogleAuthorization = () => {
  useEffect(() => {
    window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest')
    window.tokenClient.requestAccessToken({
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    })
  }, [])

  const revokeToken = () => {
    let cred = window.gapi.client.getToken()
    if (cred !== null) {
      window.google.accounts.oauth2.revoke(cred.access_token, () => { console.log('Revoked: ' + cred.access_token) })
      window.gapi.client.setToken('')
    }
  }


  return (
    <div>
      <button onClick={revokeToken}>
        Revoke Token
      </button>
    </div>
  )
}

export default GoogleAuthorization