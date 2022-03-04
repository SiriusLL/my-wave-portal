// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ActivationPortal {
    // state variable
    uint256 totalPortalsOpened;
    mapping(address => uint256) public portalsOpen;
    address[] public addr;

    constructor() {
        console.log("My contracts pants are smarter than yours ;P");
    }

    function activatePortal() public {
        if (portalsOpen[msg.sender] < 1) {
            addr.push(msg.sender);
        }
        totalPortalsOpened++;
        portalsOpen[msg.sender]++;
        console.log("%s has Activated a Portal!", msg.sender); // msg.sender is wallet address of who called the function
    }

    function closePortal() public {
        if (portalsOpen[msg.sender] > 0) {
            totalPortalsOpened--;
            portalsOpen[msg.sender]--;
            console.log("%s has Closed a Portal!", msg.sender);
        } else {
            console.log(
                "%s is attempting to close a Portal that does not exist, Is there a spoon?",
                msg.sender
            );
        }
    }

    function getTotalPortalsOpen() public view returns (uint256) {
        console.log("We have %d total Portals open!", totalPortalsOpened);
        return totalPortalsOpened;
    }

    function getPortalsOpenForUser() public view returns (uint256) {
        console.log(
            "%s has opened %d portals",
            msg.sender,
            portalsOpen[msg.sender]
        );
        return portalsOpen[msg.sender];
    }

    function getAllAddresses() public view returns (address[] memory) {
        return addr;
    }
}
