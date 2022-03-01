// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./ERC721Tradable.sol";

contract PigeonNFT is ERC721Tradable {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        address _proxyRegistryAddress
    ) ERC721Tradable(_name, _symbol, _maxSupply, _proxyRegistryAddress) {}
}
