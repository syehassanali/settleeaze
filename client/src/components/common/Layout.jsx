import { Outlet } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Layout = () => {
  const { user, logout } = useAuth()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Student Arrival Services
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/services" color="inherit">
              Services
            </Button>
            {user ? (
              <>
                <Button component={Link} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
                {user.role === 'admin' && (
                  <Button component={Link} to="/admin" color="inherit">
                    Admin
                  </Button>
                )}
                <Button onClick={logout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography>© {new Date().getFullYear()} Student Arrival Services</Typography>
      </Box>
    </>
  )
}

export default Layout