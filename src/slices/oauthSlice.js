import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSignedIn: null,
  userId: null,
}

const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    'signIn': (state, action) => {
      state.isSignedIn = true
      state.userId = action.payload
    },
    'signOut': (state, action) => {
      state.isSignedIn = false
      state.userId = null
    },
  }
})

export const { signIn, signOut } = oauthSlice.actions

export default oauthSlice.reducer