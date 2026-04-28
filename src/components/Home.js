import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  fetchNgoData } from '../data';
import Donation from './Donation';

function Home() {
  const navigate = useNavigate();
  const [openDonation, setOpenDonation] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true); 
   const [articles, setArticles] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    
  // Usage in components:
// import { fetchNgoData } from '../data';
useEffect(() => { 
  fetchNgoData().then(data => {
    setCarouselImages(data.carouselImages);
    setArticles(data.articles);
    setTeamMembers(data.teamMembers);
  }).catch(err => console.error(err)).finally(() => setLoading(false));
}, []);

  const handleDonationOpen = () => {
    setOpenDonation(true);
  };

  const handleDonationClose = () => {
    setOpenDonation(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const articleSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {loading && (
        <Box  sx={{ width: '100%', position:'fixed', top: 0, left: 0, zIndex: 9999 }}>
          <LinearProgress aria-label="Loading…" />
        </Box>
      )}            
      {/* Image Carousel */}
      <Box sx={{ mb: 4 }}>
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '450px', objectFit: 'cover', objectPosition:'top' }} />
            </div>
          ))}
        </Slider>
      </Box>

      {/* Banner */}
      {/* <Paper sx={{ height: 300, backgroundImage: 'url(/assets/image/bg1.png)', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
        <Typography variant="h2" color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
         SLIDER SECTION
        </Typography>
      </Paper> */}

      {/* Details about Babli */}
      <Box sx={{ mb: 4 }}>
         <Typography className='page-header' variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
    Social Worker <small>for Women Empowerment</small>
        </Typography>
       
        <Typography variant="body1" paragraph>
          Babli Kumari is a dedicated social worker from Muzaffarpur, Bihar, who has been tirelessly working for the empowerment of women in her community and beyond. With a passion for social change and a commitment to equality, she founded the NGO "Social Worker for Women Empowerment" to provide support, education, and resources to women facing various challenges.
        </Typography>
        <Typography variant="body1" paragraph>
          Through her initiatives, Babli has helped countless women gain financial independence, access to education, and the confidence to stand up for their rights. Her work focuses on breaking the cycle of poverty and discrimination, empowering women to become leaders in their own lives and communities.
        </Typography>
        <Typography variant="body1">
          Join us in our mission to create a world where every woman has the opportunity to thrive and succeed.
        </Typography>
      
      </Box>

      {/* Articles and Newsletter Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography className='page-header' variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Latest Articles   <small> & Newsletters</small>
        </Typography>
        <Slider {...articleSliderSettings}>
          {articles.map((article, index) => (
            <div key={index} style={{ padding: '0 8px' }}>
              <Card sx={{ maxWidth: 300, mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {article.excerpt}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    By {article.author}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/article/detail/${article.id}`)}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </Box>

      {/* My Team Section */}
      <Box sx={{ mb: 4 }} id="team">
        <Typography className='page-header' variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Our Team <small>:Meet the People Behind the Mission</small>
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => navigate(`/team/detail/${encodeURIComponent(member.name)}`)}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={member.image}
                  alt={member.name}
                  className='team-image'
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {member.role}
                  </Typography>
                  <Typography className='team-description' variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/team/detail/${encodeURIComponent(member.name)}`);
                    }}
                    sx={{ mt: 1 }}
                  >
                    View Profile →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
  <Box sx={{ mt: 3, alignItems: 'center', display: 'flex', justifyContent: 'center'  }}>
          <Button variant="contained" color="secondary" onClick={handleDonationOpen} size="large">
            Make a Donation
          </Button>
        </Box>
      {/* Donation Dialog */}
      <Dialog open={openDonation} onClose={handleDonationClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Make a Donation
          <IconButton onClick={handleDonationClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Donation />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Home;