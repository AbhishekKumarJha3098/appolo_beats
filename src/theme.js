import { createTheme } from '@mui/material/styles'


const theme = createTheme({
palette: {
mode: 'light',
primary: { main: '#5b6cff' },
secondary: { main: '#ff6b6b' },
background: { default: '#f7f8fc' },
},
shape: { borderRadius: 14 },
})


export default theme