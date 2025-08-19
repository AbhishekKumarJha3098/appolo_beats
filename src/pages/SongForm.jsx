import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { songSchema } from '../validation/schemas'
import { useDispatch, useSelector } from 'react-redux'
import { addSong, updateSong } from '../slices/songsSlice'
import { useNavigate, useParams } from 'react-router-dom'


export default function SongForm({ mode }) {
const dispatch = useDispatch()
const navigate = useNavigate()
const { id } = useParams()
const user = useSelector(s => s.auth.user)
const songs = useSelector(s => s.songs.items)


const editing = mode === 'edit'
const song = editing ? songs.find(s => s.id === id) : null


const { register, handleSubmit, formState: { errors }, setValue } = useForm({
resolver: zodResolver(songSchema),
defaultValues: editing ? {
title: song?.title,
singer: song?.singer,
year: song?.year,
genre: song?.genre,
audioUrl: song?.audioUrl,
coverUrl: song?.coverUrl || '',
} : { title: '', singer: '', year: new Date().getFullYear(), genre: '', audioUrl: '', coverUrl: '' }
})


const onSubmit = (data) => {
const payload = { ...data, year: Number(data.year), owner: user.email }
if (editing) {
dispatch(updateSong({ id, updates: payload }))
} else {
dispatch(addSong(payload))
}
navigate('/songs')
}


return (
<Container sx={{ py: 2 }}>
<Card>
<CardContent>
<Typography variant="h5" fontWeight={700} gutterBottom>
{editing ? 'Edit Song' : 'Add New Song'}
</Typography>
<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
<Grid container spacing={2}>
<Grid item xs={12} md={6}>
<TextField label="Title" fullWidth {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
</Grid>
<Grid item xs={12} md={6}>
<TextField label="Singer" fullWidth {...register('singer')} error={!!errors.singer} helperText={errors.singer?.message} />
</Grid>
<Grid item xs={12} md={6}>
<TextField label="Year" type="number" fullWidth {...register('year', { valueAsNumber: true })} error={!!errors.year} helperText={errors.year?.message} />
</Grid>
<Grid item xs={12} md={6}>
<TextField label="Genre" fullWidth {...register('genre')} error={!!errors.genre} helperText={errors.genre?.message} />
</Grid>
<Grid item xs={12} md={6}>
<TextField label="Audio URL" placeholder="https://.../song.mp3" fullWidth {...register('audioUrl')} error={!!errors.audioUrl} helperText={errors.audioUrl?.message} />
</Grid>
<Grid item xs={12} md={6}>
<TextField label="Cover Image URL (optional)" placeholder="https://.../cover.jpg" fullWidth {...register('coverUrl')} error={!!errors.coverUrl} helperText={errors.coverUrl?.message} />
</Grid>
</Grid>
<Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
<Button type="submit" variant="contained">{editing ? 'Save Changes' : 'Add Song'}</Button>
<Button variant="outlined" onClick={() => navigate('/songs')}>Cancel</Button>
</Box>
</Box>
</CardContent>
</Card>
</Container>
)
}