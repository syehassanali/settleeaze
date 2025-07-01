import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Airport Pickup',
    description: 'Stress-free arrival with our professional pickup service',
    image: '/images/airport-pickup.jpg',
  },
  {
    id: 2,
    title: 'Temporary Accommodation',
    description: 'Comfortable short-term lodging while you find your permanent home',
    image: '/images/temp-accommodation.jpg',
  },
  {
    id: 3,
    title: 'Permanent Accommodation',
    description: 'Assistance in finding your ideal long-term housing',
    image: '/images/permanent-accommodation.jpg',
  },
]

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          height: '60vh',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Student Arrival Services
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your smooth transition to studying abroad starts here
          </Typography>
          <Button
            component={Link}
            to="/services"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Explore Services
          </Button>
        </motion.div>
      </Box>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Popular Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <motion.div whileHover={{ y: -5 }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/services/${service.id}`}
                      size="small"
                      sx={{ mt: 2 }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage