import React from 'react';

const Dashboard = () => {
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  const removeReport = (index) => {
    reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(reports));
    window.location.reload(); // Reload to update UI
  };

  const downloadReport = (report) => {
    const reportText = `
      Name: ${report.name}
      Age: ${report.age}
      Date: ${report.date}
      Triage Level: ${report.triageLevel}
    `;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Report_${report.date}.txt`;
    link.click();
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {reports.length > 0 ? (
        <div className="report-list">
          {reports.map((report, index) => (
            <div key={index} className="report-item">
              <div>
                <h3>{report.name}</h3>
                <p>Date: {report.date}</p>
                <p>Triage Level: {report.triageLevel}</p>
              </div>
              <div className="report-actions">
                <button className="download-btn" onClick={() => downloadReport(report)}>Download</button>
                <button onClick={() => removeReport(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
};

export default Dashboard;
