import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import BuildIcon from '@mui/icons-material/Build';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ManageTeam from './ManageTeam';
import ManageArticle from './ManageArticle';
import ManageBanner from './ManageBanner';
import ManageServices from './ManageServices';
import ManageGallery from './ManageGallery';

const DRAWER_WIDTH = 280;

function AdminPanel() {
    const { section } = useParams();
  const [activeTab, setActiveTab] = useState(section || 'team');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { id: 'team', label: 'Team Members', icon: <PeopleIcon /> },
    { id: 'articles', label: 'Articles', icon: <ArticleIcon /> },
    { id: 'services', label: 'Services', icon: <BuildIcon /> },
    { id: 'gallery', label: 'Gallery', icon: <CollectionsIcon /> },
    { id: 'banners', label: 'Banners', icon: <ImageIcon /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'team':
        return <ManageTeam />;
      case 'articles':
        return <ManageArticle />;
      case 'services':
        return <ManageServices />;
      case 'gallery':
        return <ManageGallery />;
      case 'banners':
        return <ManageBanner />;
      default:
        return <ManageTeam />;
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          CMS Admin Panel
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Welcome, {username}  <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={() => handleLogout()}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          Logout
        </Button>
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeTab === item.id}
             
              onClick={() => {
                setActiveTab(item.id);
                navigate(`/admin/${item.label.toLowerCase().replace(/\s+/g, '')}`);
                setMobileOpen(false);
              }}
              sx={{
                backgroundColor: activeTab === item.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                borderLeft: activeTab === item.id ? '4px solid #667eea' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeTab === item.id ? '#667eea' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <Divider /> */}

      <Box sx={{ p: 2 }}>
       
      </Box>
    </Box>
  );
//  useEffect(() => {
   
//   }, [activeTab]);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Women Empowerment CMS - Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              mt: 8,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: 8,
          ml: !isMobile ? `${0}px` : 0,
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
          {renderContent(activeTab)}
        </Container>
      </Box>
    </Box>
  );
}

export default AdminPanel;
