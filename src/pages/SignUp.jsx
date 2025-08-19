import { Box, Button, Card, CardContent, TextField, Typography, Link, Avatar, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../validation/schemas'
import { getUsers, saveUsers } from '../utils/storage'
import { useDispatch } from 'react-redux'
import { signupSuccess } from '../slices/authSlice'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { PersonAdd, MusicNote } from '@mui/icons-material'

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = (data) => {
    const users = getUsers()
    const exists = users.some(u => u.email === data.email)
    if (exists) {
      setError('email', { type: 'manual', message: 'Email already registered' })
      return
    }
    const newUsers = [...users, { name: data.name, email: data.email, password: data.password }]
    saveUsers(newUsers)
    dispatch(signupSuccess({ name: data.name, email: data.email }))
    navigate('/songs')
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: 'calc(100vh - 75px)', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
          background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: -1,
        }}
      />
      
      {/* Compact Signup Card */}
      <Card sx={{ 
        maxWidth: 380, 
        width: '90%',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        boxShadow: '0 25px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #9c27b0, #e91e63, #ff9800, #4caf50)',
          zIndex: 1,
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          {/* Compact Header */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Avatar sx={{ 
              width: 50, 
              height: 50, 
              mx: 'auto', 
              mb: 1.5,
              background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
              boxShadow: '0 6px 20px rgba(156,39,176,0.4)',
              transform: 'rotate(-5deg)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(0deg) scale(1.05)',
              }
            }}>
              <MusicNote sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography 
              variant="h5" 
              fontWeight={700} 
              sx={{ 
                background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
                fontSize: '1.5rem'
              }}
            >
              Join AppoloBeats
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.9rem', opacity: 0.8 }}
            >
              Start your musical journey
            </Typography>
          </Box>

          {/* Compact Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2 }}>
            <TextField 
              label="Name" 
              {...register('name')} 
              error={!!errors.name} 
              helperText={errors.name?.message} 
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px rgba(156,39,176,0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(156,39,176,0.25)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.9rem'
                }
              }}
            />
            <TextField 
              label="Email" 
              type="email" 
              {...register('email')} 
              error={!!errors.email} 
              helperText={errors.email?.message} 
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px rgba(156,39,176,0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(156,39,176,0.25)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.9rem'
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
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px rgba(156,39,176,0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(156,39,176,0.25)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.9rem'
                }
              }}
            />
            <TextField 
              label="Confirm Password" 
              type="password" 
              {...register('confirm')} 
              error={!!errors.confirm} 
              helperText={errors.confirm?.message} 
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px rgba(156,39,176,0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(156,39,176,0.25)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.9rem'
                }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              startIcon={<PersonAdd />}
              sx={{
                borderRadius: 3,
                py: 1.2,
                fontSize: '0.95rem',
                fontWeight: 600,
                mt: 1,
                background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                boxShadow: '0 6px 20px rgba(156,39,176,0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #8e24aa, #d81b60)',
                  boxShadow: '0 8px 25px rgba(156,39,176,0.5)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Create Account
            </Button>

            <Divider sx={{ my: 1.5, opacity: 0.3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                Already have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/login"
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#9c27b0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      color: '#8e24aa',
                      '&::after': {
                        width: '100%',
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: '-2px',
                      left: '50%',
                      background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    }
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}