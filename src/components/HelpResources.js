import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const HelpResources = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Help Resources
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <a href="https://www.safeworkaustralia.gov.au" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                Safe Work Australia
              </a>
            }
            secondary="Workplace health and safety resources."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <a href="https://www.beyondblue.org.au" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                Beyond Blue
              </a>
            }
            secondary="Mental health support and resources."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <a href="https://www.lifeline.org.au" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                Lifeline Australia
              </a>
            }
            secondary="24/7 crisis support and suicide prevention."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <a href="https://www.worksafe.vic.gov.au" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                WorkSafe Victoria
              </a>
            }
            secondary="Workplace safety and compensation information."
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default HelpResources;
