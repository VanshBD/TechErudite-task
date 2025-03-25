import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

// Define a keyframe animation for the floating effect
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled Paper component with glassmorphism effect and animation
const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.primary,
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  animation: `${float} 3s ease-in-out infinite`,
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(10),
}));

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container component="main">
      <GlassmorphicPaper elevation={3}>
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: '20px',
              padding: '10px 20px',
              textTransform: 'none',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.2s',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.05)',
              },
            }}
          >
            Go Home
          </Button>
        </Box>
      </GlassmorphicPaper>
    </Container>
  );
};

export default NotFound;
