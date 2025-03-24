import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import {jwtDecode} from "jwt-decode"

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
        // const decodedToken = jwtDecode(token);
console.log("object",token);
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );
        setMessage(res.data.message);
        setError(false);

        setTimeout(() => {
          if ("userRole" === "admin") {
            navigate("/");
          } else {
            navigate("/");
          }
        }, 2000);
      } catch (err) {
        setMessage(err.response?.data?.message || "Email verification failed.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Alert severity={error ? "error" : "success"}>{message}</Alert>
          {!error && (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: "10px" }}
            >
              Redirecting to {error ? "" : "login page"} in 2 seconds...
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default EmailVerification;