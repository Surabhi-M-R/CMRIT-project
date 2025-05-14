import { Link } from 'react-router-dom';

function Navigation({ contract, account }) {
  return (
    <nav className="nav-links">
      <Link to="/">Issue Certificate</Link>
      {contract && (
        <>
          <Link to="/certificates/view/1">View Certificate</Link>
          <Link to="/certificates/verify/1">Verify Certificate</Link>
          <span className="status-badge">
            Connected: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected'}
          </span>
        </>
      )}
    </nav>
  );
}

export default Navigation;
