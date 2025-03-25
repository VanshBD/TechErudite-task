import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons for show/hide
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login/admin",
        { email, password }
      );

      localStorage.clear();

      // Store the token and admin data in localStorage
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminData", JSON.stringify(res.data.user));
      localStorage.setItem("role", JSON.stringify(res.data.user.role));

      navigate("/admin-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggle show/hide password
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
          <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
            Admin Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
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
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle text/password
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { color: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePasswordToggle}
                      edge="end"
                      sx={{ color: "#fff" }}
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
              color="primary"
              fullWidth
              disabled={loading}
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
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;