// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ActivationPortal {
    // state variable
    uint256 totalPortalsOpen;

    event NewPortal(address indexed from, uint256 timestamp, string message);

    struct Portal {
        address Activator; // address of user who activated portal
        string message; //message user sent
        uint256 timestamp; // timestamp when teh user activated portal
    }

    Portal[] portals;

    // mapping(address => uint256) public portalsOpen;
    // address[] public addr;

    constructor() {
        console.log("My contracts pants are smarter than yours ;P");
    }

    function activatePortal(string memory _message) public {
        totalPortalsOpen += 1;
        console.log("%s has Activated a Portal w/ message %s", msg.sender); // msg.sender is wallet address of who called the function

        portals.push(Portal(msg.sender, _message, block.timestamp));
    }

    // function closePortal() public {
    //     if (portalsOpen[msg.sender] > 0) {
    //         totalPortalsOpened--;
    //         portalsOpen[msg.sender]--;
    //         console.log("%s has Closed a Portal!", msg.sender);
    //     } else {
    //         console.log(
    //             "%s is attempting to close a Portal that does not exist, Is there a spoon?",
    //             msg.sender
    //         );
    //     }
    // }

    function getAllPortals() public view returns (Portal[] memory) {
        return portals;
    }

    function getTotalPortalsOpen() public view returns (uint256) {
        console.log("We have %d total Portals open!", totalPortalsOpen);
        return totalPortalsOpen;
    }
}
