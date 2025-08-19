// NavBar.jsx
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { LogoutRounded, LoginRounded, PersonAddRounded, MusicNote } from '@mui/icons-material'

export default function NavBar() {
  const user = useSelector(s => s.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(156,39,176,0.1)',
        color: '#333',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #9c27b0, #e91e63, #ff9800, #4caf50)',
          opacity: 0.6,
        }
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Logo and Brand */}
        <Typography
          variant="h6"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5 
          }}
        >
          <RouterLink
            to="/songs"
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              transition: 'all 0.3s ease',
              padding: '8px 12px',
              borderRadius: '12px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(156,39,176,0.1)';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                  boxShadow: '0 4px 12px rgba(156,39,176,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(5deg) scale(1.1)',
                    boxShadow: '0 6px 20px rgba(156,39,176,0.4)',
                  }
                }}
              >
                <MusicNote sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  letterSpacing: '-0.5px',
                }}
              >
                AppoloBeats
              </Typography>
              {/* <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  lineHeight: 1,
                  opacity: 0.7,
                }}
              >
                Music Platform
              </Typography> */}
            </Box>
          </RouterLink>
        </Typography>

        {/* User Section */}
        {user ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* User Greeting with Chip */}
            <Chip
              avatar={
                <Avatar
                  sx={{
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {user.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              }
              label={`Hi, ${user.name}`}
              variant="outlined"
              sx={{
                borderColor: 'rgba(156,39,176,0.3)',
                color: '#333',
                fontWeight: 600,
                backgroundColor: 'rgba(156,39,176,0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(156,39,176,0.1)',
                  borderColor: 'rgba(156,39,176,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            />
            
            {/* Logout Button */}
            <Button
              variant="contained"
              startIcon={<LogoutRounded />}
              onClick={() => { dispatch(logout()); navigate('/login'); }}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem',
                background: 'linear-gradient(45deg, #f44336, #e91e63)',
                boxShadow: '0 4px 12px rgba(244,67,54,0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d32f2f, #c2185b)',
                  boxShadow: '0 6px 20px rgba(244,67,54,0.4)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* Login Button */}
            <Button 
              component={RouterLink} 
              to="/login"
              startIcon={<LoginRounded />}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem',
                color: '#9c27b0',
                border: '2px solid transparent',
                background: 'rgba(156,39,176,0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(156,39,176,0.15)',
                  border: '2px solid rgba(156,39,176,0.3)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(156,39,176,0.2)',
                }
              }}
            >
              Login
            </Button>
            
            {/* Sign Up Button */}
            <Button 
              component={RouterLink} 
              to="/signup" 
              variant="contained"
              startIcon={<PersonAddRounded />}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem',
                background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                boxShadow: '0 4px 12px rgba(156,39,176,0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #8e24aa, #d81b60)',
                  boxShadow: '0 6px 20px rgba(156,39,176,0.4)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}