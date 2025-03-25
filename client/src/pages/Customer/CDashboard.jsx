import React from "react";
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const actions = [
  { icon: <ExitToAppIcon fontSize="large" />, label: "Logout", action: "logout", color: "error" },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/customer-login");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "25px",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
          color: "#fff",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #FF512F, #DD2476)",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Welcome, Customer!
        </Typography>

        <Typography variant="body1" sx={{ color: "#ddd", mb: 3 }}>
          Manage your profile, orders, and support requests easily.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              px: 5,
              py: 1.8,
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "30px",
              color: "#fff",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 1)",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomerDashboard;
