import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import IssueCertificate from './components/IssueCertificate';
import ViewCertificate from './components/ViewCertificate';
import VerifyCertificate from './components/VerifyCertificate';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  // ======== 🔥 CHANGE THESE VALUES ========
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace me!
  const contractABI = [ /* PASTE YOUR CONTRACT ABI HERE */ ]; // Replace me!
  // ========================================

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          
          const signer = provider.getSigner();
          const certContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(certContract);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Blockchain Certificate System</h1>
        <p>Connected account: {account || "Not connected"}</p>
        
        <Routes>
          <Route path="/" element={<IssueCertificate contract={contract} />} />
          <Route path="/view/:certId" element={<ViewCertificateWrapper contract={contract} />} />
          <Route path="/verify/:certId" element={<VerifyCertificateWrapper contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Helper components to handle URL params
function ViewCertificateWrapper({ contract }) {
  const { certId } = useParams();
  // In a real app, fetch data from contract using certId
  const dummyData = {
    studentName: "Jane Doe",
    course: "Web3 Development",
    issuer: "Blockchain University"
  };
  return <ViewCertificate certId={certId} {...dummyData} />;
}

function VerifyCertificateWrapper({ contract }) {
  const { certId } = useParams();
  return <VerifyCertificate contract={contract} certId={certId} />;
}

export default App;