// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./PastelSmartMintDrop.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PastelSmartMintDropFactory is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    PastelSmartMintDrop[] public psmDrops;

    event DropCreated(address indexed _dropAddress, string _name, string _symbol);

    function initialize() public initializer {}

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function createDrop(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _maxSupply
    ) public onlyOwner {
        PastelSmartMintDrop newDrop = new PastelSmartMintDrop();
        newDrop.initialize(_name, _symbol, _baseURI, _maxSupply);
        newDrop.transferOwnership(msg.sender);
        psmDrops.push(newDrop);
        emit DropCreated(address(newDrop), _name, _symbol);
    }
}
