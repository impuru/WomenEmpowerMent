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
import { apiService } from './apiService';

function ManageGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await apiService.getData();
      setGalleryItems(data.gallery || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading gallery:', error);
      setMessage('Error loading gallery');
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null, index = null) => {
    if (item) {
      setEditingIndex(index);
      setFormData(item);
    } else {
      const newId = galleryItems.length > 0 ? Math.max(...galleryItems.map(g => g.id || 0)) + 1 : 1;
      setFormData({
        id: newId,
        title: '',
        image: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingIndex(null);
    setFormData({
      id: null,
      title: '',
      image: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.image) {
      setMessage('Please enter an image URL');
      return;
    }

    try {
      const updatedGallery = editingIndex !== null
        ? galleryItems.map((g, i) => i === editingIndex ? formData : g)
        : [...galleryItems, formData];

      await apiService.updateGallery(updatedGallery);
      setGalleryItems(updatedGallery);
      setMessage(editingIndex !== null ? 'Gallery item updated successfully!' : 'Gallery item added successfully!');
      handleCloseDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setMessage('Error saving gallery item');
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const updatedGallery = galleryItems.filter((_, i) => i !== index);
        await apiService.updateGallery(updatedGallery);
        setGalleryItems(updatedGallery);
        setMessage('Gallery item deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setMessage('Error deleting gallery item');
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
        <Typography variant="h5">Gallery ({galleryItems.length})</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Gallery Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {galleryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title || `Gallery ${index + 1}`}
                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </Box>
                {item.title && (
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                )}
                {item.description && (
                  <Typography variant="body2" paragraph>{item.description}</Typography>
                )}
                <Typography variant="caption" sx={{ wordBreak: 'break-all', mb: 2, display: 'block' }}>
                  {item.image}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(item, index)}
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
        <DialogTitle>{editingIndex !== null ? 'Edit Gallery Item' : 'Add Gallery Item'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Title (Optional)"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            multiline
            rows={2}
            required
          />
          <TextField
            fullWidth
            label="Description (Optional)"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={2}
          />
          {formData.image && (
            <Box
              component="img"
              src={formData.image}
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

export default ManageGallery;
