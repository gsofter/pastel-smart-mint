// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./PastelSmartMintCollection.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PastelSmartMintCollectionFactory is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    PastelSmartMintCollection[] public psmCollections;

    event CollectionCreated(address indexed _collectionAddress, string _name, string _symbol);

    function initialize() public initializer {
        __Ownable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function createCollection(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _maxSupply,
        uint256 _royaltiesPercentage,
        address _primaryWallet,
        address _secondaryWallet
    ) public onlyOwner {
        PastelSmartMintCollection newCollection = new PastelSmartMintCollection();
        newCollection.initialize(
            _name,
            _symbol,
            _baseURI,
            _maxSupply,
            _royaltiesPercentage,
            _primaryWallet,
            _secondaryWallet
        );
        newCollection.transferOwnership(msg.sender);
        psmCollections.push(newCollection);
        emit CollectionCreated(address(newCollection), _name, _symbol);
    }
}
