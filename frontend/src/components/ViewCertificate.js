import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';

function ViewCertificate({ contract }) {
  const { certId } = useParams();
  const [certificate, setCertificate] = useState({
    studentName: '',
    course: '',
    issuer: '',
    issueDate: '',
    transactionHash: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        if (!contract) {
          throw new Error('Blockchain connection not established');
        }

        // Fetch certificate details from smart contract
        const certData = await contract.verifyCertificate(certId);
        
        // Check if certificate exists
        if (!certData || certData.studentName === '') {
          throw new Error('Certificate not found on blockchain');
        }

        // Format the retrieved data
        setCertificate({
          studentName: certData.studentName,
          course: certData.course,
          issuer: certData.issuer,
          issueDate: new Date(certData.issueDate * 1000).toLocaleDateString(),
          transactionHash: certData.transactionHash || 'Not available'
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [contract, certId]);

  if (loading) return <div className="loading">Loading certificate from blockchain...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="certificate-container">
      <h2>Certificate Verification</h2>
      
      <div className="certificate-details">
        <div className="detail-row">
          <span className="label">Student Name:</span>
          <span className="value">{certificate.studentName}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Course:</span>
          <span className="value">{certificate.course}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Issued By:</span>
          <span className="value">{certificate.issuer}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Date Issued:</span>
          <span className="value">{certificate.issueDate}</span>
        </div>
        
        {certificate.transactionHash && (
          <div className="detail-row">
            <span className="label">Transaction:</span>
            <a 
              href={`https://sepolia.etherscan.io/tx/${certificate.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="value link"
            >
              View on Etherscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCertificate;