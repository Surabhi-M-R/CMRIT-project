import { useState } from 'react';
import { ethers } from 'ethers';

function IssueCertificate({ contract }) {
  // State variables to store form data
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [issuer, setIssuer] = useState('');

  // Function to issue a new certificate
  const issueCert = async () => {
    // Generate a unique ID for the certificate
    const certId = `${Date.now()}`;
    
    // Call the smart contract function
    await contract.issueCertificate(certId, studentName, course, issuer);
    
    alert(`Certificate issued with ID: ${certId}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Issue New Certificate</h2>
      <div style={{ marginBottom: '10px' }}>
        <input 
          placeholder="Student Name" 
          onChange={(e) => setStudentName(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          placeholder="Course" 
          onChange={(e) => setCourse(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          placeholder="Issuer" 
          onChange={(e) => setIssuer(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button 
        onClick={issueCert}
        style={{ 
          padding: '10px 15px', 
          background: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Issue Certificate
      </button>
    </div>
  );
}

export default IssueCertificate;