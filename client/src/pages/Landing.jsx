import React from "react";
import { Container, Typography, Button, Box, AppBar, Toolbar, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

// Styled AppBar with glassmorphism effect
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(33, 150, 243, 0.5)', // Semi-transparent blue
  backdropFilter: 'blur(10px)', // Frosted glass effect
  boxShadow: 'none',
}));

// Custom styled button with enhanced hover effects
const CustomButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  transition: 'background-color 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}));

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <GlassAppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Our Platform
          </Typography>
          <Box>
            <CustomButton onClick={() => navigate("/admin-login")}>
              Admin Login
            </CustomButton>
            <CustomButton onClick={() => navigate("/customer-login")} sx={{ ml: 2 }}>
              Customer Login
            </CustomButton>
          </Box>
        </Toolbar>
      </GlassAppBar>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Welcome to Our Platform
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Manage your tasks efficiently with our secure and powerful system.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <CustomButton onClick={() => navigate("/admin-register")}>
              Admin Registration
            </CustomButton>
            <CustomButton onClick={() => navigate("/customer-register")}>
              Customer Registration
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Landing;
