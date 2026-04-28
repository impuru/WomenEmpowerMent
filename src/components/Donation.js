import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';

function Donation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: '',
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
    // Here you would typically send the data to a server
    console.log('Donation submitted:', formData);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Make a Donation
      </Typography>
      <Typography variant="body1" paragraph>
        Your generous donation helps us continue our work in empowering women across communities. Every contribution makes a difference.
      </Typography>
      {submitted ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your donation! We appreciate your support.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Donation Amount (INR)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="debit_card">Debit Card</MenuItem>
              <MenuItem value="net_banking">Net Banking</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Message (Optional)"
            name="message"
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Donate Now
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default Donation;