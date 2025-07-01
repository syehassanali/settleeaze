import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, TextField, Container, Alert } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const ServiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookingDate, setBookingDate] = useState(null)
  const [specialRequests, setSpecialRequests] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${id}`)
        setService(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load service details')
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  const handleBooking = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!bookingDate) {
      setError('Please select a date')
      return
    }

    setIsBooking(true)
    setError(null)

    try {
      await api.post('/bookings', {
        service: service._id,
        date: bookingDate,
        specialRequests,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed')
    } finally {
      setIsBooking(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <Typography>Loading service details...</Typography>
      </Container>
    )
  }

  if (!service) {
    return (
      <Container>
        <Typography variant="h5" color="error">Service not found</Typography>
        <Button variant="contained" onClick={() => navigate('/services')}>
          Browse Services
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={service.image || '/images/service-default.jpg'}
              alt={service.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {service.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${service.price} <Typography component="span" variant="body1">({service.duration})</Typography>
          </Typography>
          <Typography variant="body1" paragraph>
            {service.description}
          </Typography>
          
          <Box sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: 1, my: 2 }}>
            <Typography variant="subtitle1">Service Details:</Typography>
            <Typography><strong>Category:</strong> {service.category}</Typography>
            <Typography><strong>Location:</strong> {service.location}</Typography>
            <Typography><strong>Provider:</strong> {service.provider?.name || 'University Services'}</Typography>
          </Box>

          {user ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Book This Service
              </Typography>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={bookingDate}
                  onChange={(newValue) => setBookingDate(newValue)}
                  minDate={new Date()}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                />
              </LocalizationProvider>
              
              <TextField
                fullWidth
                label="Special Requests"
                multiline
                rows={4}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleBooking}
                disabled={isBooking}
              >
                {isBooking ? 'Processing Booking...' : 'Book Now'}
              </Button>
            </Box>
          ) : (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Want to book this service?
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
              >
                Login to Book
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default ServiceDetail