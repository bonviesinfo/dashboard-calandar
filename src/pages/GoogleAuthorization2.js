import React, { useEffect } from 'react'

const GoogleAuthorization = () => {
  useEffect(() => {
    window.gapi.client.load('https://docs.googleapis.com/$discovery/rest?version=v1')
    window.tokenClient.requestAccessToken({
      scope: 'https://www.googleapis.com/auth/documents.readonly',
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