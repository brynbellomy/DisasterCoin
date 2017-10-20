pragma solidity ^0.4.15;

import './AddressSetLib.sol';
import './Owned.sol';
import './Campaign.sol';

contract CampaignHub is Owned
{
    using AddressSetLib for AddressSetLib.AddressSet;

    AddressSetLib.AddressSet campaigns;

    address vendors;

    function CampaignHub(address _vendors) {
        vendors = _vendors;
    }

    event LogAddCampaign(address campaigner, address campaign, bytes32 ipfsHash);

    function addCampaign(bytes32 ipfsHash, uint goalAmount, uint weiLimitPerBlock, uint deadline)
        onlyOwner
    {
        Campaign campaign = new Campaign(ipfsHash, goalAmount, vendors, weiLimitPerBlock, deadline);
        campaigns.add(campaign);

        LogAddCampaign(msg.sender, address(campaign), ipfsHash);
    }
}
