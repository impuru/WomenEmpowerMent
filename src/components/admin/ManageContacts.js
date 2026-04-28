import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Alert,
  Divider,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { apiService } from './apiService';

function ManageContacts() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openSocialDialog, setOpenSocialDialog] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState(null);

  const [contactFormData, setContactFormData] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    mapEmbedCode: '',
  });

  const [socialFormData, setSocialFormData] = useState({
    id: null,
    platform: '',
    url: '',
  });

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      const data = await apiService.getData();
      setContactData(data.contact || {
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        mapEmbedCode: '',
        socialLinks: [],
      });
      if (data.contact) {
        setContactFormData({
          email: data.contact.email || '',
          phone: data.contact.phone || '',
          address: data.contact.address || '',
          city: data.contact.city || '',
          state: data.contact.state || '',
          zipCode: data.contact.zipCode || '',
          country: data.contact.country || '',
          mapEmbedCode: data.contact.mapEmbedCode || '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading contact data:', error);
      setMessage('Error loading contact data');
      setLoading(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

  const handleOpenSocialDialog = (social = null) => {
    if (social) {
      setEditingSocialId(social.id);
      setSocialFormData(social);
    } else {
      const newId = (contactData?.socialLinks || []).length > 0 
        ? Math.max(...(contactData.socialLinks || []).map(s => s.id || 0)) + 1 
        : 1;
      setSocialFormData({
        id: newId,
        platform: '',
        url: '',
      });
    }
    setOpenSocialDialog(true);
  };

  const handleCloseSocialDialog = () => {
    setOpenSocialDialog(false);
    setEditingSocialId(null);
    setSocialFormData({ id: null, platform: '', url: '' });
  };

  const handleSaveContact = async () => {
    if (!contactFormData.email || !contactFormData.phone) {
      setMessage('Email and Phone are required');
      return;
    }

    try {
      const updatedContact = {
        ...contactFormData,
        socialLinks: contactData?.socialLinks || [],
      };

      await apiService.updateContact(updatedContact);
      setContactData(updatedContact);
      setMessage('Contact information updated successfully!');
      handleCloseContactDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving contact:', error);
      setMessage('Error saving contact information');
    }
  };

  const handleSaveSocial = async () => {
    if (!socialFormData.platform || !socialFormData.url) {
      setMessage('Please fill in all social link fields');
      return;
    }

    try {
      let updatedSocialLinks = contactData?.socialLinks || [];

      if (editingSocialId !== null) {
        updatedSocialLinks = updatedSocialLinks.map(s =>
          s.id === editingSocialId ? socialFormData : s
        );
      } else {
        updatedSocialLinks = [...updatedSocialLinks, socialFormData];
      }

      const updatedContact = {
        ...contactData,
        socialLinks: updatedSocialLinks,
      };

      await apiService.updateContact(updatedContact);
      setContactData(updatedContact);
      setMessage(editingSocialId !== null ? 'Social link updated!' : 'Social link added!');
      handleCloseSocialDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving social link:', error);
      setMessage('Error saving social link');
    }
  };

  const handleDeleteSocial = async (id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      try {
        const updatedSocialLinks = (contactData?.socialLinks || []).filter(s => s.id !== id);
        const updatedContact = {
          ...contactData,
          socialLinks: updatedSocialLinks,
        };

        await apiService.updateContact(updatedContact);
        setContactData(updatedContact);
        setMessage('Social link deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting social link:', error);
        setMessage('Error deleting social link');
      }
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>{message}</Alert>}

      {/* Contact Information Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Contact Information</Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpenContactDialog}
          >
            Edit Contact Details
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Contact Details Card */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6">Email</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {contactData?.email || 'Not set'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6">Phone</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {contactData?.phone || 'Not set'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6">Address</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {contactData?.address || 'Not set'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {contactData?.city && contactData.state && contactData.zipCode
                    ? `${contactData.city}, ${contactData.state} ${contactData.zipCode}`
                    : 'City/State/ZIP not set'}
                </Typography>
                {contactData?.country && (
                  <Typography variant="caption" color="textSecondary" display="block">
                    {contactData.country}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6">Map Embed</Typography>
                </Box>
                {contactData?.mapEmbedCode ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      border: '1px solid #ccc',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                    dangerouslySetInnerHTML={{ __html: contactData.mapEmbedCode }}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No map embed code set
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Social Links Section */}
      <Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Social Media Links</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenSocialDialog()}
          >
            Add Social Link
          </Button>
        </Box>

        {(contactData?.socialLinks || []).length > 0 ? (
          <Paper>
            <List>
              {contactData.socialLinks.map((social, index) => (
                <React.Fragment key={social.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => handleOpenSocialDialog(social)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleDeleteSocial(social.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <LinkIcon sx={{ mr: 2, color: '#667eea' }} />
                    <ListItemText
                      primary={social.platform}
                      secondary={
                        <Box component="a" href={social.url} target="_blank" rel="noopener noreferrer" sx={{ color: '#667eea', textDecoration: 'none' }}>
                          {social.url}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < contactData.socialLinks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary" textAlign="center">
                No social links added yet
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Contact Details Dialog */}
      <Dialog open={openContactDialog} onClose={handleCloseContactDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Contact Information</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={contactFormData.email}
            onChange={handleContactChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={contactFormData.phone}
            onChange={handleContactChange}
            required
          />
          <TextField
            fullWidth
            label="Street Address"
            name="address"
            value={contactFormData.address}
            onChange={handleContactChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={contactFormData.city}
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                name="state"
                value={contactFormData.state}
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP/Postal Code"
                name="zipCode"
                value={contactFormData.zipCode}
                onChange={handleContactChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={contactFormData.country}
                onChange={handleContactChange}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Map Embed Code"
            name="mapEmbedCode"
            value={contactFormData.mapEmbedCode}
            onChange={handleContactChange}
            multiline
            rows={4}
            placeholder="Paste Google Maps iframe code here"
            helperText="Get embed code from Google Maps"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContactDialog}>Cancel</Button>
          <Button onClick={handleSaveContact} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Social Link Dialog */}
      <Dialog open={openSocialDialog} onClose={handleCloseSocialDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingSocialId !== null ? 'Edit Social Link' : 'Add Social Link'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Platform"
            name="platform"
            value={socialFormData.platform}
            onChange={handleSocialChange}
            placeholder="e.g., Facebook, Instagram, Twitter"
            required
          />
          <TextField
            fullWidth
            label="URL"
            name="url"
            type="url"
            value={socialFormData.url}
            onChange={handleSocialChange}
            placeholder="https://..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSocialDialog}>Cancel</Button>
          <Button onClick={handleSaveSocial} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageContacts;
