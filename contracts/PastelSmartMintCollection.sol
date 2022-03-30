// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PastelSmartMintCollection
 *
 */

contract PastelSmartMintCollection is ERC721, Ownable {
    using Counters for Counters.Counter;

    string public baseURI;
    uint256 public maxSupply;

    /**
     * We rely on the OZ Counter util to keep track of the next available ID.
     * We track the nextTokenId instead of the currentTokenId to save users on gas costs.
     * Read more about it here: https://shiny.mirror.xyz/OUampBbIz9ebEicfGnQf5At_ReMHlZy0tB4glb9xQ0E
     */
    Counters.Counter private _nextTokenId;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _maxSupply
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
        maxSupply = _maxSupply;
        // nextTokenId is initialized to 1, since starting at 0 leads to higher gas cost for the first minter
        _nextTokenId.increment();
    }

    function ownerMint(address _to, uint256 _mintAmount) public onlyOwner {
        require(_mintAmount + totalSupply() <= maxSupply, "all items minted");
        require(_mintAmount >= 1, "invalid mint amount");

        for (uint256 i = 0; i < _mintAmount; i++) {
            _safeMint(_to, _nextTokenId.current());
            _nextTokenId.increment();
        }
    }

    function setBaseTokenURI(string memory _uri) public onlyOwner {
        baseURI = _uri;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        require(totalSupply() <= maxSupply, "invalid max supply");
        maxSupply = _maxSupply;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "nonexistent token");
        return string(abi.encodePacked(baseURI, Strings.toString(_tokenId)));
    }

    function baseTokenURI() public view returns (string memory) {
        return baseURI;
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }
}
