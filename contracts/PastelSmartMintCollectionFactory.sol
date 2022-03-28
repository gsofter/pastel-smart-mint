// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./PastelSmartMintCollection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PastelSmartMintCollectionFactory is Ownable {
    PastelSmartMintCollection[] public psmCollections;

    event CollectionCreated(address indexed collectionAddress, string _name, string _symbol);

    function createCollection(
        string memory _name,
        string memory _symbol,
        string memory _tokenURI,
        uint256 _maxSupply
    ) public onlyOwner {
        PastelSmartMintCollection newCollection = new PastelSmartMintCollection(_name, _symbol, _tokenURI, _maxSupply);
        psmCollections.push(newCollection);
        emit CollectionCreated(address(newCollection), _name, _symbol);
    }
}
