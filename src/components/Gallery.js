import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, Box, LinearProgress } from '@mui/material';
import { fetchNgoData } from '../data';

function Gallery() {
 
   const [images, setImages] = useState([]);
      const [loading, setLoading] = useState(true); 
  
    useEffect(() => { 
      fetchNgoData().then(data => {
        setImages(data.gallery || []);
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
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt={`Gallery image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Gallery;