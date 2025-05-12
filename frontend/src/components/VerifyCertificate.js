import { useState, useEffect } from 'react';

function VerifyCertificate({ contract, certId }) {
  const [cert, setCert] = useState(null);

  // Fetch certificate data when component loads
  useEffect(() => {
    const fetchCert = async () => {
      try {
        const certificate = await contract.verifyCertificate(certId);
        setCert(certificate);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };
    
    if (contract && certId) {
      fetchCert();
    }
  }, [contract, certId]);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Certificate Verification</h2>
      
      {cert ? (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #4CAF50', borderRadius: '5px' }}>
          <p><strong>Status:</strong> <span style={{ color: '#4CAF50' }}>✓ Verified</span></p>
          <p><strong>Student:</strong> {cert.studentName}</p>
          <p><strong>Course:</strong> {cert.course}</p>
          <p><strong>Issued by:</strong> {cert.issuer}</p>
          <p><strong>Date:</strong> {new Date(cert.issueDate * 1000).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading certificate data...</p>
      )}
    </div>
  );
}

export default VerifyCertificate;