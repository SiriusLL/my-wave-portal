// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ActivationPortal {
    // state variable
    uint256 totalPortalsOpen;

    uint256 private seed; // random number variable

    event NewPortal(
        address indexed from,
        uint256 timestamp,
        string message,
        string name
    );

    struct Portal {
        address Activator; // address of user who activated portal
        string message; //message user sent
        string name;
        uint256 timestamp; // timestamp when teh user activated portal
    }

    Portal[] portals;

    // mapping(address => uint256) public portalsOpen;
    // address[] public addr;
    mapping(address => uint256) public lastPortalOpenAt;

    constructor() payable {
        console.log("My contracts pants are smarter than yours ;P");
        seed = (block.timestamp + block.difficulty) % 100; // set the initial seed
    }

    function activatePortal(string memory _message, string memory _name)
        public
    {
        // time stamp is 15 min or higher than last
        require(
            lastPortalOpenAt[msg.sender] + 15 seconds < block.timestamp,
            "Portal overload wait 15 min for cooldown"
        );

        // update current timestamp
        lastPortalOpenAt[msg.sender] = block.timestamp;

        totalPortalsOpen += 1;

        portals.push(Portal(msg.sender, _message, _name, block.timestamp));
        console.log(
            "%s has Activated a Portal w/ message %s",
            msg.sender,
            _message
        ); // msg.sender is wallet address of who called the function

        // generate new seed for next portal open
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            uint256 powerUpAmount = 0.0001 ether;
            require(
                powerUpAmount <= address(this).balance,
                "Not Enough funds in contract"
            );
            (bool success, ) = (msg.sender).call{value: powerUpAmount}("");
            require(success, "Failed to withdraw money from contract");
        }
        emit NewPortal(msg.sender, block.timestamp, _message, _name);
    }

    function getAllPortals() public view returns (Portal[] memory) {
        return portals;
    }

    function getTotalPortalsOpen() public view returns (uint256) {
        console.log("We have %d total Portals open!", totalPortalsOpen);
        return totalPortalsOpen;
    }
}
