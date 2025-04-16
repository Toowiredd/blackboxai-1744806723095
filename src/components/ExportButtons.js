import React from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

const ExportButtons = ({ incidents }) => {
  const exportCSV = () => {
    const csvData = incidents.map((incident) => ({
      Date: new Date(incident.date).toLocaleString(),
      Description: incident.description,
      Individuals: incident.individuals.join('; '),
      Location: incident.location,
      IncidentDates: incident.incidentDate,
      Actions: incident.actions.join('; '),
      Assets: incident.assets.join('; '),
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'incidents.csv');
  };

  const exportJSON = () => {
    const json = JSON.stringify(incidents, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'incidents.json');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Incident Logs', 10, 10);
    let y = 20;
    incidents.forEach((incident, index) => {
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
      doc.setFontSize(12);
      doc.text(`Incident #${index + 1}`, 10, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(`Date: ${new Date(incident.date).toLocaleString()}`, 10, y);
      y += 6;
      doc.text(`Description: ${incident.description}`, 10, y);
      y += 6;
      doc.text(`Individuals: ${incident.individuals.join(', ')}`, 10, y);
      y += 6;
      doc.text(`Location: ${incident.location}`, 10, y);
      y += 6;
      doc.text(`Incident Dates: ${incident.incidentDate}`, 10, y);
      y += 6;
      doc.text(`Actions: ${incident.actions.join(', ')}`, 10, y);
      y += 6;
      doc.text(`Assets: ${incident.assets.join(', ')}`, 10, y);
      y += 10;
    });
    doc.save('incidents.pdf');
  };

  return (
    <div className="my-4 flex space-x-4">
      <button
        onClick={exportCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export CSV
      </button>
      <button
        onClick={exportJSON}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export JSON
      </button>
      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
