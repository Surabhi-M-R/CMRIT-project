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
        certificates[certId] = Cert(studentName, course, block.timestamp, issuer);
    }

    function verifyCertificate(string memory certId) public view returns (Cert memory) {
        return certificates[certId];
    }
}