import React from 'react';

const IncidentList = ({ incidents }) => {
  if (incidents.length === 0) {
    return <p className="text-gray-600">No incidents found.</p>;
  }

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Incident Logs</h2>
      <ul className="space-y-4 max-h-[400px] overflow-y-auto">
        {incidents.map((incident) => (
          <li key={incident.id} className="border border-gray-300 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-700">
                {new Date(incident.date).toLocaleString()}
              </span>
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {incident.description}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <strong>Individuals Involved:</strong>{' '}
                {incident.individuals.length > 0 ? incident.individuals.join(', ') : 'N/A'}
              </div>
              <div>
                <strong>Location:</strong> {incident.location || 'N/A'}
              </div>
              <div>
                <strong>Incident Date(s):</strong> {incident.incidentDate || 'N/A'}
              </div>
              <div>
                <strong>Actions Taken/Proposed:</strong>{' '}
                {incident.actions.length > 0 ? incident.actions.join(', ') : 'N/A'}
              </div>
              <div>
                <strong>Assets Involved:</strong>{' '}
                {incident.assets.length > 0 ? incident.assets.join(', ') : 'N/A'}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IncidentList;
