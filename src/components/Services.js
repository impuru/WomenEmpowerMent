import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, LinearProgress } from '@mui/material';
import { fetchNgoData } from '../data';

function Services() {
  const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); 

  useEffect(() => { 
    fetchNgoData().then(data => {
      setServices(data.services||[]);
    }).catch(err => console.error(err)).finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading && (
              <Box  sx={{ width: '100%', position:'fixed', top: 0, left: 0, zIndex: 9999 }}>
                <LinearProgress aria-label="Loading…" />
              </Box>
            )}  
      <Typography variant="h3" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Services;