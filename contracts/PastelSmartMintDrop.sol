// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/**
 * @title PastelSmartMintDrop
 *
 */

contract PastelSmartMintDrop is Initializable, UUPSUpgradeable, ERC721URIStorageUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    string public baseURI;
    uint256 public maxSupply;
    uint256 public price;
    uint256 public royaltiesPercentage;
    address public primaryWallet;
    address public secondaryWallet;

    /**
     * We rely on the OZ Counter util to keep track of the next available ID.
     * We track the nextTokenId instead of the currentTokenId to save users on gas costs.
     * Read more about it here: https://shiny.mirror.xyz/OUampBbIz9ebEicfGnQf5At_ReMHlZy0tB4glb9xQ0E
     */
    CountersUpgradeable.Counter private _nextTokenId;

    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        uint256 _maxSupply,
        uint256 _royaltiesPercentage,
        address _primaryWallet,
        address _secondaryWallet
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        baseURI = _baseURI;
        maxSupply = _maxSupply;
        price = 0.01 ether;
        royaltiesPercentage = _royaltiesPercentage;
        primaryWallet = _primaryWallet;
        secondaryWallet = _secondaryWallet;
        // nextTokenId is initialized to 1, since starting at 0 leads to higher gas cost for the first minter
        _nextTokenId.increment();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function mint(string memory _tokenURI) public payable {
        require(totalSupply() + 1 <= maxSupply, "all items minted!");
        require(msg.value == price, "insufficient price!");

        uint256 mintTokenId = _nextTokenId.current();
        _safeMint(msg.sender, mintTokenId);
        _nextTokenId.increment();

        _setTokenURI(mintTokenId, _tokenURI);
    }

    function setBaseTokenURI(string memory _uri) public onlyOwner {
        baseURI = _uri;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        require(totalSupply() <= maxSupply, "Invalid max supply!");
        maxSupply = _maxSupply;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setRoyaltiesPercentage(uint256 _royaltiesPercentage) public onlyOwner {
        royaltiesPercentage = _royaltiesPercentage;
    }

    function setPrimaryWallet(address _primaryWallet) public onlyOwner {
        primaryWallet = _primaryWallet;
    }

    function setSecondaryWallet(address _secondaryWallet) public onlyOwner {
        secondaryWallet = _secondaryWallet;
    }

    function baseTokenURI() public view returns (string memory) {
        return baseURI;
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address, uint256) {
        uint256 _royalties = (_salePrice * royaltiesPercentage) / 100;
        return (secondaryWallet, _royalties);
    }
}
