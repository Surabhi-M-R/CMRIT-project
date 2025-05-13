import { QRCodeCanvas } from 'qrcode.react';

function ViewCertificate({ certId, studentName, course, issuer }) {
  // Create a verification URL
  const verificationUrl = `${window.location.origin}/verify/${certId}`;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Your Certificate</h2>
      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <p><strong>Student:</strong> {studentName}</p>
        <p><strong>Course:</strong> {course}</p>
        <p><strong>Issued by:</strong> {issuer}</p>
      </div>
      
      <h3>Verification QR Code</h3>
      <div style={{ margin: '20px auto', display: 'inline-block', padding: '10px', background: 'white' }}>
        <QRCodeCanvas value={verificationUrl} size={200} />
      </div>
      <p>Scan this code to verify the certificate</p>
    </div>
  );
}

export default ViewCertificate;