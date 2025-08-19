import { Box, Button, Card, CardContent, TextField, Typography, Link, Avatar, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validation/schemas'
import { getUsers } from '../utils/storage'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/authSlice'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Login as LoginIcon, MusicNote } from '@mui/icons-material'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data) => {
    const users = getUsers()
    const found = users.find(u => u.email === data.email && u.password === data.password)
    if (!found) {
      setError('password', { type: 'manual', message: 'Invalid email or password' })
      return
    }
    dispatch(loginSuccess({ email: found.email }))
    navigate('/songs')
  }

  return (
    <Box sx={{ 
      position: 'relative',
      display: 'grid', 
      placeItems: 'center', 
      minHeight: 'calc(100vh - 64px)', 
      p: 2,
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <Box
  sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("https://images.unsplash.com/photo-1698429516741-d6f8eb471a96?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ruslan-sikunov-SByMyke7I0g-unsplash.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  }}
/>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: -1,
        }}
      />

      {/* Login Card */}
      <Card sx={{ 
        maxWidth: 380, 
        width: '100%',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
        overflow: 'visible',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.3))',
          borderRadius: 'inherit',
          zIndex: -1,
        }
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ 
              width: 64, 
              height: 64, 
              mx: 'auto', 
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              boxShadow: '0 8px 16px rgba(25,118,210,0.3)'
            }}>
              <MusicNote sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography 
              variant="h4" 
              fontWeight={700} 
              sx={{ 
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              Sign in to your AppoloBeats account
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, opacity: 0.3 }} />

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 3 }}>
            <TextField 
              label="Email" 
              type="email" 
              {...register('email')} 
              error={!!errors.email} 
              helperText={errors.email?.message} 
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 12px rgba(25,118,210,0.25)',
                  }
                }
              }}
            />
            <TextField 
              label="Password" 
              type="password" 
              {...register('password')} 
              error={!!errors.password} 
              helperText={errors.password?.message} 
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(25,118,210,0.15)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 12px rgba(25,118,210,0.25)',
                  }
                }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                boxShadow: '0 8px 16px rgba(25,118,210,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                  boxShadow: '0 12px 24px rgba(25,118,210,0.4)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/signup"
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#1976d2',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#1565c0',
                    }
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}