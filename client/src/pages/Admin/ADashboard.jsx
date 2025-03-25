import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
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
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Welcome, Admin!
        </Typography>

        <Typography variant="body1" sx={{ color: "#ddd", mb: 3 }}>
          You're now in control of your system. Manage tasks and users efficiently.
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

export default AdminDashboard;