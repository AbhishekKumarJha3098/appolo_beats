const USERS_KEY = 'appolobeats:users'
const CURRENT_KEY = 'appolobeats:currentUser'


export function getUsers() {
return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}
export function saveUsers(users) {
localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
export function getCurrentUser() {
const raw = localStorage.getItem(CURRENT_KEY)
return raw ? JSON.parse(raw) : null
}
export function saveCurrentUser(user) {
localStorage.setItem(CURRENT_KEY, JSON.stringify(user))
}
export function signOut() {
localStorage.removeItem(CURRENT_KEY)
}


export function loadSongsForUser(email) {
const key = `appolobeats:songs:${email}`
return JSON.parse(localStorage.getItem(key) || '[]')
}
export function saveSongsForUser(email, songs) {
const key = `appolobeats:songs:${email}`
localStorage.setItem(key, JSON.stringify(songs))
}