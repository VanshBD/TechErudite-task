import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Box,
} from "@mui/material";

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify/${token}`
        );

        setMessage(res.data.message);
        setError(false);

        // Redirect based on user role
        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/admin-login");
          } else {
            navigate("/customer-login");
          }
        }, 2000);
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Email verification failed."
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Dark background
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#1e1e1e", // Slightly lighter dark shade
            color: "#ffffff", // White text
            textAlign: "center",
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: "#ffffff" }} />
          ) : (
            <>
              <Alert
                severity={error ? "error" : "success"}
                sx={{
                  backgroundColor: error ? "#f44336" : "#4caf50",
                  color: "#ffffff",
                  marginBottom: 2,
                }}
              >
                {message}
              </Alert>
              {!error && (
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Redirecting to{" "}
                  {message.includes("admin") ? "admin" : "user"} login page in 2
                  seconds...
                </Typography>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailVerification;
