import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Social Worker for Women Empowerment is a non-profit organization dedicated to the upliftment and empowerment of women in rural and urban areas. Founded by Babli Kumari, our NGO works towards providing education, vocational training, healthcare access, and legal support to women who have been marginalized or disadvantaged.
      </Typography>
      <Typography variant="body1" paragraph>
        Our vision is to create a society where women are empowered to make their own decisions, pursue their dreams, and contribute equally to the development of their communities. We believe that by investing in women, we invest in the future of our nation.
      </Typography>
      <Typography variant="body1">
        Through various programs and initiatives, we strive to address issues such as gender inequality, domestic violence, lack of education, and economic dependence. Our team of dedicated volunteers and professionals works tirelessly to bring about positive change in the lives of women across Bihar and beyond.
      </Typography>
    </Container>
  );
}

export default About;