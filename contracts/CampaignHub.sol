pragma solidity ^0.4.17;

import './AddressSetLib.sol';

contract CampaignHub
{
    using AddressSetLib for AddressSetLib.AddressSet;

    address owner;

    AddressSetLib.AddressSet campaigns;

    function CampaignHub(address _owner) {
        owner = _owner;
    }

    event LogAddCampaign(address campaign, bytes32 ipfsHash);

    function addCampaign(bytes32 ipfsHash) {
        Campaign campaign = new Campaign(ipfsHash);
        campaigns.add(campaign);

        LogAddCampaign(address(campaign), ipfsHash);
    }
}