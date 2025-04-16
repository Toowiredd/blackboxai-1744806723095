import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentDetails from './components/IncidentDetails';
import HelpResources from './components/HelpResources';
import UserProfile from './components/UserProfile';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import SearchBar from './components/SearchBar';
import ExportButtons from './components/ExportButtons';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incident/:id" element={<IncidentDetails />} />
          <Route path="/help" element={<HelpResources />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function IncidentDetails() {
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
    return <p className="p-4">Incident not found.</p>;
  }

  return (
    <section className="p-4 max-w-3xl mx-auto bg-white rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">Incident Details</h2>
      <p>
        <strong>Date:</strong> {new Date(incident.date).toLocaleString()}
      </p>
      <p>
        <strong>Description:</strong> {incident.description}
      </p>
      <p>
        <strong>Individuals Involved:</strong>{' '}
        {incident.individuals.length > 0 ? incident.individuals.join(', ') : 'N/A'}
      </p>
      <p>
        <strong>Location:</strong> {incident.location || 'N/A'}
      </p>
      <p>
        <strong>Incident Date(s):</strong> {incident.incidentDate || 'N/A'}
      </p>
      <p>
        <strong>Actions Taken/Proposed:</strong>{' '}
        {incident.actions.length > 0 ? incident.actions.join(', ') : 'N/A'}
      </p>
      <p>
        <strong>Assets Involved:</strong>{' '}
        {incident.assets.length > 0 ? incident.assets.join(', ') : 'N/A'}
      </p>
      <Link
        to="/"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}

function HelpResources() {
  return (
    <section className="p-4 max-w-3xl mx-auto bg-white rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">Help Resources</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a href="https://www.safeworkaustralia.gov.au" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Safe Work Australia
          </a> - Workplace health and safety resources.
        </li>
        <li>
          <a href="https://www.beyondblue.org.au" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Beyond Blue
          </a> - Mental health support and resources.
        </li>
        <li>
          <a href="https://www.lifeline.org.au" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Lifeline Australia
          </a> - 24/7 crisis support and suicide prevention.
        </li>
        <li>
          <a href="https://www.worksafe.vic.gov.au" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            WorkSafe Victoria
          </a> - Workplace safety and compensation information.
        </li>
      </ul>
    </section>
  );
}

function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="p-4">No user logged in.</p>;
  }

  return (
    <section className="p-4 max-w-3xl mx-auto bg-white rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </section>
  );
}

function Navigation() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">
        Dashboard
      </Link>
      <Link to="/help" className="hover:underline">
        Help Resources
      </Link>
      <Link to="/profile" className="hover:underline">
        User Profile
      </Link>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incident/:id" element={<IncidentDetails />} />
          <Route path="/help" element={<HelpResources />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
