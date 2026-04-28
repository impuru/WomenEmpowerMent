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
  IconButton,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { apiService } from './apiService';

function ManageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState('');

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await apiService.getData();
      setBanners(data.carouselImages || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading banners:', error);
      setMessage('Error loading banners');
      setLoading(false);
    }
  };

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData(banners[index]);
    } else {
      setFormData('');
      setEditingIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingIndex(null);
    setFormData('');
  };

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async () => {
    if (!formData.trim()) {
      setMessage('Please enter an image URL');
      return;
    }

    try {
      const updatedBanners = editingIndex !== null
        ? banners.map((b, i) => i === editingIndex ? formData : b)
        : [...banners, formData];

      await apiService.updateData({
        carouselImages: updatedBanners,
        articles: null,
        teamMembers: null
      });

      setBanners(updatedBanners);
      setMessage(editingIndex !== null ? 'Banner updated successfully!' : 'Banner added successfully!');
      handleCloseDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving banner:', error);
      setMessage('Error saving banner');
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const updatedBanners = banners.filter((_, i) => i !== index);
        await apiService.updateData({
          carouselImages: updatedBanners,
          articles: null,
          teamMembers: null
        });
        setBanners(updatedBanners);
        setMessage('Banner deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting banner:', error);
        setMessage('Error deleting banner');
      }
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>{message}</Alert>}
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Carousel Banners ({banners.length})</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Banner
        </Button>
      </Box>

      <Grid container spacing={3}>
        {banners.map((banner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="img"
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </Box>
                <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>{banner}</Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" sx={{ alignSelf: 'center' }}>
                    #{index + 1}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingIndex !== null ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData}
            onChange={handleInputChange}
            multiline
            rows={3}
            placeholder="/assets/images/banner.jpg"
          />
          {formData && (
            <Box
              component="img"
              src={formData}
              alt="Preview"
              sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 1, mb: 2 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageBanner;
