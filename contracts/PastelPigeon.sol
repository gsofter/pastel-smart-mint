// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721Tradable.sol";

/**
 * @title Pigeon NFT
 *
 */
contract PastelPigeon is ERC721Tradable {
    constructor(address _proxyRegistryAddress) ERC721Tradable("Pastel Pigeon", "PPGN", _proxyRegistryAddress) {}

    string public baseURI;

    function baseTokenURI() public view override returns (string memory) {
        return baseURI;
    }

    function setBaseTokenURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}
