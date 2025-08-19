import { createSlice, nanoid } from '@reduxjs/toolkit'
import { loadSongsForUser, saveSongsForUser } from '../utils/storage'


const initialState = {
items: [],
loadedFor: null, // email currently loaded
}


const songsSlice = createSlice({
name: 'songs',
initialState,
reducers: {
loadForUser(state, action) {
const email = action.payload
state.items = loadSongsForUser(email)
state.loadedFor = email
},
addSong: {
reducer(state, action) {
state.items.push(action.payload)
if (state.loadedFor) saveSongsForUser(state.loadedFor, state.items)
},
prepare(song) {
return { payload: { id: nanoid(), createdAt: Date.now(), ...song } }
}
},
updateSong(state, action) {
const { id, updates } = action.payload
const idx = state.items.findIndex(s => s.id === id)
if (idx !== -1) {
state.items[idx] = { ...state.items[idx], ...updates }
if (state.loadedFor) saveSongsForUser(state.loadedFor, state.items)
}
},
deleteSong(state, action) {
const id = action.payload
state.items = state.items.filter(s => s.id !== id)
if (state.loadedFor) saveSongsForUser(state.loadedFor, state.items)
}
}
})


export const { loadForUser, addSong, updateSong, deleteSong } = songsSlice.actions
export default songsSlice.reducer