// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./PastelSmartMintDrop.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PastelSmartMintDropFactory is Ownable {
    PastelSmartMintDrop[] public psmDrops;

    event DropCreated(address indexed _dropAddress, string _name, string _symbol);

    function createDrop(
        string memory _name,
        string memory _symbol,
        string memory _tokenURI,
        uint256 _maxSupply
    ) public onlyOwner {
        PastelSmartMintDrop newDrop = new PastelSmartMintDrop(_name, _symbol, _tokenURI, _maxSupply);
        newDrop.transferOwnership(msg.sender);
        psmDrops.push(newDrop);
        emit DropCreated(address(newDrop), _name, _symbol);
    }
}
