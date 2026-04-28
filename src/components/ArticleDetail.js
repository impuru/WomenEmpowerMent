import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { fetchNgoData } from '../data';

function ArticleDetail() {
  const { articleID } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetchNgoData()
      .then((data) => {
        const foundArticle = data.articles.find(
          (a) => a.id === parseInt(articleID)
        );
        if (foundArticle) {
          setArticle(foundArticle);
          // Get related articles (exclude current article)
          const related = data.articles
            .filter((a) => a.id !== parseInt(articleID))
            .slice(0, 3);
          setRelatedArticles(related);
          setLoading(false);
        } else {
          setError('Article not found');
          setLoading(false);
        }
      })
      .catch((err) => {
        setError('Failed to load article: ' + err.message);
        setLoading(false);
      });
  }, [articleID]);

  const handleNavigateArticle = (id) => {
    navigate(`/article/detail/${id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Article not found</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 8 }}>
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, color: 'primary.main' }}
      >
        Back to Articles
      </Button>

      {/* Article Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.3,
          }}
        >
          {article.title}
        </Typography>

        {/* Article Meta Information */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            mb: 3,
            color: 'text.secondary',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2">{article.author}</Typography>
          </Box>
          {article.date && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">{article.date}</Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Featured Image */}
      {article.image && (
        <Box
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 2,
          }}
        >
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      )}

      {/* Article Content */}
      <Paper
        sx={{
          p: 4,
          mb: 6,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            fontSize: '1.05rem',
            color: 'text.primary',
            '& p': {
              marginBottom: 2,
            },
          }}
        >
          {article.content?.split('\n').map((paragraph, index) => {
            // Handle bullet points
            if (paragraph.trim().startsWith('•')) {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 1,
                    ml: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    •
                  </Typography>
                  <Typography>
                    {paragraph.trim().substring(1).trim()}
                  </Typography>
                </Box>
              );
            }

            // Handle section headers (lines ending with :)
            if (paragraph.trim().endsWith(':')) {
              return (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mt: 3,
                    mb: 1,
                    color: 'primary.main',
                  }}
                >
                  {paragraph.trim()}
                </Typography>
              );
            }

            // Handle numbers/titles (e.g., "1. Title")
            if (/^\d+\./.test(paragraph.trim())) {
              return (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mt: 2,
                    mb: 1,
                    color: 'primary.main',
                  }}
                >
                  {paragraph.trim()}
                </Typography>
              );
            }

            // Regular paragraphs
            if (paragraph.trim()) {
              return (
                <Typography key={index} paragraph>
                  {paragraph.trim()}
                </Typography>
              );
            }

            return null;
          })}
        </Typography>
      </Paper>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              textAlign: 'center',
            }}
          >
            Related Articles
          </Typography>

          <Grid container spacing={3}>
            {relatedArticles.map((relatedArticle) => (
              <Grid item xs={12} sm={6} md={4} key={relatedArticle.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleNavigateArticle(relatedArticle.id)}
                >
                  {relatedArticle.image && (
                    <Box
                      sx={{
                        height: 180,
                        overflow: 'hidden',
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  )}
                  <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      {relatedArticle.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {relatedArticle.excerpt}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateArticle(relatedArticle.id);
                      }}
                    >
                      Read More →
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ArticleDetail;
