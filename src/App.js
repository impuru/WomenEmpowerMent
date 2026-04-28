import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Donation from './components/Donation';
import JSONViewer from './components/JSONViewer';
import ArticleDetail from './components/ArticleDetail';
import TeamDetail from './components/TeamDetail';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider, useAuth } from './components/admin/AuthContext';
import lightTheme from './theme/lightTheme';
import darkTheme from './theme/darkTheme';

function AppRoutes() {
  const [mode, setMode] = useState('light');
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/:section"
            element={
              <ProtectedRoute>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <AdminPanel />
                </Box>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AdminPanel />
              </Box>
            </ProtectedRoute>
            
          } />

          {/* Public routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/donation" element={<Donation />} />
                  <Route path="/data" element={<JSONViewer />} />
                  <Route path="/article/detail/:articleID" element={<ArticleDetail />} />
                  <Route path="/team/detail/:memberName" element={<TeamDetail />} />
                </Routes>
                <Footer mode={mode} onToggleMode={toggleMode} />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;