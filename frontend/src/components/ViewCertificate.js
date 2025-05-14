import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function ViewCertificate({ contract, certId }) {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch certificate data from blockchain
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const cert = await contract.verifyCertificate(certId);
        setCertificate({
          studentName: cert.studentName,
          course: cert.course,
          issuer: cert.issuer,
          issueDate: new Date(cert.issueDate * 1000).toLocaleDateString()
        });
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract && certId) {
      fetchCertificate();
    }
  }, [contract, certId]);

  if (loading) return <div>Loading certificate...</div>;
  if (!certificate) return <div>Certificate not found</div>;

  // Generate verification URL
  const verificationUrl = `${window.location.origin}/verify/${certId}`;

  return (
    <div className="certificate-view">
      <h2>Your Certificate</h2>
      
      <div className="certificate-details">
        <p><strong>Student:</strong> {certificate.studentName}</p>
        <p><strong>Course:</strong> {certificate.course}</p>
        <p><strong>Issued by:</strong> {certificate.issuer}</p>
        <p><strong>Date:</strong> {certificate.issueDate}</p>
      </div>

      <div className="qr-code">
        <h3>Verification QR Code</h3>
        <QRCodeSVG 
          value={verificationUrl} 
          size={200}
          level="H" // High error correction
          includeMargin={true}
        />
        <p className="qr-hint">Scan this to verify authenticity</p>
      </div>
    </div>
  );
}

export default ViewCertificate;