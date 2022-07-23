//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Bookstore is ERC1155 {
    
    using Counters for Counters.Counter;
    Counters.Counter public tokenCounter;

    struct BookDetails {
        address author;
        string title;
        uint256 copies;
    }

    mapping(uint256 => BookDetails) private books;

    constructor() ERC1155("https://") {}

    function publish(string _title, uint256 _copies) public {
        tokenCounter.increment();
        uint256 currentCounter = tokenCounter.current();

        books[currentCounter] = BookDetails(msg.sender, _title, _copies);

        _mint(msg.sender, currentCounter, _copies, "");
    }

    function approve(address operator) public {
        require(operator != msg.sender);
        setApprovalForAll(operator, true);
    }

    function purchaseFromAuthor(uint256 tokenId, uint256 _amount) public {
        require(books[tokenId].copies >= _amount);
        safeTransferFrom(books[tokenId].author, msg.sender, tokenId, _amount, "");
    }

    function getTitle(uint256 bookId) public view returns (string memory) {
        return books[bookId].title;
    }

    function getCopies(uint256 bookId) public view returns (uint256) {
        return books[bookId].copies;
    }

    function getAuthor(uint256 bookId) public view returns (address) {
        return books[bookId].author;
    }
}
