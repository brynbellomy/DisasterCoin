pragma solidity ^0.4.17;

import './AddressSetLib.sol';
import './Owned.sol';

contract CampaignHub is Owned
{
    using AddressSetLib for AddressSetLib.AddressSet;

    AddressSetLib.AddressSet campaigns;

    function CampaignHub(address _owner) {
        owner = _owner;
    }

    event LogAddCampaign(address campaign, address walletAddress, bytes32 ipfsHash);

    function addCampaign(bytes32 ipfsHash, address walletAddress)
        onlyOwner
    {
        Campaign campaign = new Campaign(ipfsHash);
        campaigns.add(campaign);

        if (walletAddress == 0x0) {
            // @@TODO: deploy wallet
            // walletAddress = ...;
        }

        LogAddCampaign(address(campaign), walletAddress, ipfsHash);
    }
}