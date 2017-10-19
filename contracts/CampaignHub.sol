pragma solidity ^0.4.15;

import './AddressSetLib.sol';
import './Owned.sol';
import './Campaign.sol';

contract CampaignHub is Owned
{
    using AddressSetLib for AddressSetLib.AddressSet;

    AddressSetLib.AddressSet campaigns;

    function CampaignHub(address _owner) {
        owner = _owner;
    }

    event LogAddCampaign(address campaign, bytes32 ipfsHash);

    function addCampaign(bytes32 ipfsHash, uint goalAmount, address vendors, uint weiLimitPerBlock, uint deadline)
        onlyOwner
    {
        Campaign campaign = new Campaign(ipfsHash, goalAmount, vendors, weiLimitPerBlock, deadline);
        campaigns.add(campaign);

        LogAddCampaign(address(campaign), ipfsHash);
    }
}
