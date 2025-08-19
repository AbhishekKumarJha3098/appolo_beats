import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, Grid, InputAdornment, MenuItem, Select, Slider, Stack, TextField, Typography, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSong, loadForUser } from '../slices/songsSlice'
import SongCard from '../components/SongCard'
import { useNavigate } from 'react-router-dom'

function unique(arr) { return Array.from(new Set(arr)) }

export default function SongList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(s => s.auth.user)
  const songs = useSelector(s => s.songs.items)

  const [search, setSearch] = useState('')
  const [singer, setSinger] = useState('All')
  const [alphabet, setAlphabet] = useState('All')
  const years = songs.map(s => s.year)
  const [yearRange, setYearRange] = useState([Math.min(...years, 1900), Math.max(...years, new Date().getFullYear())])

  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => { if (user) dispatch(loadForUser(user.email)) }, [dispatch, user])
  useEffect(() => {
    const y = songs.map(s => s.year)
    const min = y.length ? Math.min(...y) : 1900
    const max = y.length ? Math.max(...y) : new Date().getFullYear()
    setYearRange([min, max])
  }, [songs])

  const singers = useMemo(() => ['All', ...unique(songs.map(s => s.singer).filter(Boolean))], [songs])
  const alphabets = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]

  const filtered = songs.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase())
    const matchesSinger = singer === 'All' || s.singer === singer
    const matchesAlpha = alphabet === 'All' || s.title.toUpperCase().startsWith(alphabet)
    const matchesYear = s.year >= yearRange[0] && s.year <= yearRange[1]
    return matchesSearch && matchesSinger && matchesAlpha && matchesYear
  })

  const handleDelete = (id) => dispatch(deleteSong(id))
  const handlePlay = (song) => { setCurrentSong(song); setPlayerOpen(true) }

  return (
    <Container sx={{ py: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Your Songs</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => navigate('/songs/new')}>Add New Song</Button>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField fullWidth placeholder="Search by title" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Select fullWidth value={singer} onChange={e => setSinger(e.target.value)}>
            {singers.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} md={2}>
          <Select fullWidth value={alphabet} onChange={e => setAlphabet(e.target.value)}>
            {alphabets.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack>
            <Typography variant="body2">Year Range: {yearRange[0]} – {yearRange[1]}</Typography>
            <Slider value={yearRange} onChange={(_, v) => setYearRange(v)} valueLabelDisplay="auto" min={1900} max={new Date().getFullYear()} />
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filtered.map(song => (
          <Grid item key={song.id} xs={12} sm={6} md={4} lg={3}>
            <SongCard song={song} onDelete={handleDelete} onPlay={handlePlay} />
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>No songs match your filters.</Box>
          </Grid>
        )}
      </Grid>

      <Dialog open={playerOpen} onClose={() => setPlayerOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentSong?.title}
          <IconButton onClick={() => setPlayerOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {currentSong?.singer} • {currentSong?.year} • {currentSong?.genre}
          </Typography>
          {currentSong && (
            <audio src={currentSong.audioUrl} controls style={{ width: '100%' }} />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  )
}