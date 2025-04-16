import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Typography variant="h6">No user logged in.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <Typography>
        <strong>Username:</strong> {user.username}
      </Typography>
      <Typography>
        <strong>Role:</strong> {user.role}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        style={{ marginTop: '16px' }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserProfile;
