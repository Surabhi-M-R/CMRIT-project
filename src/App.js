import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import IssueCertificate from './components/IssueCertificate';
import ViewCertificate from './components/ViewCertificate';
import VerifyCertificate from './components/VerifyCertificate';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  // Contract configuration
  const contractAddress = "0xB84749F4387c833cefBD01da37Faa9Ba6015Ea0d"; // Deployed contract address
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

  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          
          // Create contract instance
          const certificateContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(certificateContract);
          
          // Get connected account
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
          setError(error.message);
        }
      } else {
        setError('Please install MetaMask to use this application');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <Router>
      <div className="App">
        {error ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            <h2>Error</h2>
            <p>{error}</p>
            <p>Please make sure to:</p>
            <ol style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Get some Sepolia testnet ETH from a faucet (e.g., https://sepoliafaucet.com/)</li>
              <li>Deploy the smart contract using: npx hardhat run scripts/deploy.js --network sepolia</li>
              <li>Update the contractAddress in App.js with the deployed contract address</li>
            </ol>
          </div>
        ) : (
          <div>
            <h1>Blockchain Certificate System</h1>
            <p>Connected account: {account || "Not connected"}</p>
            <Routes>
              <Route path="/" element={<IssueCertificate contract={contract} />} />
              <Route path="/view/:certId" element={<ViewCertificateWrapper contract={contract} />} />
              <Route path="/verify/:certId" element={<VerifyCertificateWrapper contract={contract} />} />
            </Routes>
          </div>
        )}
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