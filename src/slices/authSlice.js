import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser, saveCurrentUser, getUsers, saveUsers, signOut } from '../utils/storage'


const initialState = {
user: getCurrentUser(), // {email, name}
token: getCurrentUser() ? 'local-token' : null,
}


const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
signupSuccess(state, action) {
const { name, email } = action.payload
state.user = { name, email }
state.token = 'local-token'
saveCurrentUser(state.user)
},
loginSuccess(state, action) {
const { email } = action.payload
const users = getUsers()
const found = users.find(u => u.email === email)
state.user = { name: found.name, email: found.email }
state.token = 'local-token'
saveCurrentUser(state.user)
},
logout(state) {
state.user = null
state.token = null
signOut()
},
},
})


export const { signupSuccess, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer