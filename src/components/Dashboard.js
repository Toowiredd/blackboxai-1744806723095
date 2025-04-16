import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';
import SearchBar from './SearchBar';
import ExportButtons from './ExportButtons';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ incidents, addIncident, searchQuery, setSearchQuery }) => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Victoria Incident Management
      </Typography>
      <IncidentForm addIncident={addIncident} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ExportButtons incidents={incidents} />
      <IncidentList incidents={incidents} />
    </Container>
  );
};

export default Dashboard;
