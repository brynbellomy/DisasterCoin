pragma solidity ^0.4.17;

import './StringSetLib.sol';
import './Owned.sol';

contract Vendors is Owned
{
    using StringSetLib for StringSetLib.StringSet;

    struct Vendor {
        StringSetLib.StringSet tags;
        bytes32 ipfsHash;
        bool exists;
    }

    mapping(address => Vendor) vendors;

    function Vendors(address _owner) {
        owner = _owner;
    }

    event LogVendorAdded(address vendorAddr, bytes32 ipfsHash);
    event LogVendorTagAdded(address vendorAddr, string tag);

    function addVendor(address vendorAddr, bytes32 ipfsHash)
        onlyOwner
    {
        require(vendors[vendorAddr].exists == false);

        vendors[vendorAddr].exists = true;
        vendors[vendorAddr].ipfsHash = ipfsHash;

        LogVendorAdded(vendorAddr, ipfsHash);
    }

    function addVendorTag(address vendorAddr, string tag)
        onlyOwner
    {
        require(vendors[vendorAddr].exists);
        require(vendors[vendorAddr].tags.contains(tag) == false);

        vendors[vendorAddr].tags.add(tag);

        LogVendorTagAdded(vendorAddr, tag);
    }

    function isVendorTagged(address vendorAddr, string tag)
        constant
    {
        return vendors[vendorAddr].tags.contains(tag);
    }
}
