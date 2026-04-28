import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import { fetchNgoData } from '../data';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import CopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

function JSONViewer() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchNgoData()
      .then((data) => {
        setJsonData(data);
        setEditedJson(JSON.stringify(data, null, 2));
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data: ' + err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedJson(JSON.stringify(jsonData, null, 2));
    setIsEditing(false);
    setMessage('');
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(editedJson);
      axios.post('/api/update-data.ashx', { data: parsed })
        .then((response) => {
          setJsonData(parsed);
          setIsEditing(false);
          setMessageType('success');
          setMessage('✓ JSON saved successfully!');
          setTimeout(() => setMessage(''), 3000);
        })
        .catch((err) => {
          setMessageType('error');
          const errorMsg = err.response?.data?.message || err.message || 'Failed to save data';
          setMessage('✗ ' + errorMsg);
        });
    } catch (err) {
      setMessageType('error');
      setMessage('✗ Invalid JSON: ' + err.message);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'data.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setMessageType('success');
    setMessage('✓ Copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
          JSON Data Viewer & Editor
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          View and edit the application data in real-time.
        </Typography>

        {message && (
          <Alert
            severity={messageType}
            onClose={() => setMessage('')}
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Tooltip title="Download as JSON file">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Tooltip>
              <Tooltip title="Copy to clipboard">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CopyIcon />}
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Formatted View" />
            <Tab label="Raw JSON" />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <Paper
            sx={{
              p: 3,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
              fontFamily: 'Courier New, monospace',
              overflow: 'auto',
              maxHeight: '600px',
            }}
          >
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={25}
                value={editedJson}
                onChange={(e) => setEditedJson(e.target.value)}
                variant="standard"
                InputProps={{
                  style: {
                    fontFamily: 'Courier New, monospace',
                    fontSize: '14px',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#e0e0e0' : '#212121',
                  },
                }}
                sx={{
                  '& .MuiInput-underline:before': { borderBottom: 'none' },
                  '& .MuiInput-underline:hover:before': { borderBottom: 'none' },
                  '& .MuiInput-underline:after': { borderBottom: 'none' },
                }}
              />
            ) : (
              <JSONDisplay data={jsonData} />
            )}
          </Paper>
        )}

        {tabValue === 1 && (
          <Paper
            sx={{
              p: 3,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
              fontFamily: 'Courier New, monospace',
              overflow: 'auto',
              maxHeight: '600px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            <Box
              component="pre"
              sx={{
                margin: 0,
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e0e0e0' : '#212121',
                fontSize: '13px',
              }}
            >
              {JSON.stringify(jsonData, null, 2)}
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

// Component to display JSON with syntax highlighting
function JSONDisplay({ data }) {
  const renderValue = (value, depth = 0) => {
    const padding = depth * 20;

    if (value === null) {
      return (
        <span style={{ color: '#999' }}>
          null
        </span>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <span style={{ color: '#d4a574' }}>
          {value ? 'true' : 'false'}
        </span>
      );
    }

    if (typeof value === 'number') {
      return (
        <span style={{ color: '#6897bb' }}>
          {value}
        </span>
      );
    }

    if (typeof value === 'string') {
      return (
        <span style={{ color: '#6a8759' }}>
          "{value}"
        </span>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span style={{ color: '#999' }}>[]</span>;
      }

      return (
        <Box sx={{ ml: `${padding}px` }}>
          <span style={{ color: '#999' }}>[</span>
          {value.map((item, idx) => (
            <Box key={idx} sx={{ ml: 2 }}>
              {renderValue(item, depth + 1)}
              {idx < value.length - 1 && <span style={{ color: '#999' }}>,</span>}
            </Box>
          ))}
          <Box sx={{ ml: `${padding}px` }}>
            <span style={{ color: '#999' }}>]</span>
            {depth > 0 && <span style={{ color: '#999' }}>,</span>}
          </Box>
        </Box>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return <span style={{ color: '#999' }}>{'{}'}</span>;
      }

      return (
        <Box sx={{ ml: `${padding}px` }}>
          <span style={{ color: '#999' }}>{'{'}</span>
          {keys.map((key, idx) => (
            <Box key={key} sx={{ ml: 2 }}>
              <span style={{ color: '#c678dd' }}>"{key}"</span>
              <span style={{ color: '#999' }}>: </span>
              {renderValue(value[key], depth + 1)}
              {idx < keys.length - 1 && <span style={{ color: '#999' }}>,</span>}
            </Box>
          ))}
          <Box sx={{ ml: `${padding}px` }}>
            <span style={{ color: '#999' }}>}</span>
            {depth > 0 && <span style={{ color: '#999' }}>,</span>}
          </Box>
        </Box>
      );
    }

    return <span>{value}</span>;
  };

  return (
    <Box
      sx={{
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#e0e0e0' : '#212121',
        fontFamily: 'Courier New, monospace',
        fontSize: '13px',
        lineHeight: 1.6,
      }}
    >
      {renderValue(data)}
    </Box>
  );
}

export default JSONViewer;
