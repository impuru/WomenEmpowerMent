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
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { fetchNgoData } from '../data';

function TeamDetail() {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherMembers, setOtherMembers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchNgoData()
      .then((data) => {
        // Find member by name (URL-decoded)
        const decodedName = decodeURIComponent(memberName);
        const foundMember = data.teamMembers.find(
          (m) => m.name.toLowerCase() === decodedName.toLowerCase()
        );

        if (foundMember) {
          setMember(foundMember);
          // Get other team members
          const others = data.teamMembers.filter(
            (m) => m.name.toLowerCase() !== decodedName.toLowerCase()
          );
          setOtherMembers(others);
          setLoading(false);
        } else {
          setError('Team member not found');
          setLoading(false);
        }
      })
      .catch((err) => {
        setError('Failed to load team member: ' + err.message);
        setLoading(false);
      });
  }, [memberName]);

  const handleNavigateMember = (name) => {
    navigate(`/team/detail/${encodeURIComponent(name)}`);
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
          Back to Team
        </Button>
      </Container>
    );
  }

  if (!member) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Team member not found</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Team
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
        onClick={() => navigate('/#team')}
        sx={{ mb: 3, color: 'primary.main' }}
      >
        Back to Team
      </Button>

      {/* Member Header */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Profile Image */}
        <Grid item xs={12} sm={5}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
        </Grid>

        {/* Member Info */}
        <Grid item xs={12} sm={7}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              {member.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'primary.main', fontWeight: 600, mb: 3 }}
            >
              {member.role}
            </Typography>

            {/* Contact Information */}
            <Paper
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{member.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{member.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1">{member.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DateRangeIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Joined
                  </Typography>
                  <Typography variant="body1">{member.joinDate}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Background Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Background
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            {member.background}
          </Typography>
        </Paper>
      </Box>

      {/* Full Bio Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Biography
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {member.fullBio?.split('\n').map((paragraph, index) => (
              <Typography key={index} paragraph>
                {paragraph.trim()}
              </Typography>
            ))}
          </Typography>
        </Paper>
      </Box>

      {/* Expertise Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Expertise
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {member.expertise?.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Achievements Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Key Achievements
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
          }}
        >
          {member.achievements?.map((achievement, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: '24px' }}>
                ✓
              </Typography>
              <Typography variant="body1">{achievement}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Vision Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Vision & Mission
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(25, 118, 210, 0.1)'
                : 'rgba(25, 118, 210, 0.05)',
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
            {member.vision}
          </Typography>
        </Paper>
      </Box>

      {/* Other Team Members */}
      {otherMembers.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Our Team
          </Typography>

          <Grid container spacing={3}>
            {otherMembers.map((teamMember) => (
              <Grid item xs={12} sm={6} key={teamMember.id}>
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
                  onClick={() => handleNavigateMember(teamMember.name)}
                >
                  <Box
                    sx={{
                      height: 200,
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <img
                      src={teamMember.image}
                      alt={teamMember.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 0.5,
                        fontWeight: 600,
                      }}
                    >
                      {teamMember.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      sx={{ mb: 1, fontWeight: 500 }}
                    >
                      {teamMember.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {teamMember.description}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateMember(teamMember.name);
                      }}
                    >
                      Learn More →
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

export default TeamDetail;
