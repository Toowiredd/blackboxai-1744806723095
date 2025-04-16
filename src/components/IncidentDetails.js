import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const IncidentDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const storedIncidents = localStorage.getItem('incidents');
    if (storedIncidents) {
      const incidents = JSON.parse(storedIncidents);
      const found = incidents.find((inc) => inc.id.toString() === id);
      setIncident(found);
    }
  }, [id]);

  if (!incident) {
    return <Typography variant="h6">Incident not found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Incident Details
      </Typography>
      <Typography>
        <strong>Date:</strong> {new Date(incident.date).toLocaleString()}
      </Typography>
      <Typography>
        <strong>Description:</strong> {incident.description}
      </Typography>
      <Typography>
        <strong>Individuals Involved:</strong> {incident.individuals.length > 0 ? incident.individuals.join(', ') : 'N/A'}
      </Typography>
      <Typography>
        <strong>Location:</strong> {incident.location || 'N/A'}
      </Typography>
      <Typography>
        <strong>Incident Date(s):</strong> {incident.incidentDate || 'N/A'}
      </Typography>
      <Typography>
        <strong>Actions Taken/Proposed:</strong> {incident.actions.length > 0 ? incident.actions.join(', ') : 'N/A'}
      </Typography>
      <Typography>
        <strong>Assets Involved:</strong> {incident.assets.length > 0 ? incident.assets.join(', ') : 'N/A'}
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Back to Dashboard
        </Button>
      </Link>
    </Container>
  );
};

export default IncidentDetails;
