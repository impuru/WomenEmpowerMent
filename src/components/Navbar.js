import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import logo from '../assets/images/logo.png';

function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>  
          <img src={logo} alt="Logo" style={{ height: '60px', marginTop: '10px' }} />
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />} sx={{ backgroundColor: location.pathname === '/' ? 'menu.active' : '' }}></Button>
          <Button color="inherit" component={Link} to="/about"  sx={{ backgroundColor: location.pathname === '/about' ? 'menu.active' : '' }}>About</Button>
          <Button color="inherit" component={Link} to="/services"  sx={{ backgroundColor: location.pathname === '/services' ? 'menu.active' : '' }}>Services</Button>
          <Button color="inherit" component={Link} to="/gallery"  sx={{ backgroundColor: location.pathname === '/gallery' ? 'menu.active' : '' }}>Gallery</Button>
          <Button color="inherit" component={Link} to="/contact"  sx={{ backgroundColor: location.pathname === '/contact' ? 'menu.active' : '' }}>Contact</Button>
  
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;