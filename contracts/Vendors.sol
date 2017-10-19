pragma solidity 0.4.15;

import './Bytes32SetLib.sol';
import './Owned.sol';

contract Vendors is Owned
{
    using Bytes32SetLib for Bytes32SetLib.Bytes32Set;

    struct Vendor {
        Bytes32SetLib.Bytes32Set tags;
        bytes32 ipfsHash;
        bool exists;
    }

    mapping(address => Vendor) vendors;

    function Vendors(address _owner) {
        owner = _owner;
    }

    event LogVendorAdded(address vendorAddr, bytes32 ipfsHash);
    event LogVendorTagAdded(address vendorAddr, bytes32 tag);

    function addVendor(address vendorAddr, bytes32 ipfsHash)
        onlyOwner
    {
        require(vendors[vendorAddr].exists == false);

        vendors[vendorAddr].exists = true;
        vendors[vendorAddr].ipfsHash = ipfsHash;

        LogVendorAdded(vendorAddr, ipfsHash);
    }

    function addVendorTag(address vendorAddr, bytes32 tag)
        onlyOwner
    {
        require(vendors[vendorAddr].exists);
        require(vendors[vendorAddr].tags.contains(tag) == false);

        vendors[vendorAddr].tags.add(tag);

        LogVendorTagAdded(vendorAddr, tag);
    }

    function isVendorTagged(address vendorAddr, bytes32 tag)
        constant returns(bool)
    {
        return vendors[vendorAddr].tags.contains(tag);
    }
}
