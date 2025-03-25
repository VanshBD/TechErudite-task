import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Snackbar, Alert, CircularProgress, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", role: "" });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/customer-register") {
      setFormData((prevData) => ({ ...prevData, role: "customer" }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
  
      if (response.ok) {
        setSnackbarMessage("Registration successful! Check your email for verification.");
        setSnackbarSeverity("success");
        setRegistrationSuccess(true); 
      } else {
        setSnackbarMessage(result.message || "Registration failed!");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Server error. Please try again later.");
      setSnackbarSeverity("error");
      console.error(error);
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
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
          width: "100%",
          maxWidth: 400,
        }}
      >
        {registrationSuccess ? (
          <Typography variant="h5" color="success.main">
            Check your email to verify your account.
          </Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
              Customer Registration
            </Typography>
            <form onSubmit={handleSubmit}>
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
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        ) : (
                          <Visibility sx={{ color: "#fff" }} />
                        )}
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
                  mt: 2,
                  paddingY: 1.5,
                  fontWeight: "bold",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.3)",
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </form>
          </>
        )}
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerRegister;
