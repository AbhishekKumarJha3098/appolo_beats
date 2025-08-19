import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SongList from './pages/SongList'
import SongForm from './pages/SongForm'


export default function App() {
return (
<>
<NavBar />
<Routes>
<Route path="/" element={<Navigate to="/songs" />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<SignUp />} />


<Route element={<ProtectedRoute />}>
<Route path="/songs" element={<SongList />} />
<Route path="/songs/new" element={<SongForm mode="create" />} />
<Route path="/songs/:id/edit" element={<SongForm mode="edit" />} />
</Route>


<Route path="*" element={<div style={{ padding: 24 }}>404 Not Found</div>} />
</Routes>
</>
)
}