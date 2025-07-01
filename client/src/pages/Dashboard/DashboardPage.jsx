import { useState, useEffect } from 'react'
import { Box, Typography, Tab, Tabs, Card, CardContent, Avatar } from '@mui/material'
import api from '../../services/api'

const DashboardPage = () => {
  const [value, setValue] = useState(0)
  const [bookings, setBookings] = useState([])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          api.get('/bookings'),
          api.get('/profile'),
        ])
        setBookings(bookingsRes.data)
        setProfile(profileRes.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          alt={profile?.firstName}
          src="/images/default-avatar.jpg"
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h5">
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {profile?.email}
          </Typography>
          <Typography variant="body2">
            Studying at {profile?.university}
          </Typography>
        </Box>
      </Box>

      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="My Bookings" />
        <Tab label="Profile Settings" />
      </Tabs>
      
      <Box sx={{ pt: 3 }}>
        {value === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Upcoming Services
            </Typography>
            {bookings.length === 0 ? (
              <Typography>You have no upcoming services booked.</Typography>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {bookings.map((booking) => (
                  <Card key={booking._id}>
                    <CardContent>
                      <Typography variant="h6">{booking.service.title}</Typography>
                      <Typography color="text.secondary">
                        {new Date(booking.date).toLocaleDateString()}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>Status: {booking.status}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}
        
        {value === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            {/* Profile form would go here */}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DashboardPage