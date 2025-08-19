import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import songsReducer from '../slices/songsSlice'


const store = configureStore({
reducer: {
auth: authReducer,
songs: songsReducer,
},
})


export default store