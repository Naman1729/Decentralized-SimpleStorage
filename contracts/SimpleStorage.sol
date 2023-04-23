// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 public favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public anArray;
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber_) public {
        favoriteNumber = _favoriteNumber_;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name__, uint256 _favoriteNumber_) public {
        people.push(People(_favoriteNumber_, _name__));
        nameToFavoriteNumber[_name__] = _favoriteNumber_;
    }
}
