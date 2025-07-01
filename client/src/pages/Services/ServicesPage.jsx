import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, TextField } from '@mui/material'
import api from '../../services/api'
import { motion } from 'framer-motion'

const ServicesPage = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services')
        setServices(response.data)
        setFilteredServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredServices(filtered)
  }, [searchTerm, services])

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Services
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, maxWidth: 600, mx: 'auto', display: 'block' }}
      />
      <Grid container spacing={4}>
        {filteredServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image || '/images/service-default.jpg'}
                  alt={service.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.category}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${service.price}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ServicesPage