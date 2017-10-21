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

    event LogAddCampaign(address campaigner, address campaign, string name);

    function addCampaign(string name, uint goalAmount, uint weiLimitPerBlock, uint deadline)
        // onlyOwner
    {
        Campaign campaign = new Campaign(name, goalAmount, vendors, weiLimitPerBlock, deadline);
        LogAddCampaign(msg.sender, address(campaign), name);

        campaign.changeOwner(msg.sender);
        campaigns.add(campaign);
    }
}
