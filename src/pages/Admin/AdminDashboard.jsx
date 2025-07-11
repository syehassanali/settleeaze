import { useState, useEffect } from 'react'
import { Box, Typography, Tabs, Tab, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import api from '../../services/api'

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0)
  const [users, setUsers] = useState([])
  const [services, setServices] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, servicesRes, bookingsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/services'),
          api.get('/admin/bookings'),
        ])
        setUsers(usersRes.data)
        setServices(servicesRes.data)
        setBookings(bookingsRes.data)
      } catch (error) {
        console.error('Error fetching admin data:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/admin/services/${id}`)
        setServices(services.filter(service => service._id !== id))
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Services" />
        <Tab label="Bookings" />
      </Tabs>
      
      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>User Management ({users.length})</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>University</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.profile.firstName} {user.profile.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.profile.university}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" gutterBottom>Service Management ({services.length})</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>Add New Service</Button>
          </Box>
          <Grid container spacing={3}>
            {services.map(service => (
              <Grid item xs={12} sm={6} md={4} key={service._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.image || '/images/service-default.jpg'}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography color="text.secondary">${service.price}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteService(service._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>Booking Management ({bookings.length})</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map(booking => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.service.title}</TableCell>
                    <TableCell>{booking.user.profile.firstName} {booking.user.profile.lastName}</TableCell>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box 
                        sx={{ 
                          display: 'inline-block', 
                          px: 1, 
                          borderRadius: 1, 
                          backgroundColor: 
                            booking.status === 'confirmed' ? '#4caf50' : 
                            booking.status === 'pending' ? '#ff9800' : '#f44336',
                          color: 'white'
                        }}
                      >
                        {booking.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default AdminDashboard
