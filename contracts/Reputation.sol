// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Reputation is Ownable {
    mapping(address => uint256) public reputationScores;
    mapping(address => mapping(address => bool)) public hasGivenFeedback;

    event FeedbackGiven(address indexed from, address indexed to, uint256 score);

    function giveFeedback(address _to, uint256 _score) external {
        require(_score >= 1 && _score <= 5, "Invalid score");
        require(!hasGivenFeedback[msg.sender][_to], "Feedback already given");

        reputationScores[_to] += _score;
        hasGivenFeedback[msg.sender][_to] = true;

        emit FeedbackGiven(msg.sender, _to, _score);
    }

    function getReputationScore(address _user) external view returns (uint256) {
        return reputationScores[_user];
    }
}
