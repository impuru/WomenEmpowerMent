import React from 'react';
import { Box, Typography, IconButton, Container, Grid, Link as MuiLink, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer({ mode, onToggleMode }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', p: 4, mt: 4, boxShadow: '0 -2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {/* Column 1: Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
             
              <MuiLink component={Link} to="/about" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/services" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
                Services
              </MuiLink>
              <MuiLink component={Link} to="/gallery" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
                Gallery
              </MuiLink>
              <MuiLink component={Link} to="/contact" sx={{ textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
                Contact
              </MuiLink>
            </Box>
          </Grid>

          {/* Column 2: Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Follow Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Connect with us on social media for updates and news.
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://instagram.com" sx={{ color: 'text.primary', '&:hover': { color: '#E1306C' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="https://facebook.com" sx={{ color: 'text.primary', '&:hover': { color: '#1877F2' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://youtube.com" sx={{ color: 'text.primary', '&:hover': { color: '#FF0000' } }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" sx={{ color: 'text.primary', '&:hover': { color: '#0A66C2' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 3: Contact Details */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              <strong>Email:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.primary' }}>
              babli@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
              <strong>Address:</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Muzaffarpur, Bihar, India
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Line */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &copy; 2026 Social Worker for Women Empowerment. All rights reserved. | Designed with ❤️ by Babli
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: 'background.paper',
          borderRadius: '999px',
          boxShadow: 3,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          zIndex: 1300,
        }}
      >
        <Typography variant="body2" sx={{ mr: 1, color: 'text.primary' }}>
          {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Typography>
        <Switch checked={mode === 'dark'} onChange={onToggleMode} color="primary" />
      </Box>
    </Box>
  );
}

export default Footer;