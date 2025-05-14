// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string studentName;
        string course;
        uint256 issueDate;
        string issuer;
    }

    mapping(string => Cert) public certificates;
    mapping(string => bytes32) public certificateTransactions;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function issueCertificate(
        string memory certId,
        string memory studentName,
        string memory course,
        string memory issuer
    ) public {
        require(msg.sender == owner, "Only owner can issue certificates");
        
        // Create certificate
        certificates[certId] = Cert(
            studentName,
            course,
            block.timestamp,
            issuer
        );
        
        // Store transaction hash separately
        certificateTransactions[certId] = blockhash(block.number - 1);
    }

    function verifyCertificate(string memory certId) public view returns (
        Cert memory certificate,
        bytes32 transactionHash
    ) {
        return (certificates[certId], certificateTransactions[certId]);
    }
    struct Certificate {
    string studentName;
    string course;
    string issuer;
    uint256 issueDate;
    string transactionHash; // Optional
}

function verifyCertificate(string memory certId) public view returns (
    string memory studentName,
    string memory course,
    string memory issuer,
    uint256 issueDate,
    string memory transactionHash
) {
    Certificate memory cert = certificates[certId];
    return (
        cert.studentName,
        cert.course,
        cert.issuer,
        cert.issueDate,
        cert.transactionHash
    );
}
}