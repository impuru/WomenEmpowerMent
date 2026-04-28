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

function ManageTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    role: '',
    description: '',
    image: '',
    email: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const data = await apiService.getData();
      setTeamMembers(data.teamMembers || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading team members:', error);
      setMessage('Error loading team members');
      setLoading(false);
    }
  };

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData(member);
    } else {
      const newId = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
      setFormData({
        id: newId,
        name: '',
        role: '',
        description: '',
        image: '',
        email: '',
        phone: '',
        location: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({
      id: null,
      name: '',
      role: '',
      description: '',
      image: '',
      email: '',
      phone: '',
      location: '',
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
    try {
      const updatedTeam = editingId
        ? teamMembers.map(m => m.id === editingId ? formData : m)
        : [...teamMembers, formData];

      await apiService.updateData({
        teamMembers: updatedTeam,
        articles: null,
        carouselImages: null
      });

      setTeamMembers(updatedTeam);
      setMessage(editingId ? 'Team member updated successfully!' : 'Team member added successfully!');
      handleCloseDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving team member:', error);
      setMessage('Error saving team member');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const updatedTeam = teamMembers.filter(m => m.id !== id);
        await apiService.updateData({
          teamMembers: updatedTeam,
          articles: null,
          carouselImages: null
        });
        setTeamMembers(updatedTeam);
        setMessage('Team member deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting team member:', error);
        setMessage('Error deleting team member');
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
        <Typography variant="h5">Team Members ({teamMembers.length})</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{member.name}</Typography>
                <Typography color="textSecondary" gutterBottom>{member.role}</Typography>
                <Typography variant="body2" paragraph>{member.description.substring(0, 100)}...</Typography>
                <Typography variant="caption">{member.email}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(member)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(member.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
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

export default ManageTeam;
