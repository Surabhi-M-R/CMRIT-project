
// Add these at the top of your existing imports
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import IssueCertificate from './components/IssueCertificate';
import ViewCertificate from './components/ViewCertificate';
import VerifyCertificate from './components/VerifyCertificate';
import Navigation from './components/Navigation';
import CertificateStatusBadge from './components/CertificateStatusBadge';

// Helper components to handle URL params
function ViewCertificateWrapper({ contract }) {
  const { certId } = useParams();
  return <ViewCertificate contract={contract} certId={certId} />;
}

function VerifyCertificateWrapper({ contract }) {
  const { certId } = useParams();
  return <VerifyCertificate contract={contract} certId={certId} />;
}

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [blockchainError, setBlockchainError] = useState('');

  // Contract configuration
  const contractAddress = "0xB84749F4387c833cefBD01da37Faa9Ba6015Ea0d";
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "certId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "studentName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "issuer",
          "type": "string"
        }
      ],
      "name": "issueCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "certId",
          "type": "string"
        }
      ],
      "name": "verifyCertificate",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "studentName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "course",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "issueDate",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "issuer",
              "type": "string"
            }
          ],
          "internalType": "struct Certificate.Cert",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const certificateContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(certificateContract);
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Blockchain error:", error);
          setBlockchainError(error.message);
        }
      } else {
        setBlockchainError('MetaMask not detected');
      }
    };

    loadBlockchainData();
  }, [contractAddress, contractABI]);

  return (
    <Router>
      <div className="App">
        <Navigation contract={contract} account={account} />
        
        {blockchainError && (
          <div className="blockchain-alert">
            <h3>Blockchain Connection Issue</h3>
            <p>{blockchainError}</p>
            <p>Certificate features will be limited without blockchain connection</p>
          </div>
        )}

        {contract && (
          <CertificateStatusBadge account={account} />
        )}

        <Routes>
          <Route path="/" element={<IssueCertificate contract={contract} />} />
          <Route 
            path="/certificates/view/:certId" 
            element={<ViewCertificateWrapper contract={contract} />} 
          />
          <Route 
            path="/certificates/verify/:certId" 
            element={<VerifyCertificateWrapper contract={contract} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;