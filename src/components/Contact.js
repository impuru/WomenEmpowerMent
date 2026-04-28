import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Card, CardContent, IconButton, Alert } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Contact Us
      </Typography>

      {/* Map Section */}
      <Box sx={{ mb: 4, borderRadius: '8px', overflow: 'hidden', boxShadow: 2 }}>
        <iframe
          title="Muzaffarpur Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5652145484563!2d85.38988952346916!3d26.120901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59e47cd11111%3A0x1234567890!2sMuzaffarpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Contact Details Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <LocationOnIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Muzaffarpur, Bihar, India
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <EmailIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body2" color="text.secondary">
                babli@gmail.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <PhoneIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +91 (Coming Soon)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton size="small" href="https://instagram.com" sx={{ color: '#E1306C' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton size="small" href="https://facebook.com" sx={{ color: '#1877F2' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" href="https://youtube.com" sx={{ color: '#FF0000' }}>
                  <YouTubeIcon />
                </IconButton>
                <IconButton size="small" href="https://linkedin.com" sx={{ color: '#0A66C2' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enquiry Form */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Send us an Enquiry
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get in touch with us to learn more about our work or to get involved in our initiatives.
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you! Your enquiry has been submitted successfully. We will get back to you soon.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={5}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" size="large">
                Send Enquiry
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default Contact;