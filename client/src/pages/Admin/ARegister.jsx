import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin-register") {
      setFormData((prevData) => ({ ...prevData, role: "admin" }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setSnackbarMessage(
          "Registration successful! Check your email for verification."
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setRegistrationSuccess(true);
      } else {
        setSnackbarMessage(result.message || "Registration failed!");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Server error. Please try again later.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            padding: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            textAlign: "center",
          }}
        >
          {registrationSuccess ? (
            <Typography variant="h5" color="success.main">
              Check your email to verify your account.
            </Typography>
          ) : (
            <>
              <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
                Admin Registration
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  margin="normal"
                  required
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  required
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  required
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  required
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      color: "#fff",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    paddingY: 1.5,
                    fontWeight: "bold",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminRegister;
