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

function ManageArticle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    excerpt: '',
    image: '',
    author: '',
    date: '',
    content: '',
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await apiService.getData();
      setArticles(data.articles || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading articles:', error);
      setMessage('Error loading articles');
      setLoading(false);
    }
  };

  const handleOpenDialog = (article = null) => {
    if (article) {
      setEditingId(article.id);
      setFormData(article);
    } else {
      const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
      setFormData({
        id: newId,
        title: '',
        excerpt: '',
        image: '',
        author: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({
      id: null,
      title: '',
      excerpt: '',
      image: '',
      author: '',
      date: '',
      content: '',
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
    if (!formData.title || !formData.excerpt || !formData.content) {
      setMessage('Please fill in required fields');
      return;
    }

    try {
      const updatedArticles = editingId
        ? articles.map(a => a.id === editingId ? formData : a)
        : [...articles, formData];

      await apiService.updateData({
        articles: updatedArticles,
        teamMembers: null,
        carouselImages: null
      });

      setArticles(updatedArticles);
      setMessage(editingId ? 'Article updated successfully!' : 'Article added successfully!');
      handleCloseDialog();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving article:', error);
      setMessage('Error saving article');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const updatedArticles = articles.filter(a => a.id !== id);
        await apiService.updateData({
          articles: updatedArticles,
          teamMembers: null,
          carouselImages: null
        });
        setArticles(updatedArticles);
        setMessage('Article deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting article:', error);
        setMessage('Error deleting article');
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
        <Typography variant="h5">Articles ({articles.length})</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Article
        </Button>
      </Box>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card>
              <CardContent>
                {article.image && (
                  <Box
                    component="img"
                    src={article.image}
                    alt={article.title}
                    sx={{ width: '100%', height: 150, objectFit: 'cover', mb: 2, borderRadius: 1 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <Typography variant="h6" gutterBottom>{article.title}</Typography>
                <Typography variant="caption" color="textSecondary">{article.date} by {article.author}</Typography>
                <Typography variant="body2" paragraph sx={{ mt: 1 }}>{article.excerpt.substring(0, 80)}...</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(article)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(article.id)}
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
        <DialogTitle>{editingId ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            multiline
            rows={2}
            required
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
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
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            multiline
            rows={6}
            required
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

export default ManageArticle;
