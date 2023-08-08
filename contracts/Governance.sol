// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Governance is Ownable {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        address[] voters;
    }

    uint256 public totalProposals;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed id, string title, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed id);

    function createProposal(string memory _title, string memory _description) external {
        totalProposals++;
        Proposal memory proposal = Proposal(totalProposals, _title, _description, 0, 0, false, new address[](0));
        proposals[totalProposals] = proposal;

        emit ProposalCreated(totalProposals, _title, _description);
    }

    function vote(uint256 _proposalId, bool _support) external {
        require(_proposalId <= totalProposals, "Proposal does not exist");
        require(!hasVoted[msg.sender][_proposalId], "Already voted");

        Proposal storage proposal = proposals[_proposalId];
        proposal.voters.push(msg.sender);
        hasVoted[msg.sender][_proposalId] = true;

        if (_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        emit Voted(_proposalId, msg.sender, _support);
    }

    function executeProposal(uint256 _proposalId) external onlyOwner {
        require(_proposalId <= totalProposals, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");

        if (proposal.votesFor > proposal.votesAgainst) {
            // Execute the proposal's action (e.g., update rules or policies)
            proposal.executed = true;
            emit ProposalExecuted(_proposalId);
        }
    }

    function getProposalVotes(uint256 _proposalId) external view returns (uint256, uint256) {
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.votesFor, proposal.votesAgainst);
    }

    function getProposalVoters(uint256 _proposalId) external view returns (address[] memory) {
        Proposal storage proposal = proposals[_proposalId];
        return proposal.voters;
    }
}
