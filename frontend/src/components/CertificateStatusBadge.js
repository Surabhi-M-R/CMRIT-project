function CertificateStatusBadge({ account }) {
  return (
    <div className="status-badge">
      <span>🔗 Connected to {account.slice(0, 6)}...{account.slice(-4)}</span>
    </div>
  );
}

export default CertificateStatusBadge;
