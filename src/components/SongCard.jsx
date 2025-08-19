import { Card, CardContent, CardMedia, Typography, CardActions, Button, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'


export default function SongCard({ song, onDelete, onPlay }) {
const navigate = useNavigate()
return (
<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
{song.coverUrl && (
<CardMedia component="img" height="160" image={song.coverUrl} alt={song.title} />
)}
<CardContent sx={{ flexGrow: 1 }}>
<Typography variant="h6" noWrap>{song.title}</Typography>
<Typography variant="body2" color="text.secondary">{song.singer} • {song.year} • {song.genre}</Typography>
</CardContent>
<CardActions>
<Stack direction="row" spacing={1}>
<Button size="small" startIcon={<PlayArrowIcon />} onClick={() => onPlay(song)}>Play</Button>
<Button size="small" startIcon={<EditIcon />} onClick={() => navigate(`/songs/${song.id}/edit`)}>Edit</Button>
<Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(song.id)}>Delete</Button>
</Stack>
</CardActions>
</Card>
)
}