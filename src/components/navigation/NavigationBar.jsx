import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

/* Navigation Bar for the application */

const NavigationBar = () => {
  const isUserLoggedIn = false;

  const navItems = [
    { id: "home", label: "Home", path: "/home", show: !isUserLoggedIn },
    { id: "login", label: "Login", path: "/login", show: !isUserLoggedIn },
    { id: "signup", label: "Sign Up", path: "/signup", show: !isUserLoggedIn },
  ];

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#3f51b5" }}>
      <Container maxWidth={false}>
        <Toolbar>
          <ShoppingCart />
          <Typography variant="h6" noWrap component={Link} to="/home" sx={{ color: 'inherit', textDecoration: 'none' }}>
            upGrad E-Shop
          </Typography>
          <Box sx={{ flexGrow: 4 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.filter(item => item.show).map(({ id, label, path }) => (
              <Link key={id} to={path} style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}>
                  <u>{label}</u>
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
